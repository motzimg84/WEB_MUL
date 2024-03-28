//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function to dispay the pupups
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const popupWrapper1 = document.getElementById('popupWrapper1');
const popupWrapper2 = document.getElementById('popupWrapper2');
const popupWrapper3 = document.getElementById('popupWrapper3');
const popupWrapper4 = document.getElementById('popupWrapper4');
const helpBtn = document.getElementById('help-btn');
const divBlock = document.getElementById('mostrar_tabla');


function popupsDis() {
		popupWrapper1.style.display = "block";
		popupWrapper2.style.display = "block";
		popupWrapper3.style.display = "block";
		popupWrapper4.style.display = "block";
		helpBtn.style.background = "#60B5EA";
		divBlock.style.height = "1100px";
}

function popupsClose() {
		event.preventDefault();
		popupWrapper1.style.display = "none";
		popupWrapper2.style.display = "none";
		popupWrapper3.style.display = "none";
		popupWrapper4.style.display = "none";
		helpBtn.style.background = "white";
		divBlock.style.height = "";
}

helpBtn.addEventListener('click', () => {
	if (popupWrapper1.style.display === "none") {
		popupsDis();
	} else {
		popupsClose()
	}
	
});