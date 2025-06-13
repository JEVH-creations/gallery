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
webFrame.style.minHeight = "80vh"; // Minimum height fallback

// Make close button stay fixed during scrolling
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.style.position = "fixed";
closeBtn.style.zIndex = "2"; // Ensure it stays above content

// Handle dynamic content loading with improved PDF support
webFrame.onload = function() {
    // First try with delay for PDF content
    setTimeout(function() {
        try {
            // Try to get the PDF viewer's container height
            var viewerContainer = webFrame.contentWindow.document.querySelector('.pdfViewer');
            if (viewerContainer) {
                webFrame.style.height = (viewerContainer.scrollHeight + 100) + "px";
                return;
            }
            
            // Fallback to document height
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
            // If we can't access the content, use viewport-based height
            webFrame.style.height = window.innerHeight - 180 + "px";
        }
    }, 500); // 500ms delay
};

// Window resize handler for responsive height
function resizeIframe() {
    if (webModal.style.display === "block") {
        webFrame.style.height = window.innerHeight - 180 + 'px';
        
        // Try to recalculate content height after resize
        setTimeout(function() {
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
                // Keep the viewport-based height if calculation fails
            }
        }, 300);
    }
}

window.addEventListener('resize', resizeIframe);

// Image click handlers
var imgs = document.getElementsByClassName("img");
for(let img of imgs){
    img.onclick = function(){
        webModal.style.display = "block";
        webFrame.src = this.getAttribute('data-href');
        webCaptionText.innerHTML = this.alt;
        
        // Set initial height based on viewport
        webFrame.style.height = window.innerHeight - 180 + "px";
    }
}

// Close handler
closeBtn.addEventListener('click', function() {
    webModal.style.display = "none";
    webFrame.src = "";
    webFrame.style.height = "calc(100% - 180px)"; // Reset height
});