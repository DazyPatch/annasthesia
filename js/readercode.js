
let backButtonContainerHeight = 60;
const usingBackButton = true;
const wordpressImageFolderPath = "../Chapters/"; //DO NOT CHANGE UNDER NORMAL CIRCUMSTANCE
console.log(window.location.href);
const chapterFolderPath = "Ch1";
const pagesPath = wordpressImageFolderPath + chapterFolderPath + "/";
const pagesLength = 47;

var pages = [];
var showingGoBackAtBeginning = true;


document.addEventListener("scroll", function(event){
    let lastKnownScrollPosition = window.scrollY;
    var roundedPosition = parseInt(lastKnownScrollPosition.toPrecision(2));
    const backButtonContainer = document.querySelector(".backButtonContainer");
    if(showingGoBackAtBeginning || roundedPosition < backButtonContainerHeight){
        //show the container
        
        backButtonContainer.classList.remove("backButtonHidden");
        backButtonContainer.classList.add("backButtonShown")
    } else{
        backButtonContainer.classList.remove("backButtonShown");
        backButtonContainer.classList.add("backButtonHidden")
    }
});
document.addEventListener("DOMContentLoaded", function(event) {
    if (usingBackButton){
        window.scrollTo(0, backButtonContainerHeight);
    }
    
    
    
    for (let i = 0; i < pagesLength; i++){
        var curImg = new Image();
        var leadingZero = i + 1 < 10 ? "0" :'';
        curImg.src = pagesPath + leadingZero + (i+1).toString() + ".png";
        curImg.classList = "pageImage";
        pages.push(curImg);
    }

    const nextButton = document.querySelector(".goNext")
    const prevButton = document.querySelector(".goPrev")
    nextButton.addEventListener("click",  nextPage, false);
    prevButton.addEventListener("click",  nextPage, false);
    
    createPage();
    hideOrShowTouchArea();

    const backButton = document.querySelector(".backButton");
    let urlParts = (window.location.href).split("/");
    urlParts.splice(-2);
    let backURL = "";
    for (const part of urlParts){
        backURL = backURL + part + "/";
    }
    backButton.href = backURL + "index.html";

    setTimeout(function(){
        const backButtonContainer = document.querySelector(".backButtonContainer");
        showingGoBackAtBeginning = false;
        backButtonContainer.classList.remove("backButtonShown");
        backButtonContainer.classList.add("backButtonHidden")
        // alert("a");
    }, 700);
    
});

function initNav2(){
    const navMenu = document.querySelector(".navMenu");  
    let toInsert = '';
    let params = new URLSearchParams(document.location.search);
    var pageNumber = parseInt(params.get("pg"));
    
    navMenu.innerHTML = "";
    for (let i = 0 ; i < pagesLength; i++){
        let upTo = (i+1 <= pageNumber) ? "upTo" : "";
        let newButton = document.createElement("button");
        newButton.classList = "pageToButton " + upTo;
        newButton.setAttribute("to-page", i+1);
        newButton.addEventListener("click", toPage);
        navMenu.appendChild(newButton);
    }
    // navMenu.innerHTML = toInsert;
}


function hideOrShowTouchArea(){
    const nextButton = document.querySelector(".goNext");
    const prevButton = document.querySelector(".goPrev"); 

    // if (nextButton.destination > pagesLength){
    //     nextButton.style.visibility = "hidden";
    //     nextButton.destination = pagesLength;
    // } else{
    //     nextButton.style.visibility = "visible";
    // }

    if (prevButton.destination < 1){
        prevButton.style.visibility = "hidden";
        prevButton.destination = 1;
    } else{
        prevButton.style.visibility = "visible";
    }
}


function goToPageNum(pnum){
    if (usingBackButton){
        window.scrollTo({top: backButtonContainerHeight, behavior: "smooth"});
    }

    if (pnum > pagesLength){
        let urlParts = (window.location.href).split("/");
        urlParts.splice(-1);
        let backURL = "";
        for (const part of urlParts){
            backURL = backURL + part + "/";
        }
        window.location.href = backURL + "end.html";
        return;
    }
    
    const pageNumber = pnum;

    const nextButton = document.querySelector(".goNext");
    const prevButton = document.querySelector(".goPrev"); 
    nextButton.destination = pageNumber + 1;
    prevButton.destination = pageNumber -1;
    hideOrShowTouchArea();
    
    document.querySelector(".pageImageContainer").innerHTML="";
    document.querySelector(".pageImageContainer").appendChild(pages[pageNumber-1]);

    var leadingZero = pageNumber < 10 ? "0" :'';
    pageNumberString = leadingZero + pageNumber.toString();
    const url2 = new URL(window.location.href);

    url2.searchParams.set("pg", pageNumberString);
    window.history.replaceState('', '', url2);
    initNav2();
}
function createPage(){
    let params = new URLSearchParams(document.location.search);
    var pageNumber = parseInt(params.get("pg"));

    if (!pageNumber || pageNumber > pagesLength || pageNumber < 1 ){
        pageNumber = 1;
    }

    goToPageNum(parseInt(pageNumber));
}

function toPage(event){
    const pageNumber = parseInt(event.currentTarget.getAttribute("to-page"));
    goToPageNum(pageNumber);
}

function nextPage(event){
    const pageNumber = event.currentTarget.destination;
    goToPageNum(pageNumber);
    
}