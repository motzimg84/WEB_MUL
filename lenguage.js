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

    // Save the selected language in localStorage
    localStorage.setItem('selectedLanguage', language);

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