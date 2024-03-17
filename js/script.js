//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Variable declaration 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const navbar = document.getElementById('navbar');
const navbarButton = document.getElementById('navbarButton');
const contMenu = document.getElementById('contMenu');
const escalaSelect = document.getElementById("escala");
const unidadSelect = document.getElementById("unidad");

let prevScrollPos = window.pageYOffset;
let navbarHeight = navbar.clientHeight; // Inicialización de navbarHeight
let retractHeight = 0.95 * navbarHeight;

var menuHeight = navbar.style.height;
var elementoCenter = document.getElementById('mostrar_tabla');
var elementoV1 = document.getElementById('V1');
var elementoC1 = document.getElementById('C1');

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Default sethings onload the page
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
window.onload = function() {
	// Llamar a la función una vez al inicio para ejecutarla también al cargar la página
	//Function to modify the Zoom from the page, to maintein the image visible
	//window.onresize();

	// Llamar a la función cuando sea necesario
	actualizarCookiesYCaché();

	var idioma = navigator.language;
	var dosPrimerasLetras = idioma[0] + idioma[1];
	if (dosPrimerasLetras === "es" || dosPrimerasLetras === "en" || dosPrimerasLetras === "de") {
		document.getElementById("selectLang").innerHTML = dosPrimerasLetras;
	} else {
		dosPrimerasLetras = "en";
		document.getElementById("selectLang").innerHTML = dosPrimerasLetras;
	}	
	changeLanguage(dosPrimerasLetras);
	selectLanguage(dosPrimerasLetras);
	changeLangImage(dosPrimerasLetras);
	splitNumber();
	changeColor("1");
	popupsDis();

	window.scrollTo({top: 0, behavior: 'smooth'});
};

function actualizarCookiesYCaché() {
    // Actualizar cookies
    document.cookie = "cookieName=cookieValue; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

    // Limpiar caché
    caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
            caches.delete(cacheName);
        });
    });
}

/*window.onresize = function() {
	var viewportWidth = window.innerWidth;
	if(viewportWidth <= 500) {
	console.log(viewportWidth);
	var zoom = viewportWidth / 1200; // Calcular el nuevo zoom
	document.body.style.zoom = zoom; // Aplicar el zoom al cuerpo del documento
	}

};*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function to adjust the menu bar.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function updateNavbarHeight() {
	navbarHeight = navbar.clientHeight;
    retractHeight = 0.95 * navbarHeight;
    contMenu.style.height = navbarHeight + 'px';

	arrowDarw ();
}

// Llamada inicial a la función para establecer los valores
updateNavbarHeight();

// Listener para el evento resize
window.addEventListener('resize', updateNavbarHeight);

window.onscroll = function() {
	let currentScrollPos = window.pageYOffset;
	// Verifica si el scroll está en la parte superior de la página
	if (currentScrollPos === 0) {
		// Muestra el menú
		navbar.style.top = '0';
	} else {
		// Oculta el menú o realiza otras acciones según tu diseño
		navbar.style.top = `-${navbarHeight}px`;
	}

	prevScrollPos = currentScrollPos;
	
	navbarButton.addEventListener('mouseleave', function() {
		// Restaurar el color original cuando se desactiva
		navbarButton.style.backgroundColor = "#f77d32";
	});
};

//color setting from the navbarButton
navbarButton.addEventListener('mouseenter', function() {
	navbarButton.style.backgroundColor = "#db5400";
	navbar.style.top = '0';
});


navbar.addEventListener('mouseleave', function() {
	navbar.style.top = `-${navbarHeight}px`;
});

function scrollToSection(sectionId) {
	var section = document.getElementById(sectionId);
	var sectionTop = section.offsetTop - navbarHeight - 15;
	window.scrollTo({top: sectionTop, behavior: 'smooth'});
}




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para verificar si un elemento está en la vista
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var video1Visible = false;
var video2Visible = false;
var video3Visible = false;

function isElementInCenterViewport(el) {
    var rect = el.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var center = rect.top + rect.height / 2;
    return center >= 0 && center <= viewportHeight;
}

function handleVisibility() {
    var video1 = document.getElementById('MUL_Laenge');
    var video2 = document.getElementById('MUL_Flechen');
    var video3 = document.getElementById('MUL_Volumen');

    if (video1Visible && !isElementInCenterViewport(video1)) {
        video1.pause();
        
    } else if (!video1Visible && isElementInCenterViewport(video1)) {
        video1.play();
        video1Visible = true;
    }

    if (video2Visible && !isElementInCenterViewport(video2)) {
        video2.pause();
        
    } else if (!video2Visible && isElementInCenterViewport(video2)) {
        video2.play();
        video2Visible = true;
    }

    if (video3Visible && !isElementInCenterViewport(video3)) {
        video3.pause();
        
    } else if (!video3Visible && isElementInCenterViewport(video3)) {
        video3.play();
        video3Visible = true;
    }
}

// Manejar el evento scroll
window.addEventListener('scroll', handleVisibility);


/* Manejar eventos de desplazamiento y redimensionamiento de ventana
window.addEventListener('scroll', handleVisibility);
window.addEventListener('resize', handleVisibility);

// Reproducir el video automáticamente cuando se cargue la página
window.addEventListener('load', handleVisibility);	*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Move text sideways function
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const contenedor = document.getElementById('contenedor');
const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
const cajas = document.querySelectorAll('.caja');

let intervalo;
let currentIndex = 0;

function mostrarCaja(index) {
	for (let i = 0; i < cajas.length; i++) {
		if (i === index) {
			cajas[i].style.display = 'inline-block';
		} else {
			cajas[i].style.display = 'none';
		}
	}
}

function cambiarCaja() {
	currentIndex = (currentIndex + 1) % cajas.length;
	mostrarCaja(currentIndex);
}

function retrocederCaja() {
	currentIndex = (currentIndex - 1 + cajas.length) % cajas.length;
	mostrarCaja(currentIndex);
}

intervalo = setInterval(cambiarCaja, 5000);

anterior.addEventListener('click', () => {
	clearInterval(intervalo);
	retrocederCaja();
	intervalo = setInterval(cambiarCaja, 5000);
});

siguiente.addEventListener('click', () => {
	clearInterval(intervalo);
	cambiarCaja();
	intervalo = setInterval(cambiarCaja, 5000);
});

mostrarCaja(currentIndex);



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// languages functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Funktion to load the .json
const flagElementOption = document.getElementById('languageOptions');
const textsToChange =document.querySelectorAll("[data-section]");

const changeLanguage = async (languages) => {
	const requestJson = await fetch("./languages/" + languages + ".json");
	const textLang = await requestJson.json();

	for (const textToChange of textsToChange) {
		const section = textToChange.dataset.section;
		const value = textToChange.dataset.value;
		if (section === "input"){
			// Obtener el elemento input
			var input = document.getElementById('input');
			// Actualizar el placeholder con el valor del JSON
			input.placeholder = textLang[section][value];
		} else {
			textToChange.innerHTML = textLang[section][value];
		}
		
	}
}	

//Funktion to listen the flag button.
flagElementOption.addEventListener("click", (e) => {
	const language = e.target.parentElement.dataset.languages;
	imgMUL.forEach((image) => {
		if (image.dataset.languages === language){
			document.getElementById("selectLang").innerHTML = language
			changeLanguage(language);
			changeLangImage(language);
			splitNumber();
			popupsDis();
		}
    });

});


// function to change the flags
function selectLanguage(language) {
	var languageSelector = document.getElementById('languageSelector');
	var languageOptions = document.getElementById('languageOptions').getElementsByTagName('img');

	for (var i = 0; i < languageOptions.length; i++) {
		if (languageOptions[i].alt === language.toUpperCase()) {
			languageSelector.getElementsByTagName('img')[0].src = languageOptions[i].src;
		}
	}

	toggleLanguageOptions();
}

function toggleLanguageOptions() {
	var languageOptions = document.getElementById('languageOptions');
	languageOptions.style.display = (languageOptions.style.display === 'none') ? 'block' : 'none';
}

// Close the language options if clicked outside
window.onclick = function(event) {
	var languageSelector = document.getElementById('languageSelector');
	if (!event.target.matches('#languageSelector img')) {
		var languageOptions = document.getElementById('languageOptions');
		if (languageOptions.style.display === 'block') {
			languageOptions.style.display = 'none';
		}
	}
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Image animator
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const imgMUL = document.querySelectorAll('.obsImgMUL');
const imgSimMUL = document.querySelectorAll('.obsImgSimMUL');
const imgIS = document.querySelectorAll('.obsImgIS');

const chargeImag = (entries, observerImg) => {
    entries.forEach((element) => {
        if (element.isIntersecting) {
            element.target.classList.add('visible');
        }
    });
}

const observerImg = new IntersectionObserver(chargeImag, {
    root: null,
    rootMargin: '1000px 500px 1000px 0px',
    threshold: 1.0
});

imgMUL.forEach((image) => {
    observerImg.observe(image);
});

function changeLangImage(language) {
	// Ocultar todas las imágenes
    imgMUL.forEach((image) => {
        image.style.display = 'none';
		if (image.dataset.languages === language){
			image.style.display = 'block';
		}
    });

	imgSimMUL.forEach((image) => {
        image.style.display = 'none';
		if (image.dataset.languages === language){
			image.style.display = 'block';
		}
    });

	imgIS.forEach((image) => {
        image.style.display = 'none';
		if (image.dataset.languages === language){
			image.style.display = 'block';
		}
    });
}