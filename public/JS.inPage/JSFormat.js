$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
        $("#homePage-header").addClass("active");
    }
    else {
        $("#homePage-header").removeClass("active");
    }
}); 

   
window.addEventListener("scroll", revealEle)  
function revealEle() {
    var elementNeeds = document.querySelectorAll(".reveal")
    for (var index = 0; index < elementNeeds.length; index++) {
 
        var windowHeight = window.innerHeight
        var revealTop = elementNeeds[index].getBoundingClientRect().top
        var revealPoint = 150

        if (revealTop <= windowHeight - revealPoint) {
            elementNeeds[index].classList.add('reveal-ex')
        } else {
            elementNeeds[index].classList.remove('reveal-ex')
        } 
    }     
}   
