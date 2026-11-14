let backButtonContainerHeight = 60;
const usingBackButton = true;
const wordpressImageFolderPath = "../Chapters/"; //DO NOT CHANGE UNDER NORMAL CIRCUMSTANCE
// const chapterFolderPath = "Ch" + chapterNum;
const pagesPath = wordpressImageFolderPath + "preview" + "/";


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

    // if (!chapterNum || chapterNum > pagesLengths.length || chapterNum < 1 ){
    //     window.location.href = ".." + (inVSCode ? "/index.html" : "");
    // }
    
    
    for (let i = 0; i < previewLength; i++){
        var curImg = new Image();
        var leadingZero = i + 1 < 10 ? "0" :'';
        curImg.src = pagesPath + leadingZero + (i+1).toString() + ".jpg";
        curImg.onerror= function(event){event.target.src = event.target.src.replace("jpg", "png");};
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
    // let url = window.location.href;
    // let backURL = url.substring(0, url.lastIndexOf('/'));
    // backURL = backURL.substring(0, backURL.lastIndexOf('/'));
    // console.log(backURL);
    backButton.href = "./../index.html";

    // if (usingBackButton){
    //     window.scrollTo(0, document.body.scrollHeight);
    //     console.log(document.body.scrollHeight);
    // }
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
        if(nextPage.style.visibility != "hidden"){
            nextPage.click();
        }

        
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
    for (let i = 0 ; i < previewLength; i++){
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


    if (prevButton.destination < 1){
        prevButton.style.visibility = "hidden";
        // prevButton.destination = 1;
    } else{
        prevButton.style.visibility = "visible";
    }

    if (nextButton.destination > previewLength){
        nextButton.style.visibility = "hidden";
        // prevButton.destination = 1;
    } else{
        nextButton.style.visibility = "visible";
    }
}


function goToPageNum(pnum){
    window.scrollTo({top: document.body.scrollHeight, behavior:"smooth"});

    if (pnum > pagesLength){
        
        // let url = window.location.href;
        // let backURL = url.substring(0, url.lastIndexOf('/'));
        // // console.log(backURL);

        // window.location.href = backURL + "/end" + (inVSCode ? ".html" : "") + "?ch=" + chapterNum;
        return;
    }
    if (pnum < 1){
        // pnum = 0;
        // let url = window.location.href;
        // let backURL = url.substring(0, url.lastIndexOf('/'));
        // // console.log(backURL + "/end" + (inVSCode ? ".html" : "") + "?ch=" + (chapterNum-1));
        // if(chapterNum - 1 == 0){
        //     window.location.href = ".." + (inVSCode ? "/index.html" : "");
        //     return;
        // }
        // window.location.href = backURL + "/end" + (inVSCode ? ".html" : "") + "?ch=" + (chapterNum-1);
        return;
    }
    
    const pageNumber = pnum;

    const nextButton = document.querySelector(".goNext");
    const prevButton = document.querySelector(".goPrev"); 
    nextButton.destination = pageNumber + 1;
    prevButton.destination = pageNumber -1;
    hideOrShowTouchArea();
    
    document.querySelector(".pageImageContainer").innerHTML="";
    pages[pageNumber-1].style.display = "inline";
    pages[pageNumber-1].style.height = "100%";
    document.querySelector(".pageImageContainer").appendChild(pages[pageNumber-1]);

    var leadingZero = pageNumber < 10 ? "0" :'';
    pageNumberString = leadingZero + pageNumber.toString();
    const url2 = new URL(window.location.href);
    if (url2.searchParams.get("explain") == 1){
        var explain = document.createElement("div");
        explain.classList.add("explain");
        explain.style.display = "inline";
        explain.style.margin = "50px";
        explain.style.padding = "50px";
        explain.style.boxSizing = "border-box";
        // explain.style.justifyContent = "center";
        // explain.style.alignItems = "center";
        // explain.style.marginLeft = "0";
        explain.style.width = "500px";
        explain.style.height = "fit-content";
        explain.style.minHeight = "200px";
        // explain.style.height = "calc(100% - 100px)";
        explain.style.color = "black";
        explain.style.fontFamily = "Nunito";
        explain.style.zIndex = "100";

        
        const explainString = myexplain[pageNumber-1];
        if (explainString != ""){
            explain.innerHTML =  "Click for text explanation.";
            explain.style.backgroundColor = "white";
            explain.onclick = function() {
                document.querySelector('.explain').style.backgroundColor = "unset";
                document.querySelector('.explain').style.color = "white";
                // document.querySelector('.explain').style.justifyContent = "unset";
                // document.querySelector('.explain').style.alignItems = "unset";
                document.querySelector('.explain').innerHTML = explainString;
                // document.querySelector('.explain').style.zIndex = 0;
            };
        } else{
            explain.style.visibility = "hidden";
        }
        
        // console.log(myexplain);
        
        document.querySelector(".pageImageContainer").appendChild(explain);
    }
    
    // url2.searchParams.set("ch", chapterNum);
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