// GA4 Custom Event Tracking for Fatboy Software
// This file tracks user engagement, conversions, and the purchase funnel

(function() {
    'use strict';

    // Utility: Check if GA4 is loaded
    function isGA4Ready() {
        return typeof gtag !== 'undefined';
    }

    // Utility: Track event with error handling
    function trackEvent(eventName, params) {
        if (isGA4Ready()) {
            gtag('event', eventName, params);
            console.log('GA4 Event:', eventName, params);
        } else {
            console.warn('GA4 not loaded:', eventName);
        }
    }

    // ====================
    // BLOG ENGAGEMENT TRACKING
    // ====================

    // Track scroll depth on blog posts
    function trackScrollDepth() {
        // Only track on blog posts
        if (!window.location.pathname.includes('/blog/')) return;

        let scrollTracked = {
            '25': false,
            '50': false,
            '75': false,
            '90': false
        };

        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            // Track milestones
            Object.keys(scrollTracked).forEach(function(milestone) {
                if (scrollPercent >= parseInt(milestone) && !scrollTracked[milestone]) {
                    scrollTracked[milestone] = true;
                    trackEvent('scroll', {
                        'percent_scrolled': parseInt(milestone),
                        'page_location': window.location.href,
                        'page_title': document.title
                    });
                }
            });
        });
    }

    // Track time spent reading blog posts
    function trackReadTime() {
        if (!window.location.pathname.includes('/blog/')) return;

        const startTime = Date.now();
        let tracked30s = false;
        let tracked60s = false;
        let tracked120s = false;

        setInterval(function() {
            const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

            if (timeOnPage >= 30 && !tracked30s) {
                tracked30s = true;
                trackEvent('engagement_time', {
                    'seconds': 30,
                    'page_location': window.location.href,
                    'engagement_level': 'quick_read'
                });
            }

            if (timeOnPage >= 60 && !tracked60s) {
                tracked60s = true;
                trackEvent('engagement_time', {
                    'seconds': 60,
                    'page_location': window.location.href,
                    'engagement_level': 'moderate_read'
                });
            }

            if (timeOnPage >= 120 && !tracked120s) {
                tracked120s = true;
                trackEvent('engagement_time', {
                    'seconds': 120,
                    'page_location': window.location.href,
                    'engagement_level': 'deep_read'
                });
            }
        }, 5000); // Check every 5 seconds
    }

    // Track blog post navigation (internal links)
    function trackBlogNavigation() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Track internal blog post links
            if (href.includes('/blog/') && !href.startsWith('http')) {
                trackEvent('blog_navigation', {
                    'link_url': href,
                    'link_text': link.textContent.trim().substring(0, 100),
                    'source_page': window.location.pathname
                });
            }

            // Track external links
            if (href.startsWith('http') && !href.includes('fatboysoftware.com')) {
                trackEvent('outbound_link', {
                    'link_url': href,
                    'link_domain': new URL(href).hostname,
                    'link_text': link.textContent.trim().substring(0, 50)
                });
            }
        });
    }

    // ====================
    // LEAD MAGNET TRACKING (CHECKLIST)
    // ====================

    function trackChecklistEvents() {
        // Track checklist page view
        if (window.location.pathname.includes('/checklist')) {
            trackEvent('view_item', {
                'item_id': 'retirement-checklist',
                'item_name': 'Retirement Planning Checklist',
                'item_category': 'Lead Magnet',
                'value': 0
            });
        }

        // Track checklist form submission
        const checklistForm = document.getElementById('checklist-download-form');
        if (checklistForm) {
            checklistForm.addEventListener('submit', function(e) {
                const email = document.getElementById('email')?.value;

                trackEvent('generate_lead', {
                    'currency': 'USD',
                    'value': 10, // Assign value based on your lead worth
                    'item_id': 'retirement-checklist',
                    'item_name': 'Retirement Planning Checklist',
                    'source': 'website',
                    'method': 'email_form'
                });

                // Track in user properties (for segmentation)
                if (isGA4Ready()) {
                    gtag('set', 'user_properties', {
                        'lead_magnet_downloaded': 'retirement_checklist',
                        'lead_source': 'website'
                    });
                }
            });
        }

        // Track checklist CTA clicks from blog posts
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (href && href.includes('/checklist')) {
                trackEvent('select_promotion', {
                    'promotion_id': 'checklist-cta',
                    'promotion_name': 'Retirement Checklist CTA',
                    'creative_slot': 'blog_post',
                    'source_page': window.location.pathname
                });
            }
        });
    }

    // ====================
    // SOFTWARE DOWNLOAD TRACKING
    // ====================

    function trackSoftwareDownloads() {
        // Track download button clicks
        document.addEventListener('click', function(e) {
            const button = e.target.closest('#download-free-version, #download-linux, #download-windows');
            if (!button) return;

            const platform = button.id.includes('linux') ? 'Linux' : 'Windows';
            const version = button.getAttribute('data-version') || 'unknown';

            trackEvent('file_download', {
                'file_name': 'Fatboy-Financial-Planner-' + platform,
                'file_extension': platform === 'Windows' ? 'exe' : 'AppImage',
                'link_id': button.id,
                'link_text': button.textContent.trim(),
                'version': version,
                'platform': platform,
                'download_type': 'free_version'
            });

            // Also track as conversion event
            trackEvent('conversion', {
                'conversion_type': 'software_download',
                'platform': platform,
                'version': 'free',
                'value': 0
            });

            // Set user property
            if (isGA4Ready()) {
                gtag('set', 'user_properties', {
                    'has_downloaded_software': 'true',
                    'download_platform': platform
                });
            }
        });
    }

    // ====================
    // PURCHASE TRACKING
    // ====================

    function trackPurchaseClicks() {
        // Track clicks on "Buy Now" buttons
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Track Stripe checkout clicks
            if (href.includes('stripe.com') || href.includes('buy.stripe.com')) {
                trackEvent('begin_checkout', {
                    'currency': 'USD',
                    'value': 149, // Your Pro version price
                    'items': [{
                        'item_id': 'fatboy-pro',
                        'item_name': 'Fatboy Financial Planner Pro',
                        'item_category': 'Software',
                        'price': 149,
                        'quantity': 1
                    }],
                    'source_page': window.location.pathname
                });
            }
        });
    }

    // Track actual purchases (add this to your Stripe success page)
    function trackPurchaseComplete() {
        // Only on purchase success page
        if (window.location.pathname.includes('/purchase-success') ||
            window.location.search.includes('purchase=success')) {

            trackEvent('purchase', {
                'currency': 'USD',
                'value': 149,
                'transaction_id': new URLSearchParams(window.location.search).get('tx') || Date.now(),
                'items': [{
                    'item_id': 'fatboy-pro',
                    'item_name': 'Fatboy Financial Planner Pro',
                    'item_category': 'Software',
                    'price': 149,
                    'quantity': 1
                }],
                'affiliation': 'Fatboy Software'
            });

            // Set user property
            if (isGA4Ready()) {
                gtag('set', 'user_properties', {
                    'is_customer': 'true',
                    'product_owned': 'pro'
                });
            }
        }
    }

    // ====================
    // EMAIL LINK TRACKING
    // ====================

    function trackEmailLinks() {
        // Track clicks on email links (from marketing emails)
        const urlParams = new URLSearchParams(window.location.search);
        const utm_source = urlParams.get('utm_source');
        const utm_campaign = urlParams.get('utm_campaign');

        if (utm_source === 'email' || utm_campaign) {
            trackEvent('email_click', {
                'campaign': utm_campaign || 'unknown',
                'source': utm_source || 'email',
                'medium': urlParams.get('utm_medium') || 'email',
                'content': urlParams.get('utm_content') || '',
                'landing_page': window.location.pathname
            });
        }
    }

    // ====================
    // COMPARISON PAGE TRACKING
    // ====================

    function trackComparisonPage() {
        if (!window.location.pathname.includes('/comparison')) return;

        trackEvent('view_item_list', {
            'item_list_id': 'competitor_comparison',
            'item_list_name': 'Software Comparison',
            'items': [
                {'item_name': 'Fatboy Financial Planner'},
                {'item_name': 'Boldin'},
                {'item_name': 'MaxiFi'},
                {'item_name': 'NewRetirement'}
            ]
        });
    }

    // ====================
    // PRICING PAGE TRACKING
    // ====================

    function trackPricingPage() {
        if (!window.location.pathname.includes('/pricing')) return;

        trackEvent('view_item', {
            'currency': 'USD',
            'value': 149,
            'items': [{
                'item_id': 'fatboy-pro',
                'item_name': 'Fatboy Financial Planner Pro',
                'item_category': 'Software',
                'price': 149
            }]
        });
    }

    // ====================
    // FORM ABANDONMENT TRACKING
    // ====================

    function trackFormAbandonment() {
        const checklistForm = document.getElementById('checklist-download-form');
        if (!checklistForm) return;

        const emailInput = document.getElementById('email');
        let formStarted = false;
        let formCompleted = false;

        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                if (!formStarted) {
                    formStarted = true;
                    trackEvent('form_start', {
                        'form_id': 'checklist-download',
                        'form_name': 'Checklist Email Capture'
                    });
                }
            });

            checklistForm.addEventListener('submit', function() {
                formCompleted = true;
            });

            // Track abandonment on page unload
            window.addEventListener('beforeunload', function() {
                if (formStarted && !formCompleted) {
                    trackEvent('form_abandon', {
                        'form_id': 'checklist-download',
                        'form_name': 'Checklist Email Capture',
                        'field_completed': emailInput.value.length > 0
                    });
                }
            });
        }
    }

    // ====================
    // VIDEO TRACKING (if you add videos)
    // ====================

    function trackVideoEngagement() {
        // Track YouTube embeds or HTML5 video
        const videos = document.querySelectorAll('video, iframe[src*="youtube"]');

        videos.forEach(function(video) {
            if (video.tagName === 'VIDEO') {
                // HTML5 video tracking
                video.addEventListener('play', function() {
                    trackEvent('video_start', {
                        'video_title': video.getAttribute('data-title') || 'Unknown',
                        'video_url': video.currentSrc
                    });
                });

                video.addEventListener('ended', function() {
                    trackEvent('video_complete', {
                        'video_title': video.getAttribute('data-title') || 'Unknown',
                        'video_url': video.currentSrc
                    });
                });
            }
        });
    }

    // ====================
    // INITIALIZE ALL TRACKING
    // ====================

    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all tracking functions
        trackScrollDepth();
        trackReadTime();
        trackBlogNavigation();
        trackChecklistEvents();
        trackSoftwareDownloads();
        trackPurchaseClicks();
        trackPurchaseComplete();
        trackEmailLinks();
        trackComparisonPage();
        trackPricingPage();
        trackFormAbandonment();
        trackVideoEngagement();

        console.log('GA4 custom event tracking initialized');
    }

    // Start tracking
    init();

})();
