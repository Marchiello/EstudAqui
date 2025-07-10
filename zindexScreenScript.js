const coursesList = document.getElementsByClassName("institution-menu-container-options")[0];
const institutionMenuButton = document.getElementsByClassName("institution-menu-button")[0];
const institutionMenuButtonIcon = document.getElementsByClassName("institution-menu-button-icon")[0];
const institutionMenu = document.getElementsByClassName("institution-info-menu")[0];
const institutionExitButton = document.getElementsByClassName("header-exit-button")[0];
const preMainOption1 = document.getElementById("pre-main-option-1");
const preMainOption2 = document.getElementById("pre-main-option-2");
const institutionMainHeader = document.getElementsByClassName("institution-main-container-header")[0];
const institutionMainMain = document.getElementsByClassName("institution-main-container-main")[0];
const preMainOptions = document.getElementsByClassName("pre-main-menu-option");
const mapPlace = document.getElementById("institution-main-container-header-map");
const institutionRoute2 = document.getElementById("institution-route-2");
const institutionRoute1 = document.getElementById("institution-route-1");
const institutionLocation = document.getElementById("institution-location");
const whiteSpaceForMenu = document.getElementById("menu-button-space");
const preMainMenu = document.getElementsByClassName("institution-pre-main-menu")[0];
const preMainTitle = document.getElementsByClassName("pre-main-title")[0];
const headerInstitutionName = document.getElementsByClassName("header-institution-name")[0];

institutionInfoContainer.style.display = "none"


whiteSpaceForMenu.innerHTML = ""
preMainOption1.style.borderBottom = "0.7vw solid"


var institutionMenuButtonActive = false;
"pre-main-menu-option"

// --------------------------------------------
// --------------------------------------------
// Botãozin pra fechar a janela
institutionExitButton.addEventListener("click", function(){
    renderBusRoutes()
    institutionInfoContainer.style.display = "none"
    siteHeader.style.display = "block";
    siteMain.style.display = "block";
    institutionsContainer.style.display = 'block';

    loadInitialData();

});

function renderBusRoutes(){
    
    institutionMainHeader.innerHTML = `<p>Selecione um mapa:</p>`

    institutionMainMain.innerHTML = `
    
        <div class="imch-checkbox">
    
            <div class="imch-checkbox-div">
                <input type="checkbox" name="morning-route" id="institution-location" class=""><br>
                <label for="institution-location">Localização</label>
            </div>
    
            <div class="imch-checkbox-div">
                <input type="checkbox" name="morning-route" id="institution-route-1" class=""><br>
                <label for="institution-route-1">Rota 1</label>
            </div>

             <div class="imch-checkbox-div">
                <input type="checkbox" name="morning-route" id="institution-route-2" class=""><br>
                <label for="institution-route-2">Rota 2</label>
            </div>
                        
        </div>
    
        <div id="institution-main-container-header-map">
        </div>

    `
    
    const institutionRoute1 = document.getElementById("institution-route-1");
    const institutionRoute2 = document.getElementById("institution-route-2");
    const institutionLocation = document.getElementById("institution-location")
    const mapPlace = document.getElementById("institution-main-container-header-map")

    function loadRouteMap(iframe){
        if(iframe === ""){
            mapPlace.innerHTML = `
            <span>Não foi possível obter dados sobre esta rota</span>
            `
        }else{
            mapPlace.innerHTML = `
                    <iframe src="${iframe}" frameborder="0"></iframe>
                `
        }
    }

    institutionRoute1.addEventListener("change", function(){
    institutionRoute2.checked = false;
    institutionLocation.checked = false;
    var selectedRoute = selectedInstitution.routeMaps[0].iframeUrl
    loadRouteMap(selectedRoute)
    });

    institutionRoute2.addEventListener("change", function(){
        institutionRoute1.checked = false;
        institutionLocation.checked = false;
        var selectedRoute = selectedInstitution.routeMaps[1].iframeUrl
        loadRouteMap(selectedRoute)
    });

    institutionLocation.addEventListener("change", function(){
        institutionRoute2.checked = false;
        institutionRoute1.checked = false;
        var selectedRoute = selectedInstitution.routeMaps[2].iframeUrl
        loadRouteMap(selectedRoute)
    });
}

preMainOption1.addEventListener("click", function(){
    preMainOption1.style.borderBottom = "0.7vw solid"
    preMainOption2.style.borderBottom = ""

    institutionMainHeader.innerHTML = `
        <p>Selecione o horário um mapa:</p>
    `

    renderBusRoutes()

})



preMainOption2.addEventListener("click", function(){
    preMainOption1.style.borderBottom = ""
    preMainOption2.style.borderBottom = "0.7vw solid"

    institutionMainHeader.innerHTML = `
        <p>Formas de Ingresso:</p>
    `

    loadIngressModes()
    
})

function renderIngressModes(ingressModes) {
  let html = "";

  ingressModes.forEach((mode) => {
    html += `
      <div class="generic-info-placeholder">
        <h4>${mode.mode}</h4><hr>
        <p>${mode.text}</p>
      </div>
    `;
  });

  institutionMainMain.innerHTML += html;
}

// Interação com o Menu lateral:

institutionMenuButton.addEventListener("click", function() {

    institutionMenuButtonActive = !institutionMenuButtonActive
    institutionMenu.classList.toggle('opened-menu')
    
    if(institutionMenuButtonActive == false){
        institutionMenuButtonIcon.style.transform = "rotate(0deg)"
        institutionMenuButton.style.position = "relative"
        institutionMenuButton.style.marginTop = "-3.5vw"
    }else{
        institutionMenuButtonIcon.style.transform = "rotate(-180deg)"
        institutionMenuButton.style.position = "fixed"
        institutionMenuButton.style.marginTop = "-6vw"
    }
})

// --------------------------------------------
// --------------------------------------------
// Carregar Rotas:

institutionRoute1.addEventListener("change", function(){
    institutionRoute2.checked = false;
    institutionLocation.checked = false;
    var selectedRoute = selectedInstitution.routeMaps[0].iframeUrl
    loadRouteMap(selectedRoute)
});

institutionRoute2.addEventListener("change", function(){
    institutionRoute1.checked = false;
    institutionLocation.checked = false;
    var selectedRoute = selectedInstitution.routeMaps[1].iframeUrl
    loadRouteMap(selectedRoute)
});

institutionLocation.addEventListener("change", function(){
    institutionRoute2.checked = false;
    institutionRoute1.checked = false;
    var selectedRoute = selectedInstitution.routeMaps[2].iframeUrl
    loadRouteMap(selectedRoute)
});

function loadRouteMap(iframe){

    if(iframe === ""){
        mapPlace.innerHTML = `
        <span>Não foi possível obter dados sobre esta rota</span>
        `

    }else{
        mapPlace.innerHTML = `
                <iframe src="${iframe}" frameborder="0"></iframe>
            `
    }

}

// ----------------------------------------------
// ----------------------------------------------
// Carregar modos de ingresso

async function loadIngressModes(){

    institutionMainMain.innerHTML = "<br><p>   Carregando modos de ingresso...</p>"

    try {

        institutionMainMain.innerHTML = "";

        
        modes = selectedInstitution.ingressModes

        renderIngressModes(modes);

    } catch (error) {
        institutionMainMain.innerHTML = "<br><p>   Erro ao carregar modos de ingresso!</p>"
    }

}

// ----------------------------------------------
// ----------------------------------------------
// Interagir com um item especifico da lista de cursos:

institutionMenu.addEventListener("click", function(event){

    const selectedOption = event.target.closest('.menu-container-option');

    if(!selectedOption){
        return   
    };

    const allOptions = institutionMenu.querySelectorAll('.menu-container-option');

    allOptions.forEach(option => {
        const symbolDiv = option.querySelector('.menu-container-option-symbol');
        if (symbolDiv) {
            symbolDiv.innerHTML = '&gt;';
        }
    });

    const selectedSymbolDiv = selectedOption.querySelector('.menu-container-option-symbol');

    if (selectedSymbolDiv) {
        selectedSymbolDiv.innerHTML = '&bull;';
    }

    const selectedCourse = selectedOption.id;

    if(selectedCourse === 'general-options'){
        showGeneralInfo()
        institutionMenu.classList.toggle('opened-menu')
        institutionMenuButtonIcon.style.transform = "rotate(0deg)"
        institutionMenuButton.style.position = "relative"
        institutionMenuButton.style.marginTop = "-3.5vw"
        institutionMenuButtonActive = !institutionMenuButtonActive

    }else if(selectedCourse === "menu-button-space"){

    }else if(selectedCourse){
        courseInfo = selectedInstitution.courses.find(course => (course.courseName === selectedCourse))
        showCourseDetails(courseInfo)
        institutionMenu.classList.toggle('opened-menu')
        institutionMenuButtonIcon.style.transform = "rotate(0deg)"
        institutionMenuButton.style.marginTop = "-3.5vw"
        institutionMenuButton.style.position = "relative"
        institutionMenuButtonActive = !institutionMenuButtonActive
    };
});

function showCourseDetails(courseInfo){

    preMainMenu.style.display = "none"
    preMainTitle.innerHTML = `<h2>${courseInfo.courseName}</h2>`;

    institutionMainHeader.innerHTML = `
    
        <div class="institution-course-info">
            <p><strong>Curso: </strong> ${courseInfo.courseName}</p>
            <p><strong>Turno: </strong> ${courseInfo.coursePeriod}</p>
            <p><strong>Duração: </strong> ${courseInfo.courseTime}</p><br><hr>
        </div>

    `

    institutionMainMain.innerHTML = `
    
        <br><h3>Matérias:</h3><br>

        <div class="course-subjects-container">

        </div>

    `;    

    const courseSubjectsContainer = document.getElementsByClassName("course-subjects-container")[0];
    courseSubjectsContainer.innerHTML = "";

    var courseSubjects = courseInfo.subjects

    if(courseSubjects == "" ){
        
        // alert("Não foi possível encontrar informações sobre as matérias!")
        courseSubjectsContainer.innerHTML = `<span>Não foi possível encontrar informações sobre as matérias!<span>` 

    }else{
        
        courseInfo.subjects.forEach(subject => {
            
            courseSubjectsContainer.innerHTML += `
            
            <div class="course-subject">
                <p>${subject}</p>
            </div>
    
            `
        });
    }
}

function showGeneralInfo(){
    preMainMenu.style.display = "flex"
    preMainTitle.innerHTML = `<h2>Informações Gerais</h2>`
    preMainOption1.style.borderBottom = "0.7vw solid"
    preMainOption2.style.borderBottom = ""
    
    renderBusRoutes()
}
