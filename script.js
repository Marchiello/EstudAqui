document.addEventListener('DOMContentLoaded', function() {
    
    var burgerMenu = document.querySelector('.burger-menu');
    var main = document.querySelector('main');
    var mobileMenu = document.querySelector('.mobile-menu');
    var activatedMenu = false;

    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        if (activatedMenu) {
            mobileMenu.style.display = "none";
            activatedMenu = false;
        } else {
            mobileMenu.style.display = "flex";
            activatedMenu = true;
        }
    });
    
    main.addEventListener('click', function() {
        burgerMenu.classList.remove('active'); 
        mobileMenu.style.display = "none";
        activatedMenu = false;
    });


    const layers = document.querySelectorAll('.bg-layer');
    
    if (layers.length < 2) {
        console.error("Erro: As duas divs com a classe 'bg-layer' não foram encontradas no HTML.");
        return; 
    }

    const timeoutDuration = 5000;
    const totalImages = 14;
    const imageExtension = '.jpeg'; 

    const images = [];
    for (let i = 1; i <= totalImages; i++) {
        images.push(`doc/backgrounds/${i}${imageExtension}`); 
    }

    function preloadImages() {
        for (const url of images) {
            const img = new Image();
            img.src = url;
        }
    }

    let imageIndex = 0;
    let activeLayerIndex = 0;

    layers[activeLayerIndex].style.backgroundImage = `url(${images[imageIndex]})`;
    layers[activeLayerIndex].classList.add('visible');

    function changeBackground() {
        const inactiveLayerIndex = 1 - activeLayerIndex;
        imageIndex = (imageIndex + 1) % totalImages;
        const nextImageUrl = images[imageIndex];

        layers[inactiveLayerIndex].style.backgroundImage = `url(${nextImageUrl})`;
        
        layers[inactiveLayerIndex].classList.add('visible');
        layers[activeLayerIndex].classList.remove('visible');

        activeLayerIndex = inactiveLayerIndex;
    }
    
    preloadImages();
    setInterval(changeBackground, timeoutDuration);

});