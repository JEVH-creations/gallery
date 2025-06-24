// Cookie Consent Banner JavaScript

// Create and inject the cookie banner HTML
function createCookieBanner() {
    const bannerHTML = `
        <div id="cookieBanner">
            <div class="cookie-text">
                \u{1F36A} This site uses cookies to improve functionality and analyze traffic.
            </div>
            <div class="cookie-buttons">
                <button class="cookie-btn decline" onclick="declineCookies()">Decline</button>
                <button class="cookie-btn" onclick="acceptCookies()">Accept</button>
            </div>
        </div>
    `;
    
    // Insert the banner at the end of the body
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
}

// Check if user has already made a choice
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
        loadGoogleAnalytics();
        hideBanner();
    } else if (consent === 'declined') {
        hideBanner();
    } else {
        showBanner();
    }
}

// Accept cookies
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    loadGoogleAnalytics();
    hideBanner();
}

// Decline cookies
function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    hideBanner();
}

// Show banner
function showBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.remove('hidden');
    }
}

// Hide banner
function hideBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.add('hidden');
    }
}

// Load Google Analytics only if accepted
function loadGoogleAnalytics() {
    // Replace G-SLL009BFDG with your actual GA Measurement ID
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-SLL009BFDG';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-SLL009BFDG', {
            'anonymize_ip': true,
            'allow_google_signals': false
        });
    `;
    document.head.appendChild(script2);
}

// Initialize cookie banner when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createCookieBanner();
    checkCookieConsent();
});

// Make functions globally available
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.showBanner = showBanner;