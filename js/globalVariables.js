// const chapterNum = (window.location.href).split("/").pop().split(".")[0].replace("readChapter", "");
const params = new URLSearchParams(document.location.search);
var chapterNum = parseInt(params.get("ch"));


const pagesLengths = [47, 19]
const pagesLength = pagesLengths[chapterNum-1];