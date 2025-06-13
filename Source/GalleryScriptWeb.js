// Get modal and elements
var webModal = document.getElementById("webModal");
var webFrame = document.getElementById("webFrame");
var webCaptionText = document.getElementById("webCaption");

// Configure modal
webModal.style.overflow = "hidden";

// Configure iframe for full content display
webFrame.style.position = "absolute";
webFrame.style.top = "80px"; // Reduced space for close button
webFrame.style.left = "0";
webFrame.style.width = "100%";
webFrame.style.height = "calc(100% - 60px)"; // Use full available height
webFrame.style.border = "none";

// Make close button stay fixed
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.style.position = "absolute";
closeBtn.style.top = "15px";
closeBtn.style.right = "35px";
closeBtn.style.zIndex = "1001";

// Remove the problematic onload handler that tries to access cross-origin content
// Instead, let the iframe handle its own scrolling

// Image click handlers
var imgs = document.getElementsByClassName("img");
for(let img of imgs){
    img.onclick = function(){
        webModal.style.display = "block";
        var href = this.getAttribute('data-href');
        
        // Add timestamp to prevent caching issues
        if(href.includes('.pdf') || href.includes('html')){
            href += (href.includes('?') ? '&' : '?') + 't=' + Date.now();
        }
        
        webFrame.src = href;
        webCaptionText.innerHTML = this.alt;
        
        // Force iframe to use full height immediately
        webFrame.style.height = "calc(100% - 180px)";
    }
}

// Close handler
closeBtn.addEventListener('click', function() {
    webModal.style.display = "none";
    webFrame.src = "";
    webFrame.style.height = "calc(100% - 60px)";
});

// Handle window resize
window.addEventListener('resize', function() {
    if(webModal.style.display === "block"){
        webFrame.style.height = "calc(100% - 60px)";
    }
});