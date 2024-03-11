//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Text validation functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function permitirPuntoComa(event) {
	var input = event.target;
	var valor = input.value;
	
	// Verificar si el último caracter ingresado es un punto
	if (event.data === '.' && valor.includes('.')) {
		// Reemplazar el punto por una coma
		input.value = valor.replace('.', ',');
		event.preventDefault(); // Evitar que se ingrese el punto
	}
	
	validarNumero();
}

function validarNumero() {
	var inputNumero = document.getElementById("input");
	var numero = inputNumero.value;
	// Eliminar todos los caracteres excepto números y la primera coma
	numero = numero.replace(/[^\d,]/g, '');
	
	// Eliminar comas adicionales
	var partes = numero.split(',');
	if (partes.length > 2) {
		numero = partes[0] + ',' + partes[1];
	}


	if (numero.charAt(0) === "0" && numero.charAt(1) === "0") {
		numero="0";
	} else if (numero.length >= 2 && numero.charAt(0) === "0" && numero.charAt(1) != ",") {
		numero = numero.slice(1);
	}
	// Actualizar el valor del input con el número validado
	inputNumero.value = numero;

	splitNumber();
}

function clearSyst(){
	for (var k = 1; k <= 26; k++){
		document.getElementById("C" + k).style.backgroundColor = "#8A8A8A";
		document.getElementById("C" + k ).style.setProperty("--borderBottom", "none");
		document.getElementById("C" + k).innerHTML = "";
		document.getElementById("V" + k).innerHTML = "";
	}
		
		flechaUp.style.display = "none";
		colaF.style.display = "none";
		colaFL.style.display = "none";
}


function splitNumber() {
	let input = document.getElementById("input").value;
	const numeroFloat = parseFloat (input.replace(',', '.'));
	
	if (input === '' || numeroFloat === 0 ) {
		// La celda está vacía, terminamos la función sin hacer nada más
		clearSyst();
		document.getElementById("textoRes1").innerHTML = "";
		document.getElementById("textoRes2").innerHTML = "";
		return;
	}
	
	popupsClose();
	
	let exponente1 = parseFloat(escalaSelect.selectedOptions[0].getAttribute("data-exponent"));
	let exponente2 = parseFloat(unidadSelect.selectedOptions[0].getAttribute("data-exponent"));
	let inputMult = exponente1 - exponente2;
	
	let lenInp = input.length;
	let posInp = input.indexOf(',');
	if (posInp < 0){
	  posInp = lenInp;
	  }

	let result = input;
	var absInputMult = Math.abs(inputMult);
	
	if (inputMult >= 1) {
		for (var i = posInp; i <= posInp + absInputMult - 1; i++) {
			if (i >= lenInp - 1) {
				result = result.replace(',', '');
				result = result + "0";
				}
			else if (i < lenInp - 2) {
	
				var j = i + 1 ;
				result = result.replace(',', '');
				result = result.substring(0, j) + "," + result.substring(j);
				}
			else {
				result = result.replace(',', '');
				}
			}
		}
	else if (inputMult < 0) {
		
		for (var i = 1 ; i <= absInputMult; i++) {
			if (i < posInp) {
				var j = posInp - i;
				if (result.charAt(0) === "0"){
					result = result.replace('0,', '');
					result = result.substring(0, j) + "," + result.substring(j);
				}else{
					result = result.replace(',', '');
					result = result.substring(0, j) + "," + result.substring(j);
				}
			}
			else if (i >= posInp ) {
				result = result.replace(',', '');
				result = "0," + result;
				}
			}
	}
		
	result = result.toString();
	result = result.replace('.', ',');
	
	
	var numRes = parseFloat(result.replace(',', '.'));

	numRes = numRes.toExponential();
	numRes = numRes.replace('.', ',') + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "]";

	let length = result.length;
	let position = result.indexOf(',') - 1;

	var posExp = 14 + exponente1 - exponente2;
	if (position >= 0) {
		var posIni = exponente1 + 2 - position;
		} else {
		var posIni = exponente1 + 2 - length + 1;
		}
	var posFin = posIni + length;
	
	//Limitando el numero a la cantidad de celdas del tablero
	var countI = 0;
	if (posIni <= 0){
		posIni = 1;
		countI = posInp - 2 - exponente2;
	}
	if (posFin >= 26){posFin = 27}
			
	clearSyst()
	
	var j = posIni
	// Funto to load the number in de i postion
	for (var i = countI; i < length; i++) {
	
		if (result.charAt(i) === ",") {
			j--
			document.getElementById("C" + j).style.backgroundColor = "#DBDBDB";
			document.getElementById("C" + j).innerHTML = result.charAt(i); 
		} else if (j < posFin ) {
			if (i === 0 && result.charAt(0) === "0" && result.charAt(1) !== ",") {

			} else {
				document.getElementById("V" + j).innerHTML = result.charAt(i);
				if (position < 0 && j === posFin - 1 ){
					document.getElementById("C" + j).style.backgroundColor = "#DBDBDB";
					}
			}
		}
		j++;
	}
	
	let language = document.getElementById("selectLang").innerHTML;
	
	if (language === "es") { 
		if (exponente1 > exponente2){
			//Texto de explicaion de la accion
			let textoRes1 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] se multiplico " + inputMult + " veces por 10, lo que desplaza la coma a " + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "], como muestra la flecha de arriba.";
			document.getElementById("textoRes1").innerHTML = textoRes1;
			let textoRes2 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] * 10^" + inputMult + " = " + result + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "] = " + numRes.replace('.', ',');
			document.getElementById("textoRes2").innerHTML = textoRes2;
		}else if (exponente1 < exponente2){		
			//Texto de explicaion de la accion
			let textoRes1 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] se divide " + absInputMult + " veces entre  10, lo que desplaza la coma a " + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "], como muestra la flecha de arriba.";
			document.getElementById("textoRes1").innerHTML = textoRes1;
			let textoRes2 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] / 10^" + absInputMult + " = " + result + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "] = " + numRes.replace('.', ',');
			document.getElementById("textoRes2").innerHTML = textoRes2;
		} else {
			document.getElementById("textoRes1").innerHTML = "";
			document.getElementById("textoRes2").innerHTML = "";
		}
	} else if (language === "en") { 
		if (exponente1 > exponente2){
			//Texto de explicaion de la accion
			let textoRes1 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] is multiplied " + inputMult + " times by 10, which moves the decimal point to " + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "], as shown in the above arrow.";
			document.getElementById("textoRes1").innerHTML = textoRes1;
			let textoRes2 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] * 10^" + inputMult + " = " + result + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "] = " + numRes.replace('.', ',');
			document.getElementById("textoRes2").innerHTML = textoRes2;
		}else if (exponente1 < exponente2){		
			//Texto de explicaion de la accion
			let textoRes1 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] is divided " + absInputMult + " times by 10, which moves the decimal point to " + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "], as shown in the above arrow.";
			document.getElementById("textoRes1").innerHTML = textoRes1;
			let textoRes2 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] / 10^" + absInputMult + " = " + result + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "] = " + numRes.replace('.', ',');
			document.getElementById("textoRes2").innerHTML = textoRes2;
		} else {
			document.getElementById("textoRes1").innerHTML = "";
			document.getElementById("textoRes2").innerHTML = "";
		}
	
	} else if (language === "de") { 
		if (exponente1 > exponente2){
			//Texto de explicaion de la accion
			let textoRes1 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] wird " + inputMult + " mal mit 10 multipliziert, wodurch sich der Dezimalpunkt auf " + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "] verschiebt (siehe Pfeil oben).";
			document.getElementById("textoRes1").innerHTML = textoRes1;
			let textoRes2 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] * 10^" + inputMult + " = " + result + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "] = " + numRes.replace('.', ',');
			document.getElementById("textoRes2").innerHTML = textoRes2;
		}else if (exponente1 < exponente2){		
			//Texto de explicaion de la accion
			let textoRes1 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] wird " + absInputMult + " mal durch 10, dividiert, wodurch sich der Dezimalpunkt auf " + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "] verschiebt (siehe Pfeil oben).";
			document.getElementById("textoRes1").innerHTML = textoRes1;
			let textoRes2 = input + " [" + unidadSelect.selectedOptions[0].getAttribute("value") + "] / 10^" + absInputMult + " = " + result + " [" + escalaSelect.selectedOptions[0].getAttribute("value") + "] = " + numRes.replace('.', ',');
			document.getElementById("textoRes2").innerHTML = textoRes2;
		} else {
			document.getElementById("textoRes1").innerHTML = "";
			document.getElementById("textoRes2").innerHTML = "";
		}
	} else {
		document.getElementById("textoRes1").innerHTML = "";
		document.getElementById("textoRes2").innerHTML = "";
	}

	arrowDarw ();
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Funktion to draw the Arrow
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function arrowDarw () {
	var numero = document.getElementById("input").value
	
	var exponente1 = parseFloat(unidadSelect.selectedOptions[0].getAttribute("data-exponent"));  
	var exponente2 = parseFloat(escalaSelect.selectedOptions[0].getAttribute("data-exponent"));

	let indiceBot = document.getElementById("indice").innerHTML;
	

	// Obtener la posición del elemento con respecto al viewport
	var posCenter = elementoCenter.getBoundingClientRect();
	var posicionV1 = elementoV1.getBoundingClientRect();
	var posicionC1 = elementoC1.getBoundingClientRect();

	// La posición incluye propiedades como top, bottom, left, right, width y height
	var posCenterLeft = posCenter.left
	var posicionV1Left = posicionV1.left;
	var posicionC1Left = posicionC1.left;
	var widthV1 = posicionV1.width;
	var widthC1 = posicionC1.width;

	var iniBlock = posicionV1Left - posCenterLeft + ( widthV1 + widthC1 ) + ( widthV1 + widthC1/2 ) - 5;
	var posOrig = 2 + exponente1;
	let color = "red";

	if (indiceBot === "2"){
		color = "#D9D412";
	} else if (indiceBot === "3"){
		color = "#5CB037";
	} 

	unidad.style.setProperty("--colorBotSelect", color);
	escala.style.setProperty("--colorBotSelect", color);

	if (input && exponente1 != exponente2 && numero != "") {
		
		flechaUp.style.display = "";
		colaF.style.display = "";
		colaFL.style.display = "";
		
		document.getElementById("C" + posOrig ).style.setProperty("--borderBottom", "4px solid " + color);
		colaF.style.borderColor = color;
		flechaUp.style.borderBottomColor = color;
		


		if (exponente1 < exponente2){
		// posicion de la felcha
		var lengFlecha = (( widthV1 + widthC1 ) * (exponente2 - exponente1)) + 4;
		var iniFlecha = iniBlock + ( widthV1 + widthC1 ) * exponente1 + 1 ;
		var posFlecha = iniFlecha + lengFlecha - 9;

		//valores en las variables
		flechaUp.style.setProperty("--leftFUp", posFlecha + "px");
		colaF.style.setProperty("--leftCola", iniFlecha - 1 + "px");
		colaF.style.setProperty("--widthCola", lengFlecha + "px");
		colaFL.style.setProperty("--leftCola", iniFlecha + "px");
		colaFL.style.setProperty("--widthCola", lengFlecha + "px");
		colaFL.style.setProperty("--cFLcolorBL", color);
		colaFL.style.setProperty("--cFLcolorBR", "transparent");

		}else if (exponente1 > exponente2){

			var lengFlecha = (( widthV1 + widthC1 ) * (exponente1 - exponente2)) + 4;
			var iniFlecha = iniBlock + ( widthV1 + widthC1 ) * exponente2 + 1;
			var posFlecha = iniFlecha - 5;
		
			//valores en las variables
			flechaUp.style.setProperty("--leftFUp", posFlecha + "px");
			colaF.style.setProperty("--leftCola", iniFlecha - 1 + "px");
			colaF.style.setProperty("--widthCola", lengFlecha + "px");
			colaFL.style.setProperty("--leftCola", iniFlecha + "px");
			colaFL.style.setProperty("--widthCola", lengFlecha + "px");
			colaFL.style.setProperty("--cFLcolorBL", "transparent");
			colaFL.style.setProperty("--cFLcolorBR", color);

		} 
	}else {
		color = "transparent";
		document.getElementById("C" + posOrig ).style.setProperty("--borderBottom", "4px solid " + color);
		flechaUp.style.display = "none";
		colaF.style.display = "none";
		colaFL.style.display = "none";
	}
}


//Funcion parta la activacion al presionar el boton
function presCell(numCell){
	var cellNumber = numCell;
	changeColor(cellNumber);
	createOptions(cellNumber);
}

function changeColor(cellNumber) {
	for (var i = 1; i <= 3; i++) {
		var cell = document.getElementById("cell" + i);
		cell.style.backgroundColor = "darkgray";
		cell.style.fontSize = "15px";
		cell.style.fontWeight = "none";
		cell.style.textDecoration = "none";
		cell.style.border = "1px solid";
		}

	cell = document.getElementById("cell" + cellNumber);
	cell.style.fontSize = "20px";
	cell.style.fontWeight = "bold";
	cell.style.textDecoration = "underline";
	cell.style.border = "4px solid";

	if (cellNumber === "1"){ cell.style.backgroundColor = "#FFFFFF"; } 
	else if (cellNumber === "2"){ cell.style.backgroundColor = "#FFFD55"; } 
	else if (cellNumber === "3"){ cell.style.backgroundColor = "#5CB037"; }
	
	arrowDarw ();
}

cell1.addEventListener('mouseenter', function() {
	let indice = document.getElementById("indice").innerHTML;
	if (indice !== "1"){
		cell1.style.backgroundColor = "gray";
		cell1.style.textDecoration = "underline";
		cell1.style.border = " 4px solid black";
		cell1.style.fontSize = "20px";
	} 
});

cell2.addEventListener('mouseenter', function() {
	let indice = document.getElementById("indice").innerHTML;
	if (indice !== "2"){
		cell2.style.backgroundColor = "gray";
		cell2.style.textDecoration = "underline";
		cell2.style.border = " 4px solid black";
		cell2.style.fontSize = "20px";
	} 
});

cell3.addEventListener('mouseenter', function() {
	let indice = document.getElementById("indice").innerHTML;
	if (indice !== "3"){
		cell3.style.backgroundColor = "gray";
		cell3.style.textDecoration = "underline";
		cell3.style.border = " 4px solid black";
		cell3.style.fontSize = "20px";
	}  
});

cell1.addEventListener('mouseleave', function() {
	let indice = document.getElementById("indice").innerHTML;
	if (indice !== "1"){
		cell1.style.backgroundColor = "darkgray";
		cell1.style.textDecoration = "none";
		cell1.style.border = " 1px solid black";
		cell1.style.fontSize = "18px";
	} 
});

cell2.addEventListener('mouseleave', function() {
	let indice = document.getElementById("indice").innerHTML;
	if (indice !== "2"){
		cell2.style.backgroundColor = "darkgray";
		cell2.style.textDecoration = "none";
		cell2.style.border = " 1px solid black";
		cell2.style.fontSize = "18px";
	} 
});

cell3.addEventListener('mouseleave', function() {
	let indice = document.getElementById("indice").innerHTML;
	if (indice !== "3"){
		cell3.style.backgroundColor = "darkgray";
		cell3.style.textDecoration = "none";
		cell3.style.border = " 1px solid black";
		cell3.style.fontSize = "18px";
	} 
});

// Función que crea las opciones del selector según el valor de índice
function createOptions(indice) {

	// Obtener el elemento <select>
	var select = document.getElementById("unidad");
	// Vaciar las opciones actuales
	select.innerHTML = "";
	// Obtener el elemento <escala>
	var escala = document.getElementById("escala");
	// Vaciar las opciones actuales
	escala.innerHTML = "";
	// Crear un arreglo con las opciones para cada valor de índice
	var options = [
	// Opciones para índice = 1
	[
		{value: "Tm", dataExponent: "0", text: "Tm"},
		{value: "Gm", dataExponent: "3", text: "Gm"},
		{value: "Mm", dataExponent: "6", text: "Mm"},
		{value: "Km", dataExponent: "9", text: "Km"},
		{value: "Hm", dataExponent: "10", text: "Hm"},
		{value: "Dm", dataExponent: "11", text: "Dm"},
		{value: "m", dataExponent: "12", text: "m", selected: true},
		{value: "dm", dataExponent: "13", text: "dm"},
		{value: "cm", dataExponent: "14", text: "cm"},
		{value: "mm", dataExponent: "15", text: "mm"},
		{value: "µm", dataExponent: "18", text: "µm"},
		{value: "nm", dataExponent: "21", text: "nm"},
		{value: "pm", dataExponent: "24", text: "pm"}
	],
	// Opciones para índice = 2
	[
		{value: "Mm^2", dataExponent: "0", text: "Mm^2"},
		{value: "Km^2", dataExponent: "6", text: "Km^2"},
		{value: "ha", dataExponent: "8", text: "ha"},
		{value: "a", dataExponent: "10", text: "a"},
		{value: "m^2", dataExponent: "12", text: "m^2", selected: true},
		{value: "dm^2", dataExponent: "14", text: "dm^2"},
		{value: "cm^2", dataExponent: "16", text: "cm^2"},
		{value: "mm^2", dataExponent: "18", text: "mm^2"},
		{value: "µm^2", dataExponent: "24", text: "µm^2"}
	],
	// Opciones para índice = 3
	[
		{value: "Km^3", dataExponent: "3", text: "Km^3"},
		{value: "Hm^3", dataExponent: "6", text: "Hm^3"},
		{value: "Dm^3", dataExponent: "9", text: "Dm^3"},
		{value: "m^3", dataExponent: "12", text: "m^3", selected: true},
		{value: "dm^3", dataExponent: "15", text: "dm^3"},
		{value: "cm^3", dataExponent: "18", text: "cm^3"},
		{value: "mm^3", dataExponent: "21", text: "mm^3"}
	]
	];
	// Obtener el arreglo de opciones correspondiente al valor de índice
	var optionArray = options[indice - 1];
	// Recorrer el arreglo de opciones y crear los elementos <option>
	for (var i = 0; i < optionArray.length; i++) {
	// Crear un elemento <option>
	var option = document.createElement("option");
	// Asignar el valor, el atributo data-exponent y el texto
	option.value = optionArray[i].value;
	option.setAttribute("data-exponent", optionArray[i].dataExponent);
	option.text = optionArray[i].text;
	// Si la opción tiene la propiedad selected, asignar el atributo selected
	if (optionArray[i].selected) {
		option.selected = true;
	}
	// Agregar la opción al elemento <select>
	select.add(option);
	}
	for (var i = 0; i < optionArray.length; i++) {
	// Crear un elemento <option>
	var option = document.createElement("option");
	// Asignar el valor, el atributo data-exponent y el texto
	option.value = optionArray[i].value;
	option.setAttribute("data-exponent", optionArray[i].dataExponent);
	option.text = optionArray[i].text;
	// Si la opción tiene la propiedad selected, asignar el atributo selected
	if (optionArray[i].selected) {
		option.selected = true;
	}
	// Agregar la opción al elemento <select>
	escala.add(option);
	}
	document.getElementById("indice").innerHTML = indice;
	// Llamar a la función splitNumber para actualizar el resultado
	splitNumber();
}