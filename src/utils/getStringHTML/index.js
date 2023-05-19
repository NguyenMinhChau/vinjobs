export function getFirstXLines(htmlString, number) {
	const lines = htmlString
		.split('<br>')
		.slice(0, number)
		.map((line) => line.trim());
	return lines.join('<br>');
}
