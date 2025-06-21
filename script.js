document.addEventListener('DOMContentLoaded', function() {
    
    var burgerMenu = document.querySelector('.burger-menu');
    var main = document.querySelector('main');
    var mobileMenu = document.querySelector('.mobile-menu');
    var activatedMenu = false;

    burgerMenu.addEventListener('click', function(){
        
        burgerMenu.classList.toggle('active');
        
        if(activatedMenu){
            mobileMenu.style.display = "none"
            activatedMenu = false;
        }else{
            mobileMenu.style.display = "flex";
            activatedMenu = true;
        }
    })
    
    main.addEventListener('click', function(){
        console.log("Aopa")
        burgerMenu.classList = "burger-menu";
        mobileMenu.style.display = "none";
        activatedMenu = false;
    })

    //  ------------------------

    const rotatorDiv = document.querySelector('main');
    const timeoutDuration = 5000;
    const totalImages = 14;
    const imageExtension = '.jpeg';

    const images = []
    for (let i = 1; i <= totalImages; i++) {
        images.push(`docs/backgrounds/${i}${imageExtension}`);
    }

    function preloadImages(){
        for(const url of images){

        }
    }

});


