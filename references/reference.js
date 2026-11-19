document.onkeydown = function(e){
    if (e.key == "Escape"){
        document.querySelectorAll(".overlay-container").forEach((elem) => {
            elem.classList.remove("shown");
        });
        
    }
    if(e.key == "ArrowLeft"){
        document.querySelector('.shown .overlay').scrollBy({left: - window.innerWidth, behavior:'smooth'});
    }
    if(e.key == "ArrowRight"){
        document.querySelector('.shown .overlay').scrollBy({left: window.innerWidth, behavior:'smooth'});
    }
}

function scrollToImage(listnum, idx){

    const overlayContainer = document.querySelector(".overlay-container[data-listnum='" + listnum + "']");
    overlayContainer.classList.add("shown");

    const element = document.querySelector(".overlay-container[data-listnum='" + listnum + "'] .overlay");
    window.setTimeout(() => element.focus(), 500);
    const elementToScroll = document.querySelector('[data-idx = "' + idx + '"]');
    elementToScroll.scrollIntoView();
}