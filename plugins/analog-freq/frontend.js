function loadFont(url) {
    var font = new FontFace('Retro-font', 'url(' + url + ')');
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        applyFontToElements('Retro-font');
    }).catch(function(error) {
        console.error('Font loading failed: ' + error);
    });
}

if(settings.frequencyFontEnabled === true) {

    function applyFontToElements(fontName) {
        $('.text-big').css({
            'font-family': fontName + ', Arial, sans-serif',
            'padding': '10px'
        });
    }

}

else {
    function applyFontToElements(fontName) {
        $('#data-frequency').css({
            'font-family': fontName + ', Arial, sans-serif',
            'padding': '10px'
        });
    }
}

loadFont('font.ttf');