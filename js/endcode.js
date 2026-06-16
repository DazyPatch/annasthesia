document.addEventListener("DOMContentLoaded", function(event) {


let params = new URLSearchParams(document.location.search);
var chapterNum = parseInt(params.get("ch"));
const pagesLengths = [47, 19]
const pagesLength = pagesLengths[chapterNum-1];

const prevPage = document.querySelector(".prev-page");
prevPage.href = "../Readers/readChapter" + chapterNum + ".html?pg=" + pagesLength;

const endOf = document.querySelector(".read-botmoder");
endOf.innerHTML = "End of Chapter " + chapterNum;
});