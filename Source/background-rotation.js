// Source/background-rotation.js
document.addEventListener('DOMContentLoaded', function() {
  const videoBg = document.querySelector('.video-background video');
  const videoContainer = document.querySelector('.video-background');
  
  function updateOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    
    if (isPortrait) {
      // Rotate 90 degrees and center for portrait
      videoContainer.style.transform = 'translate(-50%, -50%) rotate(90deg)';
      videoContainer.style.width = '100vh';
      videoContainer.style.height = '100vw';
      videoContainer.style.position = 'fixed';
      videoContainer.style.left = '50%';
      videoContainer.style.top = '50%';
      videoContainer.style.transformOrigin = 'center center';
      
      // Ensure video fills the rotated container
      if (videoBg) {
        videoBg.style.width = '100%';
        videoBg.style.height = '100%';
        videoBg.style.objectFit = 'cover';
      }
    } else {
      // Reset to normal for landscape
      videoContainer.style.transform = 'none';
      videoContainer.style.width = '100%';
      videoContainer.style.height = '100%';
      videoContainer.style.position = 'fixed';
      videoContainer.style.left = '0';
      videoContainer.style.top = '0';
      
      if (videoBg) {
        videoBg.style.width = '100%';
        videoBg.style.height = '100%';
      }
    }
  }

  // Initial setup
  updateOrientation();
  
  // Event listeners
  window.addEventListener('resize', function() {
    requestAnimationFrame(updateOrientation);
  });
  
  window.addEventListener('orientationchange', function() {
    setTimeout(updateOrientation, 100); // Small delay for iOS
  });
});