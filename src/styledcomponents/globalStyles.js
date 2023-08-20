import {createGlobalStyle} from  "styled-components"



export const  Globalstyles = createGlobalStyle`
.Modal {
	box-sizing: border-box;
    position: fixed;
	width: 597px;
	height: 262px;
	top: 35%;
	left: 35%;
    background-color: #333333;
	border-radius: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	font-family: 'Lato', sans-serif;
	color: white;
	padding-left: 110px;
	padding-right: 110px;
	font-size: 34px;
	font-weight: 700;
	line-height: 41px;
	letter-spacing: 0em;
	text-align: center;
	div{
		display: flex;
		gap: 10px;
		button{
			width: 	134px;
			height: 37px;
			font-family: Lato;
			font-size: 18px;
			font-weight: 700;
			line-height: 22px;
			letter-spacing: 0em;
			text-align: left;
			border-radius: 5px;
			display: flex;
			align-items: center;
			justify-content:center;

		}
		:nth-child(1){
			color: #1877F2;
			background-color: white;
		}
		:nth-child(2){
			background-color: #1877F2;
			color: white;
		}
	}

    }
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
*{
	box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
html, body {
    background-color: #333333;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`