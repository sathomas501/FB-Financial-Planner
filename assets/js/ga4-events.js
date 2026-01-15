(function () {
    'use strict';

    const GA_MEASUREMENT_ID = window.GA_MEASUREMENT_ID || null;
    let ga4ReadyPromise = null;
    const locationOrigin = window.location.origin || (window.location.protocol + '//' + window.location.hostname);
    const locationPath = window.location.pathname;
    const locationSearch = window.location.search || '';

    function isGA4Ready() {
        return typeof window.gtag === 'function';
    }

    // Wait for gtag.js to load before flushing events
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

    function buildEventParams(params) {
        const eventParams = {};

        if (params && typeof params === 'object') {
            for (let key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    eventParams[key] = params[key];
                }
            }
        }

        if (GA_MEASUREMENT_ID) {
            eventParams.send_to = GA_MEASUREMENT_ID;
        }

        return eventParams;
    }

    function trackEvent(eventName, params) {
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

            trackEvent('click', {
                event_category: 'outbound',
                event_label: href,
                link_text: link.textContent.trim().substring(0, 80),
                link_destination: href,
                transport_type: 'beacon'
            });
        });
    }

    function trackPurchaseClicks() {
        document.addEventListener('click', function (event) {
            const link = event.target.closest('a');
            if (!link) {
                return;
            }

            const href = link.getAttribute('href') || '';
            if (!href) {
                return;
            }

            if (href.includes('stripe.com') || href.includes('buy.stripe.com')) {
                trackEvent('begin_checkout', {
                    currency: 'USD',
                    value: 149,
                    items: [{
                        item_id: 'fatboy-pro',
                        item_name: 'Fatboy Financial Planner Pro',
                        item_category: 'Software',
                        price: 149,
                        quantity: 1
                    }],
                    source_page: locationPath
                });
            }
        });
    }

    function trackPurchaseComplete() {
        if (locationPath.includes('/purchase-success') || locationSearch.includes('purchase=success')) {
            trackEvent('purchase', {
                currency: 'USD',
                value: 149,
                transaction_id: new URLSearchParams(window.location.search).get('tx') || Date.now().toString(),
                items: [{
                    item_id: 'fatboy-pro',
                    item_name: 'Fatboy Financial Planner Pro',
                    item_category: 'Software',
                    price: 149,
                    quantity: 1
                }],
                affiliation: 'Fatboy Software'
            });

            setUserProperties({
                is_customer: 'true',
                product_owned: 'pro'
            });
        }
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

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        trackScrollDepth();
        trackReadTime();
        trackBlogNavigation();
        trackChecklistEvents();
        trackOutboundClicks();
        trackPurchaseClicks();
        trackPurchaseComplete();
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
