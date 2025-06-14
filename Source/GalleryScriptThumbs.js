        // Modified gallery script for Gallery4
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");

        var imgs = document.getElementsByClassName("img");
        for(let img of imgs){
            img.onclick = function(){
                modal.style.display = "block";
                // Use the data-fullsize attribute for the modal image
                modalImg.src = this.getAttribute("data-fullsize");
                captionText.innerHTML = this.alt;
            }
        }

        document.getElementsByClassName("close")[0].addEventListener('click',function() {
            modal.style.display = "none";
        });