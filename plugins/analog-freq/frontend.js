
function loadFont(url) {
    var font = new FontFace('Retro-font', 'url(' + url + ')');
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        applyFontToElements('Retro-font');
    }).catch(function(error) {
        console.error('Font loading failed: ' + error);
    });
}
function applyFontToElements(fontName) {
    var elements = document.getElementsByClassName('text-big');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontFamily = fontName + ', Arial, sans-serif';
        elements[i].style.padding = '10px';
    }
}
loadFont('font.ttf');
