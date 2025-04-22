var settings = {
    frequencyFontEnabled: true,
    psFontEnabled: false
};

const FONTS = {
    "Default": "",
    "Retro": "retrofont/font.ttf",
    "OpenDyslexic": "retrofont/opendyslexic.ttf",
    "VFD": "retrofont/font12.ttf",
    "Dots": "retrofont/font3.ttf",
    "Pixelyourlife": "retrofont/pixelyourlife.ttf",
    "RumAndBones": "retrofont/RumAndBones.ttf",
    "NinePin": "retrofont/ninepin.ttf"
};

function applyFontToElements(fontName) {
    console.log('Applying font to elements with font name:', fontName);

    const usingDefaultFont = !fontName;
    const customFontFamily = `'Retro-font', 'Titillium Web', sans-serif`;
    const titilliumOnly = `'Titillium Web', sans-serif`;
    const defaultFont = `'Roboto Mono', monospace`;

    if (usingDefaultFont) {
        $('.text-big, .text-medium-big').css({
            'font-family': titilliumOnly,
            'font-size': '',
            'padding': '',
            'margin': '',
            'letter-spacing': '',
            'line-height': '',
            'box-sizing': ''
        });
    } else {
        $('.text-big').css({
            'font-family': customFontFamily,
            'font-size': '48px',
            'padding': '10px',
            'margin': 0,
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'text-align': 'center',
            'line-height': '1.2',
            'letter-spacing': 'normal',
            'box-sizing': 'border-box'
        });

        $('.text-medium-big').css({
            'font-family': customFontFamily,
            'font-size': '32px',
            'padding': '10px',
            'margin': 0,
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'text-align': 'center',
            'line-height': '1.3',
            'letter-spacing': 'normal',
            'box-sizing': 'border-box'
        });
    }

    $('#data-frequency').css({
        'font-family': usingDefaultFont ? titilliumOnly : customFontFamily
    });

    $('#data-ps').css({
        'font-family': (settings.psFontEnabled && !usingDefaultFont) ? customFontFamily : defaultFont
    });
}

function loadFont(url) {
    if (!url) {
        applyFontToElements("");
        return;
    }

    let fullUrl = window.location.origin + '/' + url;
    const font = new FontFace("Retro-font", `url(${fullUrl})`);
    font.load().then(function (loadedFont) {
        document.fonts.add(loadedFont);
        applyFontToElements("Retro-font");
    }).catch(function (error) {
        console.error('Font loading failed: ' + error);
    });
}

function createFontDropdown() {
    const imperialUnitsDiv = $("#imperial-units").closest('.form-group'); // Find the "Imperial units" div.

    if (imperialUnitsDiv.length) {
        imperialUnitsDiv.after(`
            <div id="font-selection-container" class="form-group">
                <label for="font-selection" class="form-label">
                    <i class="fa-solid m-right-10"></i>Select Retro-Font
                </label>
                <div class="dropdown">
                    <input type="text" id="font-selection-input" class="form-control" placeholder="Select font" readonly />
                    <div id="font-selection-options" class="options">
                        ${Object.keys(FONTS).map(font => `<div class="option" data-value="${FONTS[font]}">${font}</div>`).join('')}
                    </div>
                </div>
            </div>
        `);
    }

    let savedFont = localStorage.getItem("SELECTED_FONT") || "";
    let savedFontName = Object.keys(FONTS).find(key => FONTS[key] === savedFont) || "Default";
    $("#font-selection-input").val(savedFontName);

    $("#font-selection-input").click(function () {
        $("#font-selection-options").toggleClass("opened");
    });

    $("#font-selection-options .option").click(function () {
        let selectedFont = $(this).data("value");
        let selectedFontName = $(this).text();

        localStorage.setItem("SELECTED_FONT", selectedFont);
        $("#font-selection-input").val(selectedFontName);
        loadFont(selectedFont);

        $("#font-selection-options").removeClass("opened");
    });
}

function addPsFontCheckbox() {
    const imperialUnitsDiv = $("#imperial-units").closest('.form-group');

    if (imperialUnitsDiv.length) {
        const id = "toggle-ps-font";
        const label = "Use Font on PS Text";

        const psToggleDiv = document.createElement('div');
        psToggleDiv.className = 'form-group';
        psToggleDiv.innerHTML = `
            <div class="switch flex-container flex-phone flex-phone-column flex-phone-center">
                <input type="checkbox" tabindex="0" id="${id}" aria-label="${label}" />
                <label for="${id}"></label>
                <span class="text-smaller text-uppercase text-bold color-4 p-10">${label.toUpperCase()}</span>
            </div>
        `;

        imperialUnitsDiv.after(psToggleDiv);

        const saved = localStorage.getItem("USE_PS_FONT") === "true";
        document.getElementById(id).checked = saved;
        settings.psFontEnabled = saved;

        document.getElementById(id).addEventListener('change', function () {
            settings.psFontEnabled = this.checked;
            localStorage.setItem("USE_PS_FONT", this.checked);

            const savedFont = localStorage.getItem("SELECTED_FONT") || "";
            applyFontToElements(savedFont ? "Retro-font" : "");
        });
    }
}

$(document).ready(function () {
    createFontDropdown();
    addPsFontCheckbox();

    const savedFont = localStorage.getItem("SELECTED_FONT") || "";
    const savedToggle = localStorage.getItem("USE_PS_FONT") === "true";
    settings.psFontEnabled = savedToggle;

    loadFont(savedFont);
});
