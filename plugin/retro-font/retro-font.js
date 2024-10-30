        'text-align': 'center',
        // 'color': 'green',
        'font-size': '32px',
    });
    $('#data-frequency').css({
        'font-family': (settings.frequencyFontEnabled ? 'font.ttf' : fontName + ', Arial, sans-serif'),
        'padding': '15px',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'text-align': 'center',
        // 'color': 'green',
    });

    $('#data-ps').css({
        'font-family': (settings.frequencyFontEnabled ? 'Roboto Mono, monospace' : fontName + ', Arial, sans-serif'),
    });
}

function loadFont(url) {
    var font = new FontFace('Retro-font', 'url(' + url + ')');
    font.load().then(function (loadedFont) {
        document.fonts.add(loadedFont);
        applyFontToElements('Retro-font');
    }).catch(function (error) {
        console.error('Font loading failed: ' + error);
    });
}

loadFont('font.ttf');
