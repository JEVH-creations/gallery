// Get modal and elements
var webModal = document.getElementById("webModal");
var webFrame = document.getElementById("webFrame");
var webCaptionText = document.getElementById("webCaption");

// Configure modal
webModal.style.overflow = "hidden"; // Disable modal scrolling (we'll handle it in iframe)

// Configure iframe for full content display
webFrame.style.position = "absolute";
webFrame.style.top = "80px"; // Space for close button
webFrame.style.left = "0";
webFrame.style.width = "100%";
webFrame.style.height = "calc(100% - 180px)";
webFrame.style.border = "none";
webFrame.style.overflowY = "auto"; // Enable iframe scrolling

// Make close button stay fixed during scrolling
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.style.position = "fixed";
closeBtn.style.zIndex = "2"; // Ensure it stays above content

// Handle dynamic content loading
webFrame.onload = function() {
    // Reset iframe height to content height
    try {
        var body = webFrame.contentWindow.document.body;
        var html = webFrame.contentWindow.document.documentElement;
        
        var height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        
        webFrame.style.height = height + "px";
    } catch(e) {
        // Fallback to original height if cross-origin
        webFrame.style.height = "calc(100% - 180px)";
    }
};

// Image click handlers
var imgs = document.getElementsByClassName("img");
for(let img of imgs){
    img.onclick = function(){
        webModal.style.display = "block";
        webFrame.src = this.getAttribute('data-href');
        webCaptionText.innerHTML = this.alt;
    }
}

// Close handler
closeBtn.addEventListener('click', function() {
    webModal.style.display = "none";
    webFrame.src = "";
    webFrame.style.height = "calc(100% - 180px)"; // Reset height
});