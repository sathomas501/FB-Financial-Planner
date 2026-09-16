(function () {
    'use strict';
    async function verifyPurchase() {
        const id = new URLSearchParams(window.location.search).get('session_id');
        if (!id || !/^cs_live_[A-Za-z0-9]{10,240}$/.test(id)) return;
        try {
            const response = await fetch(
                'https://fatboy-license-server-oc13.vercel.app/api/verify-checkout?session_id=' + encodeURIComponent(id),
                { cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' }
            );
            if (!response.ok) return;
            const result = await response.json();
            if (result.verified !== true || !result.purchase || result.purchase.transaction_id !== id) return;
            if (window.FatboyAnalytics) await window.FatboyAnalytics.trackPurchaseComplete(result.purchase);
        } catch (_) {
            // Fail closed: analytics verification must not block purchase instructions.
            console.warn('Purchase analytics verification unavailable.');
        }
    }
    window.addEventListener('load', verifyPurchase, { once: true });
})();
