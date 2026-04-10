(function () {
    'use strict';

    const GA_MEASUREMENT_ID = window.GA_MEASUREMENT_ID || null;
    const MICROSOFT_COMMERCE_EVENTS = {
        begin_checkout: true,
        purchase: true
    };
    const ATTRIBUTION_KEYS = [
        'msclkid',
        'gclid',
        'gbraid',
        'wbraid',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content'
    ];
    const ATTRIBUTION_STORAGE_KEY = 'fatboy_attribution_v1';
    const CHECKOUT_DEDUPE_KEY = 'fatboy_checkout_start_v1';
    const PURCHASE_DEDUPE_KEY = 'fatboy_purchase_complete_v1';
    const APP_HOST_PATTERN = /(app|planner)\.fatboysoftware\.com/i;
    const STRIPE_HOST_PATTERN = /(^|\.)buy\.stripe\.com$|(^|\.)stripe\.com$/i;
    let ga4ReadyPromise = null;
    const locationOrigin = window.location.origin || (window.location.protocol + '//' + window.location.hostname);
    const locationPath = window.location.pathname || '/';
    const locationSearch = window.location.search || '';
    const currentUrl = new URL(window.location.href);
    const currentHost = window.location.hostname || '';

    function isGA4Ready() {
        return typeof window.gtag === 'function';
    }

    function safeJsonParse(value) {
        if (!value) {
            return null;
        }

        try {
            return JSON.parse(value);
        } catch (error) {
            return null;
        }
    }

    function getCookieDomain() {
        if (!currentHost || currentHost === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(currentHost)) {
            return '';
        }

        if (currentHost === 'fatboysoftware.com' || currentHost.endsWith('.fatboysoftware.com')) {
            return '.fatboysoftware.com';
        }

        const segments = currentHost.split('.');
        if (segments.length >= 2) {
            return '.' + segments.slice(-2).join('.');
        }

        return '';
    }

    function setCookie(name, value, maxAgeSeconds) {
        const parts = [
            name + '=' + encodeURIComponent(value),
            'path=/',
            'SameSite=Lax'
        ];
        const domain = getCookieDomain();

        if (maxAgeSeconds) {
            parts.push('max-age=' + maxAgeSeconds);
        }
        if (domain) {
            parts.push('domain=' + domain);
        }
        if (window.location.protocol === 'https:') {
            parts.push('secure');
        }

        document.cookie = parts.join('; ');
    }

    function getCookie(name) {
        const prefix = name + '=';
        const cookies = (document.cookie || '').split(';');

        for (let index = 0; index < cookies.length; index += 1) {
            const entry = cookies[index].trim();
            if (entry.indexOf(prefix) === 0) {
                return decodeURIComponent(entry.substring(prefix.length));
            }
        }

        return '';
    }

    function sanitizeObject(input) {
        const output = {};
        if (!input || typeof input !== 'object') {
            return output;
        }

        Object.keys(input).forEach(function (key) {
            const value = input[key];
            if (value === undefined || value === null || value === '') {
                return;
            }

            output[key] = value;
        });

        return output;
    }

    // Wait for gtag.js to load before flushing events.
    function ensureGA4Ready() {
        if (ga4ReadyPromise) {
            return ga4ReadyPromise;
        }

        ga4ReadyPromise = new Promise(function (resolve) {
            if (isGA4Ready()) {
                resolve(true);
                return;
            }

            let waited = 0;
            const intervalDelay = 100;
            const maxWait = 3000;
            const intervalId = setInterval(function () {
                if (isGA4Ready()) {
                    clearInterval(intervalId);
                    resolve(true);
                    return;
                }

                waited += intervalDelay;
                if (waited >= maxWait) {
                    clearInterval(intervalId);
                    resolve(isGA4Ready());
                }
            }, intervalDelay);
        });

        return ga4ReadyPromise;
    }

    function getStoredAttribution() {
        const storedJson = window.localStorage ? window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY) : '';
        const stored = safeJsonParse(storedJson) || safeJsonParse(getCookie(ATTRIBUTION_STORAGE_KEY)) || {};
        return sanitizeObject(stored);
    }

    function persistAttribution(attribution) {
        const sanitized = sanitizeObject(attribution);
        if (!Object.keys(sanitized).length) {
            return {};
        }

        if (window.localStorage) {
            window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(sanitized));
        }
        setCookie(ATTRIBUTION_STORAGE_KEY, JSON.stringify(sanitized), 60 * 60 * 24 * 90);
        return sanitized;
    }

    function captureCurrentAttribution() {
        const stored = getStoredAttribution();
        const current = {};

        ATTRIBUTION_KEYS.forEach(function (key) {
            const value = currentUrl.searchParams.get(key);
            if (value) {
                current[key] = value;
            }
        });

        const merged = Object.assign({}, stored, current);
        return persistAttribution(merged);
    }

    function getAttributionData() {
        return captureCurrentAttribution();
    }

    function buildEventParams(params) {
        const eventParams = Object.assign({}, getAttributionData(), sanitizeObject(params));

        if (GA_MEASUREMENT_ID) {
            eventParams.send_to = GA_MEASUREMENT_ID;
        }

        return eventParams;
    }

    function trackEvent(eventName, params) {
        if (MICROSOFT_COMMERCE_EVENTS[eventName] && typeof window.trackMicrosoftUetEvent === 'function') {
            window.trackMicrosoftUetEvent(eventName, params || {});
        }

        ensureGA4Ready().then(function (ready) {
            if (!ready) {
                console.warn('GA4 event skipped (gtag unavailable):', eventName);
                return;
            }

            window.gtag('event', eventName, buildEventParams(params));
        });
    }

    function setUserProperties(properties) {
        ensureGA4Ready().then(function (ready) {
            if (!ready) {
                return;
            }

            window.gtag('set', 'user_properties', properties);
        });
    }

    function appendStoredAttribution(urlString, defaults) {
        const mergedDefaults = sanitizeObject(defaults);
        const targetUrl = new URL(urlString, window.location.href);
        const attribution = getAttributionData();

        ATTRIBUTION_KEYS.forEach(function (key) {
            if (attribution[key] && !targetUrl.searchParams.get(key)) {
                targetUrl.searchParams.set(key, attribution[key]);
            }
        });

        Object.keys(mergedDefaults).forEach(function (key) {
            if (!targetUrl.searchParams.get(key)) {
                targetUrl.searchParams.set(key, mergedDefaults[key]);
            }
        });

        return targetUrl.toString();
    }

    function getDefaultPlannerAttribution(link) {
        if (locationPath === '/' || locationPath === '/index.html') {
            return {
                utm_source: 'website',
                utm_medium: 'homepage',
                utm_campaign: 'core_site',
                utm_content: (link && link.getAttribute('data-analytics-location')) || 'homepage_cta'
            };
        }

        if (locationPath.indexOf('/pricing') === 0) {
            return {
                utm_source: 'website',
                utm_medium: 'pricing_page',
                utm_campaign: 'core_site',
                utm_content: (link && link.getAttribute('data-analytics-location')) || 'pricing_cta'
            };
        }

        if (locationPath.indexOf('/federal-retirement') === 0) {
            return {
                utm_source: 'website',
                utm_medium: 'landing_page',
                utm_campaign: 'federal_retirement',
                utm_content: (link && link.getAttribute('data-federal-cta')) || (link && link.getAttribute('data-analytics-location')) || 'primary_cta'
            };
        }

        if (currentHost.indexOf('app.') === 0 || currentHost.indexOf('planner.') === 0) {
            return {
                utm_source: 'web_app',
                utm_medium: 'in_app',
                utm_campaign: 'planner_upgrade',
                utm_content: (link && link.getAttribute('data-analytics-location')) || 'in_app_cta'
            };
        }

        return {
            utm_source: 'website',
            utm_medium: 'site',
            utm_campaign: 'core_site',
            utm_content: (link && link.getAttribute('data-analytics-location')) || 'site_cta'
        };
    }

    function getDefaultCheckoutAttribution(link) {
        if (locationPath.indexOf('/pricing') === 0) {
            return {
                utm_source: 'website',
                utm_medium: 'pricing_page',
                utm_campaign: 'core_site',
                utm_content: (link && link.getAttribute('data-analytics-location')) || 'pricing_buy'
            };
        }

        if (currentHost.indexOf('app.') === 0 || currentHost.indexOf('planner.') === 0) {
            return {
                utm_source: 'web_app',
                utm_medium: 'in_app',
                utm_campaign: 'planner_upgrade',
                utm_content: (link && link.getAttribute('data-analytics-location')) || 'in_app_buy'
            };
        }

        return {
            utm_source: 'website',
            utm_medium: locationPath === '/' || locationPath === '/index.html' ? 'homepage' : 'site',
            utm_campaign: 'core_site',
            utm_content: (link && link.getAttribute('data-analytics-location')) || 'buy_cta'
        };
    }

    function isPlannerDestination(urlString) {
        if (!urlString) {
            return false;
        }

        try {
            return APP_HOST_PATTERN.test(new URL(urlString, window.location.href).hostname || '');
        } catch (error) {
            return false;
        }
    }

    function isStripeDestination(urlString) {
        if (!urlString) {
            return false;
        }

        try {
            return STRIPE_HOST_PATTERN.test(new URL(urlString, window.location.href).hostname || '');
        } catch (error) {
            return false;
        }
    }

    function inferPlannerIntent(link, urlString) {
        if ((link && link.getAttribute('data-planner-intent')) || '') {
            return link.getAttribute('data-planner-intent');
        }

        const href = urlString || (link && (link.getAttribute('href') || link.href)) || '';
        if (href.indexOf('sample=1') !== -1) {
            return 'sample_plan';
        }
        if (href.indexOf('federal=1') !== -1) {
            return 'federal_sample';
        }
        if (/planner\.fatboysoftware\.com/i.test(href)) {
            return 'full_planner';
        }
        return 'planner';
    }

    function decorateCrossDomainLinks() {
        const links = document.querySelectorAll('a[href]');

        Array.prototype.forEach.call(links, function (link) {
            const href = link.getAttribute('href') || '';
            if (!href) {
                return;
            }

            if (isPlannerDestination(href)) {
                link.href = appendStoredAttribution(href, getDefaultPlannerAttribution(link));
                return;
            }

            if (isStripeDestination(href)) {
                link.href = appendStoredAttribution(href, getDefaultCheckoutAttribution(link));
            }
        });
    }

    function trackPlannerEntry(params) {
        const eventParams = Object.assign({
            page_location: window.location.href,
            page_path: locationPath,
            planner_host: currentHost
        }, sanitizeObject(params));

        trackEvent('planner_entry', eventParams);
    }

    function trackPlannerCtaClick(params) {
        trackEvent('planner_cta_click', sanitizeObject(params));
    }

    function trackCheckoutStart(params) {
        const eventParams = sanitizeObject(params);
        const dedupeValue = eventParams.destination_url || eventParams.checkout_path || eventParams.source_page || locationPath;

        if (window.sessionStorage && dedupeValue) {
            const existing = safeJsonParse(window.sessionStorage.getItem(CHECKOUT_DEDUPE_KEY)) || {};
            if (existing.value === dedupeValue && Date.now() - existing.timestamp < 1500) {
                return;
            }

            window.sessionStorage.setItem(CHECKOUT_DEDUPE_KEY, JSON.stringify({
                value: dedupeValue,
                timestamp: Date.now()
            }));
        }

        trackEvent('checkout_start', eventParams);
        trackEvent('begin_checkout', Object.assign({
            currency: 'USD',
            value: 149,
            items: [{
                item_id: 'fatboy-pro',
                item_name: 'Fatboy Financial Planner Pro',
                item_category: 'Software',
                price: 149,
                quantity: 1
            }]
        }, eventParams));
    }

    function trackPurchaseComplete(params) {
        const eventParams = sanitizeObject(params);
        const transactionId = eventParams.transaction_id || currentUrl.searchParams.get('session_id') || currentUrl.searchParams.get('tx');

        if (!transactionId) {
            console.warn('Purchase tracking skipped: missing transaction_id');
            return;
        }

        if (window.sessionStorage) {
            const purchases = safeJsonParse(window.sessionStorage.getItem(PURCHASE_DEDUPE_KEY)) || {};
            if (purchases[transactionId]) {
                return;
            }

            purchases[transactionId] = Date.now();
            window.sessionStorage.setItem(PURCHASE_DEDUPE_KEY, JSON.stringify(purchases));
        }

        const commerceParams = Object.assign({
            transaction_id: transactionId,
            currency: 'USD',
            value: 149,
            tax: 0,
            shipping: 0,
            affiliation: 'Fatboy Software',
            items: [{
                item_id: 'fatboy-pro',
                item_name: 'Fatboy Financial Planner Pro',
                item_category: 'Software',
                price: 149,
                quantity: 1
            }]
        }, eventParams);

        trackEvent('purchase_complete', commerceParams);
        trackEvent('purchase', commerceParams);

        setUserProperties({
            is_customer: 'true',
            product_owned: 'pro'
        });
    }

    function trackScrollDepth() {
        if (!locationPath.includes('/blog/')) {
            return;
        }

        const milestones = {
            '25': false,
            '50': false,
            '75': false,
            '90': false
        };

        window.addEventListener('scroll', function () {
            const denominator = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            const scrollPercent = Math.round((window.scrollY / denominator) * 100);

            Object.keys(milestones).forEach(function (milestone) {
                const percent = parseInt(milestone, 10);
                if (scrollPercent >= percent && !milestones[milestone]) {
                    milestones[milestone] = true;
                    trackEvent('scroll', {
                        percent_scrolled: percent,
                        page_location: window.location.href,
                        page_title: document.title
                    });
                }
            });
        }, { passive: true });
    }

    function trackReadTime() {
        if (!locationPath.includes('/blog/')) {
            return;
        }

        const startTime = Date.now();
        const tracked = {
            '30': false,
            '60': false,
            '120': false
        };

        const intervalId = setInterval(function () {
            const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

            if (timeOnPage >= 30 && !tracked['30']) {
                tracked['30'] = true;
                trackEvent('engagement_time', {
                    seconds: 30,
                    page_location: window.location.href,
                    engagement_level: 'quick_read'
                });
            }

            if (timeOnPage >= 60 && !tracked['60']) {
                tracked['60'] = true;
                trackEvent('engagement_time', {
                    seconds: 60,
                    page_location: window.location.href,
                    engagement_level: 'moderate_read'
                });
            }

            if (timeOnPage >= 120 && !tracked['120']) {
                tracked['120'] = true;
                trackEvent('engagement_time', {
                    seconds: 120,
                    page_location: window.location.href,
                    engagement_level: 'deep_read'
                });
            }

            if (tracked['30'] && tracked['60'] && tracked['120']) {
                clearInterval(intervalId);
            }
        }, 5000);
    }

    function trackBlogNavigation() {
        document.addEventListener('click', function (event) {
            const link = event.target.closest('a');
            if (!link) {
                return;
            }

            const href = link.getAttribute('href') || link.href || '';
            if (!href || href.startsWith('#')) {
                return;
            }

            const normalizedHref = href.toLowerCase();
            const isInternalBlogLink = normalizedHref.includes('/blog/') &&
                (href.indexOf(locationOrigin) === 0 || !href.startsWith('http'));

            if (isInternalBlogLink) {
                trackEvent('blog_navigation', {
                    link_url: href,
                    link_text: link.textContent.trim().substring(0, 100),
                    source_page: locationPath
                });
            }
        });
    }

    function trackChecklistEvents() {
        if (locationPath.includes('/checklist')) {
            trackEvent('view_item', {
                item_id: 'retirement-checklist',
                item_name: 'Retirement Planning Checklist',
                item_category: 'Lead Magnet',
                value: 0
            });
        }

        const checklistForm = document.getElementById('checklist-download-form');
        if (checklistForm) {
            checklistForm.addEventListener('submit', function () {
                trackEvent('generate_lead', {
                    currency: 'USD',
                    value: 10,
                    item_id: 'retirement-checklist',
                    item_name: 'Retirement Planning Checklist',
                    source: 'website',
                    method: 'email_form'
                });

                setUserProperties({
                    lead_magnet_downloaded: 'retirement_checklist',
                    lead_source: 'website'
                });
            });
        }

        document.addEventListener('click', function (event) {
            const link = event.target.closest('a');
            if (!link) {
                return;
            }

            const href = link.getAttribute('href') || '';
            if (href && href.includes('/checklist')) {
                trackEvent('select_promotion', {
                    promotion_id: 'checklist-cta',
                    promotion_name: 'Retirement Checklist CTA',
                    creative_slot: 'blog_post',
                    source_page: locationPath
                });
            }
        });
    }

    function trackOutboundClicks() {
        document.addEventListener('click', function (event) {
            const link = event.target.closest('a');
            if (!link) {
                return;
            }

            const href = link.href || '';
            if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) {
                return;
            }

            if (href.indexOf(locationOrigin) === 0) {
                return;
            }

            if (isPlannerDestination(href) || isStripeDestination(href)) {
                return;
            }

            trackEvent('click', {
                event_category: 'outbound',
                event_label: href,
                link_text: link.textContent.trim().substring(0, 80),
                link_destination: href,
                transport_type: 'beacon'
            });
        });
    }

    function trackPlannerCtaLinks() {
        document.addEventListener('click', function (event) {
            const link = event.target.closest('a[href]');
            if (!link) {
                return;
            }

            const href = link.getAttribute('href') || link.href || '';
            if (!isPlannerDestination(href)) {
                return;
            }

            trackPlannerCtaClick({
                cta_location: link.getAttribute('data-analytics-location') || link.getAttribute('data-federal-cta') || link.id || 'planner_link',
                cta_text: (link.textContent || '').trim().substring(0, 120),
                destination_url: link.href || href,
                destination_host: (new URL(link.href || href, window.location.href)).hostname,
                planner_intent: inferPlannerIntent(link, href),
                source_page: locationPath
            });
        });
    }

    function trackPurchaseClicks() {
        document.addEventListener('click', function (event) {
            const link = event.target.closest('a[href]');
            if (!link) {
                return;
            }

            const href = link.getAttribute('href') || link.href || '';
            if (!isStripeDestination(href)) {
                return;
            }

            trackCheckoutStart({
                checkout_path: 'stripe_payment_link',
                destination_url: link.href || href,
                source_page: locationPath,
                cta_location: link.getAttribute('data-analytics-location') || link.id || 'buy_link',
                cta_text: (link.textContent || '').trim().substring(0, 120)
            });
        });
    }

    function trackEmailLinks() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmCampaign = urlParams.get('utm_campaign');

        if (utmSource === 'email' || utmCampaign) {
            trackEvent('email_click', {
                campaign: utmCampaign || 'unknown',
                source: utmSource || 'email',
                medium: urlParams.get('utm_medium') || 'email',
                content: urlParams.get('utm_content') || '',
                landing_page: window.location.pathname
            });
        }
    }

    function trackComparisonPage() {
        if (!locationPath.includes('/comparison')) {
            return;
        }

        trackEvent('view_item_list', {
            item_list_id: 'competitor_comparison',
            item_list_name: 'Software Comparison',
            items: [
                { item_name: 'Fatboy Financial Planner' },
                { item_name: 'Boldin' },
                { item_name: 'MaxiFi' },
                { item_name: 'NewRetirement' }
            ]
        });
    }

    function trackPricingPage() {
        if (!locationPath.includes('/pricing')) {
            return;
        }

        trackEvent('view_item', {
            currency: 'USD',
            value: 149,
            items: [{
                item_id: 'fatboy-pro',
                item_name: 'Fatboy Financial Planner Pro',
                item_category: 'Software',
                price: 149
            }]
        });
    }

    function trackFormAbandonment() {
        const checklistForm = document.getElementById('checklist-download-form');
        if (!checklistForm) {
            return;
        }

        const emailInput = document.getElementById('email');
        let formStarted = false;
        let formCompleted = false;

        if (!emailInput) {
            return;
        }

        emailInput.addEventListener('focus', function () {
            if (!formStarted) {
                formStarted = true;
                trackEvent('form_start', {
                    form_id: 'checklist-download',
                    form_name: 'Checklist Email Capture'
                });
            }
        });

        checklistForm.addEventListener('submit', function () {
            formCompleted = true;
        });

        window.addEventListener('beforeunload', function () {
            if (formStarted && !formCompleted) {
                trackEvent('form_abandon', {
                    form_id: 'checklist-download',
                    form_name: 'Checklist Email Capture',
                    field_completed: emailInput.value.length > 0
                });
            }
        });
    }

    function trackVideoEngagement() {
        const videos = document.querySelectorAll('video');

        Array.prototype.forEach.call(videos, function (video) {
            const videoTitle = video.getAttribute('data-title') || video.getAttribute('title') || 'Unknown video';
            const videoSource = video.currentSrc || video.src;

            video.addEventListener('play', function () {
                trackEvent('video_start', {
                    video_title: videoTitle,
                    video_url: videoSource
                });
            }, { once: true });

            video.addEventListener('ended', function () {
                trackEvent('video_complete', {
                    video_title: videoTitle,
                    video_url: videoSource
                });
            }, { once: true });
        });
    }

    window.FatboyAnalytics = Object.assign(window.FatboyAnalytics || {}, {
        appendStoredAttribution: appendStoredAttribution,
        getAttributionData: getAttributionData,
        persistCurrentAttribution: captureCurrentAttribution,
        setUserProperties: setUserProperties,
        trackCheckoutStart: trackCheckoutStart,
        trackEvent: trackEvent,
        trackPlannerCtaClick: trackPlannerCtaClick,
        trackPlannerEntry: trackPlannerEntry,
        trackPurchaseComplete: trackPurchaseComplete
    });

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        captureCurrentAttribution();
        decorateCrossDomainLinks();
        trackScrollDepth();
        trackReadTime();
        trackBlogNavigation();
        trackChecklistEvents();
        trackOutboundClicks();
        trackPlannerCtaLinks();
        trackPurchaseClicks();
        trackEmailLinks();
        trackComparisonPage();
        trackPricingPage();
        trackFormAbandonment();
        trackVideoEngagement();

        console.info('GA4 custom event tracking is ready');
        console.info('Tip: run testGA4() from the console to send a sanity-check event');
    }

    window.testGA4 = function () {
        return ensureGA4Ready().then(function (ready) {
            if (!ready) {
                console.error('GA4 test event skipped (gtag unavailable).');
                return false;
            }

            window.gtag('event', 'test_event', buildEventParams({
                event_category: 'test',
                event_label: 'Manual console check',
                value: 1
            }));

            console.info('test_event sent to GA4 Realtime > Events');
            return true;
        });
    };

    init();
})();
