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
// function expand(elem){
//     if (elem.style.transform == "scale(2)"){
//         elem.style.transform = "scale(1)";
//     } else {
//         elem.style.transform = "scale(2)";
//     }
    
// }
// function nextImage(){
//     const element = document.querySelector(".overlay");
//     window.setTimeout(() => document.querySelector(".overlay").focus(), 500);
// }
// let isMouseDown = false;

// document.addEventListener('DOMContentLoaded', function(e){
    
//     let scalefactor = 1.0;
//     document.querySelectorAll('.overlay-item').forEach( (elem) => {
//         elem.addEventListener("wheel", function(event) {
//             event.preventDefault();
//             let direction = event.deltaY > 0 ? -1 : 1;
//             // console.log(direction);
//             if(direction > 0){
//                 scalefactor *= 1.2;
//             }
//             if(direction < 0 && scalefactor > 1){
//                 scalefactor /= 1.2;
//             }
//             elem.style.transform = "scale(" + scalefactor + ")";
//         });
//     });

//     document.querySelectorAll('.overlay-item img').forEach( (elem) => {
        
//         // elem = document.getElementById("container");
//         elem.addEventListener("mousedown", mouseDown, false);
//         elem.addEventListener("mouseup", mouseUp, false);
//         elem.addEventListener("mousemove", onMousemove, false);
        
//     });
    
    
// })

// function mouseDown (){
//     isMouseDown = true;
// }
// function mouseUp (){
//     isMouseDown = false;
// }


// function onMousemove(e){



//     var bounds = e.target.getBoundingClientRect();
//     var x = e.clientX - bounds.left;
//     var y = e.clientY - bounds.top;
//     console.log(x, y);
//     if (isMouseDown){
//         e.target.style.transform = "translate(" + x + "px, " + y +"px)";

//     }
        
// }

// document.getElementsByTagName("body") {
//     let lastScrollTop = elem.scrollTop;
//     // let lastScrollLeft = elem.scrollLeft;

//     elem.addEventListener('scroll', event =>{
//         const scrollTop = elem.scrollTop;
//         // const scrollLeft = elem.scrollLeft;
//         console.log(scrollTop);
//         lastScrollTop = (scrollTop < 0) ? 0 : scrollTop;
//         // lastScrollLeft = (scrollLeft < 0) ? 0 : scrollLeft;
//     });
// };

function scrollToImage(listnum, idx){

    const overlayContainer = document.querySelector(".overlay-container[data-listnum='" + listnum + "']");
    overlayContainer.classList.add("shown");

    const element = document.querySelector(".overlay-container[data-listnum='" + listnum + "'] .overlay");
    window.setTimeout(() => element.focus(), 500);
    const elementToScroll = document.querySelector('[data-idx = "' + idx + '"]');
    elementToScroll.scrollIntoView();
}