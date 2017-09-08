export function getFontSize(){
	let html = document.getElementsByTagName('html')[0];
	let style = window.getComputedStyle ? window.getComputedStyle(html, "") : html.currentStyle;
	let fontSize = parseInt(style.fontSize);
	return fontSize;
}