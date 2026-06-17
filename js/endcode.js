addEventListener("keydown", (event) => {
    let params = new URLSearchParams(document.location.search);
    var pageNumber = parseInt(params.get("pg"));

    if (event.key == "ArrowLeft"){
        const prevPage = document.querySelector(".prev-page");
        prevPage.click();
    }
    if (event.key == "ArrowRight"){
        const nextChapter = document.querySelector(".next-chapter");
  
        if(nextChapter.style.display != "none"){
            nextChapter.click();
        }
    }
})

document.addEventListener("DOMContentLoaded", function(event) {

    const prevPage = document.querySelector(".prev-page");
    prevPage.href = "../Readers/read.html?ch=" + chapterNum + "&pg=" + pagesLength;

    const endOf = document.querySelector(".read-botmoder");
    endOf.innerHTML = "End of Chapter " + chapterNum;

    const nextChapter = document.querySelector(".next-chapter");

    if(chapterNum < pagesLengths.length){
        nextChapter.href = "../Readers/read.html?ch=" + (chapterNum+1) + "&pg=" + 1;
    } else{
        nextChapter.style.display = "none";
    }
    // removeExtension();
});