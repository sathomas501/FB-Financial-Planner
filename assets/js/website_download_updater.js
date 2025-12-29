/**
 * Automatic Download Link Updater for Fatboy Financial Planner
 * Fetches the latest release from GitHub and updates download links automatically
 */

(function() {
    'use strict';

    // Configuration
    const GITHUB_REPO = 'sathomas501/FB-Financial-Planner';
    const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

    /**
     * Find an asset in the release that matches the given pattern
     */
    function findAsset(assets, pattern) {
        return assets.find(asset => pattern.test(asset.name));
    }

    /**
     * Update a link element with new URL and version
     */
    function updateLink(elementId, url, version) {
        const element = document.getElementById(elementId);
        if (element) {
            element.href = url;
            element.setAttribute('data-version', version);
            console.log(`Updated ${elementId}: ${url}`);
        }
    }

    /**
     * Update all elements with a specific class name
     */
    function updateElementsByClass(className, text) {
        const elements = document.getElementsByClassName(className);
        Array.from(elements).forEach(element => {
            element.textContent = text;
        });
    }

    /**
     * Update all elements with data-version attribute
     */
    function updateVersionAttributes(version) {
        const elements = document.querySelectorAll('[data-version]');
        Array.from(elements).forEach(element => {
            element.setAttribute('data-version', version);
        });
    }

    /**
     * Main function to update all download links
     */
    async function updateDownloadLinks() {
        try {
            console.log('Fetching latest release from GitHub...');

            const response = await fetch(GITHUB_API_URL);
            if (!response.ok) {
                throw new Error(`GitHub API returned ${response.status}`);
            }

            const data = await response.json();
            const version = data.tag_name;
            const assets = data.assets;

            console.log(`Latest version: ${version}`);
            console.log(`Available assets:`, assets.map(a => a.name));

            // Define patterns for different file types
            const installerPattern = /Setup.*NSIS\.exe$/i;
            const portablePattern = /Portable.*\.zip$/i;

            // Find the assets
            const installerAsset = findAsset(assets, installerPattern);
            const portableAsset = findAsset(assets, portablePattern);

            // Update installer download links
            if (installerAsset) {
                updateLink('download-free-version', installerAsset.browser_download_url, version);
                updateLink('download-installer', installerAsset.browser_download_url, version);
            } else {
                console.warn('No installer asset found');
            }

            // Update portable download link
            if (portableAsset) {
                updateLink('download-portable', portableAsset.browser_download_url, version);
            } else {
                console.warn('No portable asset found');
            }

            // Update release notes link
            const releaseNotesElement = document.getElementById('release-notes-link');
            if (releaseNotesElement) {
                releaseNotesElement.href = data.html_url;
                console.log(`Updated release-notes-link: ${data.html_url}`);
            }

            // Update version displays
            updateElementsByClass('version-display', version);
            updateVersionAttributes(version);

            console.log('Download links updated successfully!');

            // Send analytics event if gtag is available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download_links_updated', {
                    'event_category': 'Download',
                    'event_label': version,
                    'value': 1
                });
            }

        } catch (error) {
            console.error('Failed to update download links:', error);
            // Links remain at their default values from HTML
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDownloadLinks);
    } else {
        updateDownloadLinks();
    }

    // Expose function globally for manual refresh if needed
    window.updateDownloadLinks = updateDownloadLinks;

})();
