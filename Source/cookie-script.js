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

/* LEARN MORE FUNCTIONALITY - DISABLED
// Show learn more modal/info
function showLearnMore() {
    document.getElementById('learnMoreModal').classList.remove('hidden');
    // Could also redirect to privacy policy page
    // window.open('/privacy-policy', '_blank');
}

// Hide learn more modal
function hideLearnMore() {
    document.getElementById('learnMoreModal').classList.add('hidden');
}

// Event listener for learn more button
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', showLearnMore);
    }
    
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideLearnMore);
    }
});
*/

// Show banner
function showBanner() {
    document.getElementById('cookieBanner').classList.remove('hidden');
}

// Hide banner
function hideBanner() {
    document.getElementById('cookieBanner').classList.add('hidden');
}

// Load Google Analytics only if accepted
function loadGoogleAnalytics() {
    // Replace G-SLL009BFDG with your actual Google Analytics ID
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkCookieConsent);