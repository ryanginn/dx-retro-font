var settings = {
    frequencyFontEnabled: false,
};

function applyFontToElements(fontName) {
    console.log('Applying font to elements with font name:', fontName);
    $('.text-big').css({
        'font-family': 'Titillium Web, sans-serif',
        'padding': '10px'
    });

    if (settings.frequencyFontEnabled === true) {
        $('#data-frequency').css({
            'font-family': fontName + ', Arial, sans-serif',
            'padding': '10px', // Add padding to the text
            'display': 'flex', // Set display to flex
            'align-items': 'center', // Center vertically
            'justify-content': 'center', // Center horizontally
            'text-align': 'center' // Center the text
        });
    } else {
        $('.text-big').css({
            'font-family': fontName + ', Arial, sans-serif',
            'padding': '10px'
        });
    }

    $('#data-ps').css({
        'font-family': 'Roboto Mono, monospace',
        'padding': '10px'
    });
}
function loadFont(url) {
    var font = new FontFace('Retro-font', 'url(' + url + ')');
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        applyFontToElements('Retro-font');
    }).catch(function(error) {
        console.error('Font loading failed: ' + error);
    });
}
loadFont('font.ttf');
