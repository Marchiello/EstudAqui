document.addEventListener('DOMContentLoaded', function() {
    
    const burgerMenu = document.querySelector('.burger-menu');
    const main = document.querySelector('main');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    const institutionsListElement = document.getElementById('lista-institutions');

    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('opened-menu')
        mobileMenu.style = ""
        mobileMenu.style.transform = "translateX(-120%);";

    });
    
    main.addEventListener('click', function() {
        burgerMenu.classList.remove('active'); 
        mobileMenu.style.display = "none";
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

// --------------------------------
// script.js


const apiUrl = 'http://localhost:3000/institutions';
const institutionsContainer = document.getElementsByClassName("institutions")[0];
const siteHeader = document.querySelector("header");
const siteMain = document.querySelector("main");
const institutionInfoContainer = document.getElementsByClassName("institution-info-container")[0];

// institutionsContainer.style.display = 'none';
// siteHeader.style.display = "none";
// siteMain.style.display = "none";
institutionInfoContainer.style.display = "block"

let allInstitutions = [];
let selectedInstitution;

async function loadInitialData(){

    institutionsContainer.innerHTML = "<p>Carregando instituições...</p>";

    try {

        institutionsContainer.innerHTML = "";


        const response = await fetch(apiUrl);
        allInstitutions = await response.json();

        renderInstitutions();

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        institutionsContainer.innerHTML = `<p>Erro ao carregar instituições. Tente recarregar a página.</p>`
    }
};

async function renderInstitutions(){

    allInstitutions.forEach(inst => {
        
        const institutionID = inst.conciseInstitutionName;

        institutionsContainer.innerHTML += `
        
            <div class="institution-card-link" id=${institutionID} data-id=${institutionID}>

                <div class="institution-card card-iftm">
                    <div class="institution-card-image" style="background-image: url(${inst.institutionImageURL});"></div>
                    <div class="institution-card-overlay"></div>
                    <div class="institution-card-text">${inst.conciseInstitutionName}</div>
                </div>

            </div>
        
        `;
    });



};

async function loadInstitutionCourses(institutionData){

    coursesList.innerHTML = "<br><p>   Carregando Cursos...</p>"

    try {

        coursesList.innerHTML = ""

        institutionData.courses.forEach(course => {
        
            courseID = course.courseName


            coursesList.innerHTML += `
            <div class="menu-container-option" id="${courseID}" data-id="${courseID}">

                 <div class="menu-container-option-symbol">
                    &gt;
                </div>

                <div class="menu-container-option-name">
                    <p>${course.courseName}</p>
                </div>

            </div>
            `

        headerInstitutionName.innerHTML = `
            <h3>${institutionData.institutionName}</h3>
        `

            
        });


    } catch (error) {
        coursesList.innerHTML = "<br><p>   Erro ao carregar cursos!</p>"
    }

}

// function loadCourseInfo(institutionData){

//     preMainMenu.style.display = "none"
//     preMainTitle.innerHTML = `
//         <h2>${courseName}</h2>
//     `

//     institutionMainMain.innerHTML = `
//         <p><strong>Curso: </strong>${institutionData}</p>
//         <p><strong>Período: </strong>${institutionData}</p>
//         <p><strong>Duração:</strong>${institutionData}</p>
//     `

// }

function addListenerSelection(){

    institutionsContainer.addEventListener("click", function(event) {
        const selectedButton = event.target.closest('.institution-card-link');

        if(selectedButton){
            const institutionID = selectedButton.id;
  

            selectedInstitution = allInstitutions.find(inst => (inst.conciseInstitutionName === institutionID))

            if(selectedInstitution){
                institutionsContainer.style.display = 'none';
                siteHeader.style.display = "none";
                siteMain.style.display = "none";
                institutionInfoContainer.style.display = "block"

                loadInstitutionCourses(selectedInstitution)
                
            }

        }

    })

}

addListenerSelection();
loadInitialData();
