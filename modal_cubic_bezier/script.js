const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");

openModalBtn.onclick = function() {
   modal.style.visibility = "visible";
   modal.style.opacity = "1";
}

window.onclick = function(event) {
    if (event.target == modal) {
       modal.style.visibility = "hidden";
       modal.style.opacity = "0";
    }
}
