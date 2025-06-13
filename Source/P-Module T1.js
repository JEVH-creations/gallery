/**
 * P-Module T1 - Universal Protection Module
 * © JEVH.creations & CodeDino - Reusable protection for web content
 */

(function() {
    'use strict';
    
    function initializeProtection() {
        // Only critical protections
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('dragstart', e => e.target.tagName === 'IMG' && e.preventDefault());
        // Disable text selection
        document.addEventListener('selectstart', e => e.preventDefault());
    }

    // Initialize on DOM ready
    if (document.readyState !== 'loading') {
        initializeProtection();
    } else {
        document.addEventListener('DOMContentLoaded', initializeProtection);
    }

    // Export
    if (typeof window !== 'undefined') {
        window.PModule = { initialize: initializeProtection };
    }
})();