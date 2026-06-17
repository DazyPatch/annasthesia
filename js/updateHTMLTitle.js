document.addEventListener("DOMContentLoaded", function(event){
    const pageTitle = document.querySelector("title");
    pageTitle.innerHTML = "Chapter " + chapterNum + " - " + pageTitle.innerHTML;
});