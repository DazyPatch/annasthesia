
document.addEventListener("DOMContentLoaded", function(event){
    removeExtension();  
});


function removeExtension(){

    if (!inVSCode){
        const allLinks = document.querySelectorAll("a");
        console.log(allLinks);
        for (link of allLinks){
            link.href = link.href.replace("index.html", "");
            link.href = link.href.replace(".html", "");
            console.log(link.href);
        }
    }
}