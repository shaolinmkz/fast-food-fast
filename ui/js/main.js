window.addEventListener("load", function(){
    if(this.window.innerWidth < "768px") {
       const fff =  document.getElementsByClassName("fastfoodfast")[0];
        fff.setAttribute("src", "../images/fastfoodfast1.png");
    } else if (this.window.innerWidth >= "768px") {
        const fff = document.getElementsByClassName("fastfoodfast")[0];
        fff.setAttribute("src", "../images/fastfoodfast.png");
    }
})