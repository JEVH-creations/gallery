var modal = document.getElementById("myModal");

var imgs = document.getElementsByClassName("img");
for(let img of imgs){
	img.onclick = function(){
	modal.style.display = "block";
	modalImg.src = this.src;
	captionText.innerHTML = this.alt;
 	}
}
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

document.getElementsByClassName("close")[0].addEventListener('click',function() {
	modal.style.display = "none";
})