//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Menu Buttons functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const bodyExamp = document.getElementById('bodyExamp');
const bodyAboutMUL = document.getElementById('bodyAboutMUL');
const bodySIUnit = document.getElementById('bodySIUnit');
const bodySim = document.getElementById('bodySim');
const bodyPolitcs = document.getElementById('bodyPolitcs');


const navbarButt1 = document.getElementById('navbarButt1');
const navbarButt2 = document.getElementById('navbarButt2');
const navbarButt3 = document.getElementById('navbarButt3');
const navbarButt4 = document.getElementById('navbarButt4');
const navbarButt5 = document.getElementById('navbarButt5');

navbarButt1.addEventListener('click', function() {
	menuClous();

	navbarButt1.style.display = "inline-block"
	navbarButt2.style.display = "inline-block"
	navbarButt3.style.display = "inline-block"
	navbarButt5.style.display = "inline-block"

	bodyExamp.style.display = "block";
	bodySim.style.display = "block";
});	

navbarButt2.addEventListener('click', function() {
	menuClous();

	navbarButt1.style.display = "inline-block"
	navbarButt2.style.display = "inline-block"
	navbarButt3.style.display = "inline-block"
	navbarButt5.style.display = "inline-block"

	bodyAboutMUL.style.display = "block";
	bodySim.style.display = "block";
});	

navbarButt5.addEventListener('click', function() {
	menuClous();

	navbarButt1.style.display = "inline-block"
	navbarButt2.style.display = "inline-block"
	navbarButt3.style.display = "inline-block"
	navbarButt5.style.display = "inline-block"

	bodySIUnit.style.display = "block";
	bodySim.style.display = "block";
});	

plolitics.addEventListener('click', function() {
	menuClous();

	navbarButt1.style.display = "inline-block"
	navbarButt2.style.display = "inline-block"
	navbarButt5.style.display = "inline-block"

	bodyPolitcs.style.display = "block";
});	

function menuClous(){
	navbarButt1.style.display = "none"
	navbarButt2.style.display = "none"
	navbarButt3.style.display = "none"
	navbarButt4.style.display = "none"
	navbarButt5.style.display = "none"
	
	bodyExamp.style.display = "none";
	bodyAboutMUL.style.display = "none";
	bodySIUnit.style.display = "none";
	bodySim.style.display = "none";
	bodyPolitcs.style.display = "none";
	
	scrollToTop();
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Color setings from formular buttons 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function cambiarColor(elemento) {
    let indiceBot = document.getElementById("indice").innerHTML;
    let colorBack = "red";

    if (indiceBot === "2"){
        colorBack = "#D9D412";
    } else if (indiceBot === "3"){
        colorBack = "#5CB037";
    } 

    elemento.style.backgroundColor = colorBack;
}

input.addEventListener('mouseenter', function() {
    cambiarColor(input);
});

unidad.addEventListener('mouseenter', function() {
    cambiarColor(unidad);
});

escala.addEventListener('mouseenter', function() {
    cambiarColor(escala);
});

//color default
input.addEventListener('mouseleave', function() {
	input.style.backgroundColor = "gainsboro";
});

unidad.addEventListener('mouseleave', function() {
	unidad.style.backgroundColor = "gainsboro";
});

escala.addEventListener('mouseleave', function() {
	escala.style.backgroundColor = "gainsboro";
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Functio to hidde the exaples information
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function hiddeExaple (elemento1, elemento2, contenido) {
	if (contenido.style.display === 'none' || contenido.style.display === '') {
		contenido.style.display = 'block';
		elemento1.style.display = 'none';
		elemento2.style.display = 'block';
	} else {
		contenido.style.display = 'none';
		elemento1.style.display = 'block';
		elemento2.style.display = 'none';
	}
}

InfoBut1.addEventListener('click', function() {
	const contenido = document.getElementById('InfTex1');
	const elemento2 = document.getElementById('InfoCloBut1');
	hiddeExaple(InfoBut1, elemento2, contenido);
});	

InfoCloBut1.addEventListener('click', function() {
	const contenido = document.getElementById('InfTex1');
	const elemento1 = document.getElementById('InfoBut1');
	hiddeExaple(elemento1, InfoCloBut1, contenido);
});	


InfoBut2.addEventListener('click', function() {
	const contenido = document.getElementById('InfTex2');
	const elemento2 = document.getElementById('InfoCloBut2');
	hiddeExaple(InfoBut2, elemento2, contenido);
});	

InfoCloBut2.addEventListener('click', function() {
	const contenido = document.getElementById('InfTex2');
	const elemento1 = document.getElementById('InfoBut2');
	hiddeExaple(elemento1, InfoCloBut2, contenido);
});	


InfoBut3.addEventListener('click', function() {
	const contenido = document.getElementById('InfTex3');
	const elemento2 = document.getElementById('InfoCloBut3');
	hiddeExaple(InfoBut3, elemento2, contenido);
});	

InfoCloBut3.addEventListener('click', function() {
	const contenido = document.getElementById('InfTex3');
	const elemento1 = document.getElementById('InfoBut3');
	hiddeExaple(elemento1, InfoCloBut3, contenido);
});	


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Functio button to top
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function scrollToTop() {
	// Desplazamiento suave hacia arriba
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

function mostrarBotonArriba() {
	var botonArriba = document.getElementById("botonArriba");
	// Mostrar el botón solo si el desplazamiento vertical es mayor que 500px
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		botonArriba.style.display = "block";
	} else {
		botonArriba.style.display = "none";
	}
}