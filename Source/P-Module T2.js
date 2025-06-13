/**
 * P-Module T2 - Universal Protection Module
 * © JEVH.creations & CodeDino - Reusable protection for web content
 */

(function() {
    'use strict';
    
    // Main protection function
    function initializeProtection() {
        // Disable right-click context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Prevent image dragging (without blocking load)
        document.addEventListener('dragstart', function(e) {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });
        
        // Disable text selection
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Mobile-specific protections
        if ('ontouchstart' in window) {
            // Prevent long-press context menu
            document.addEventListener('longpress', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Disable pinch-zoom
            document.addEventListener('touchmove', function(e) {
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            // Disable double-tap zoom
            let lastTouchTime = 0;
            document.addEventListener('touchend', function(e) {
                const now = Date.now();
                if (now - lastTouchTime <= 300) {
                    e.preventDefault();
                }
                lastTouchTime = now;
            }, { passive: false });
        }
        
        // Disable keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Block developer tools
            if (e.keyCode === 123 || // F12
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
                (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
                (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
                (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
                e.preventDefault();
                return false;
            }
        });
        
        // Console tampering protection (lightweight)
        if (typeof console !== 'undefined') {
            Object.defineProperty(window, 'console', {
                value: console,
                writable: false,
                configurable: false
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initializeProtection, 1);
    } else {
        document.addEventListener('DOMContentLoaded', initializeProtection);
    }
    
    // Optional: Re-apply for dynamic content (remove if not needed)
    if (typeof MutationObserver !== 'undefined') {
        new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    initializeProtection();
                }
            });
        }).observe(document.body, { childList: true, subtree: true });
    }
    
    // Export for module systems if needed
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { initialize: initializeProtection };
    } else if (typeof window !== 'undefined') {
        window.PModule = { initialize: initializeProtection };
    }
})();