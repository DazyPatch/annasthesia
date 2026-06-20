
let backButtonContainerHeight = 60;
const usingBackButton = true;
const wordpressImageFolderPath = "../Chapters/"; //DO NOT CHANGE UNDER NORMAL CIRCUMSTANCE
const chapterFolderPath = "Ch" + chapterNum;
const pagesPath = wordpressImageFolderPath + chapterFolderPath + "/";


var pages = [];
var showingGoBackAtBeginning = true;


function hidePopup(){
    localStorage.setItem("hasSeenPopup", "true");
    getIfNeedsPopup();
}

function getIfNeedsPopup(){
    if (!("hasSeenPopup" in localStorage)) {
        localStorage.setItem("hasSeenPopup", "false");
    }
    const hasSeen = JSON.parse(localStorage.getItem("hasSeenPopup"));
    const popupcontainer = document.querySelector(".popup-container");
    if(hasSeen){
        popupcontainer.style.visibility = "hidden";
    } else{
        popupcontainer.style.visibility = "visible";
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
    getIfNeedsPopup();

    if (!chapterNum || chapterNum > pagesLengths.length || chapterNum < 1 ){
        window.location.href = ".." + (inVSCode ? "/index.html" : "");
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
    if (usingBackButton){
        window.scrollTo(0, document.body.scrollHeight);
    }
    const backButton = document.querySelector(".backButton");
    let url = window.location.href;
    let backURL = url.substring(0, url.lastIndexOf('/'));
    backURL = backURL.substring(0, backURL.lastIndexOf('/'));
    console.log(backURL);
    backButton.href = backURL + "/index.html";

    // removeExtension();
    

    setTimeout(function(){
        const backButtonContainer = document.querySelector(".backButtonContainer");
        showingGoBackAtBeginning = false;
        backButtonContainer.classList.remove("backButtonShown");
        backButtonContainer.classList.add("backButtonHidden")
        // alert("a");
    }, 700);
    
});

addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft"){
        const prevPage = document.querySelector(".goPrev");
        if(prevPage.style.visibility != "hidden"){
            prevPage.click();
        }
        
    }
    if (event.key == "ArrowRight"){
        const nextPage = document.querySelector(".goNext");
        nextPage.click();

        
    }
})


document.addEventListener("scroll", function(event){
    
    let lastKnownScrollPosition = window.scrollY;
    var roundedPosition = Math.round(lastKnownScrollPosition);
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


    if (prevButton.destination < 1 && chapterNum == 1){
        prevButton.style.visibility = "hidden";
        // prevButton.destination = 1;
    } else{
        prevButton.style.visibility = "visible";
    }
}


function goToPageNum(pnum){
    if (usingBackButton){
        window.scrollTo({top: backButtonContainerHeight, behavior: "smooth"});
    }

    if (pnum > pagesLength){
        
        let url = window.location.href;
        let backURL = url.substring(0, url.lastIndexOf('/'));
        // console.log(backURL);

        window.location.href = backURL + "/end" + (inVSCode ? ".html" : "") + "?ch=" + chapterNum;
        return;
    }
    if (pnum < 1){
        
        let url = window.location.href;
        let backURL = url.substring(0, url.lastIndexOf('/'));
        // console.log(backURL + "/end" + (inVSCode ? ".html" : "") + "?ch=" + (chapterNum-1));
        if(chapterNum - 1 == 0){
            window.location.href = ".." + (inVSCode ? "/index.html" : "");
            return;
        }
        window.location.href = backURL + "/end" + (inVSCode ? ".html" : "") + "?ch=" + (chapterNum-1);
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
    url2.searchParams.set("ch", chapterNum);
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