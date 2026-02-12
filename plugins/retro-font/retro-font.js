// ==============================================
// RETRO FONT - RHÍAN MAC G - 12ú FEABHRA 2025 ==
// ==============================================
const SERVER_DEFAULTS = {
    INITIAL_FONT: "Retro Car",            // sets the default font used, leave Default if you want the default webserver font
    INITIAL_COLOR: "Amber",   // sets the colour of the PS text - leave Default (White) if you want it left as white
    INITIAL_PS_FONT_ENABLED: true      // toggles if PS acquires the custom font by default, leave in false state if you do not want.
};

// CONFIGURATION GUIDE:
// format: "Font Name": { url: "path/to/font.ttf", scale: 1.0 }
// scale: 1.0 is normal size. Use 0.8 for smaller, 1.2 for larger, etc.
const FONTS = {
    "Default":       { url: "", scale: 1.0 },
    "Retro":         { url: "retrofont/font.ttf", scale: 1.0 },
    "Retro Car":     { url: "retrofont/lcd2_1.ttf", scale: 0.65 },
    "OpenDyslexic":  { url: "retrofont/opendyslexic.ttf", scale: 0.9 },
    "Sony XDR":      { url: "retrofont/sonyxdr.ttf", scale: 1.0 },
    "VFD":           { url: "retrofont/font12.ttf", scale: 1.0 },
    "XHDATA":        { url: "retrofont/Minisystem.ttf", scale: 1.0 },
    "Dots":          { url: "retrofont/font3.ttf", scale: 1.0 },
    "Pixelyourlife": { url: "retrofont/pixelyourlife.ttf", scale: 1.0 },
    "RumAndBones":   { url: "retrofont/RumAndBones.ttf", scale: 1.0 },
    "NinePin":       { url: "retrofont/ninepin.ttf", scale: 1.0 },
    "Matrix Gormono":{ url: "retrofont/MatrixDotGORMONO.ttf", scale: 1.0 }
};

const COLORS = { 
    "Default (White)": "#ffffff", // define custom colours
    "Amber": "#ffa500",
    "Red": "#ff4444",
    "Green": "#44ff44",
    "Blue": "#4488ff"
};

var settings = { 
    frequencyFontEnabled: true, //ancient code, don't bother touching, use the config above.
    psFontEnabled: false // ancient code, don't bother touching, use config above.
};

// =========================================
// CRITICAL CSS INJECTION
// =========================================
function injectStyles() {
    const css = `#font-selection-input, #color-selection-input { cursor: pointer; }`;
    $('<style>').prop('type', 'text/css').html(css).appendTo('head');
}

// =========================================
// CORE FUNCTIONS
// =========================================
function applyFontToElements(useCustomFont, scale = 1.0) {
    const customFontFamily = `'Retro-font', 'Titillium Web', sans-serif`;
    const titilliumOnly = `'Titillium Web', sans-serif`;
    const defaultFont = `'Roboto Mono', monospace`;

    // Base sizes
    const baseSizeBig = 48;
    const baseSizeMedium = 32;

    if (!useCustomFont) {
        // Reset to stylesheet defaults
        $('.text-big, .text-medium-big').css({
            'font-family': titilliumOnly, 'font-size': '', 'padding': '', 'margin': '', 'letter-spacing': '', 'line-height': '', 'box-sizing': ''
        });
    } else {
        // Apply custom font with calculated scale to generic classes
        $('.text-big').css({
            'font-family': customFontFamily,
            'font-size': (baseSizeBig * scale) + 'px',
            'padding': '10px', 'margin': 0, 'display': 'flex', 'align-items': 'center', 'justify-content': 'center',
            'text-align': 'center', 'line-height': '1.2', 'letter-spacing': 'normal', 'box-sizing': 'border-box'
        });
        $('.text-medium-big').css({
            'font-family': customFontFamily,
            'font-size': (baseSizeMedium * scale) + 'px',
            'padding': '10px', 'margin': 0, 'display': 'flex', 'align-items': 'center', 'justify-content': 'center',
            'text-align': 'center', 'line-height': '1.3', 'letter-spacing': 'normal', 'box-sizing': 'border-box'
        });
    }

    // Apply font families based on settings
    $('#data-frequency').css('font-family', !useCustomFont ? titilliumOnly : customFontFamily);
    
    // PS TEXT HANDLING
    const psUsesRetro = settings.psFontEnabled && useCustomFont;
    $('#data-ps').css('font-family', psUsesRetro ? customFontFamily : defaultFont);

    // If PS is NOT using the retro font, forcibly reset its size to default (ignoring any scale applied above)
    if (!psUsesRetro) {
         $('#data-ps').css({
             'font-size': '',      // Empty string resets to stylesheet default
             'line-height': '',
             'letter-spacing': ''
         });
    } else {
        // Optional: If you find PS doesn't scale correctly when enabled, uncomment the lines below to force it.
        // usually it inherits from .text-medium-big so it should be fine without this.
        // $('#data-ps').css('font-size', (baseSizeMedium * scale) + 'px');
    }
}

function loadFont(fontName) {
    const config = FONTS[fontName];

    // Guard clause if font config is missing
    if (!config) {
        console.error("Font not found in config:", fontName);
        applyFontToElements(false);
        return;
    }

    // If no URL, it's the "Default" option
    if (!config.url) {
        applyFontToElements(false);
        return;
    }

    let fullUrl = (window.location.origin + window.location.pathname + '/' + config.url).replace(/([^:]\/)\/+/g, "$1");
    const scale = config.scale || 1.0;

    new FontFace("Retro-font", `url(${fullUrl})`).load().then(f => {
        document.fonts.add(f);
        applyFontToElements(true, scale);
    }).catch(e => {
        console.error('Font failed:', e);
        applyFontToElements(false);
    });
}

function applyColorToPS(colorHex) {
    $('#data-ps').css('color', colorHex);
}

// =========================================
// UI CREATION
// =========================================
function createUiElements() {
    const targetDiv = $("#imperial-units").closest('.form-group');
    if (!targetDiv.length) return;

    const psToggleHtml = `
        <div class="form-group" style="margin-top: 15px;">
             <div class="switch flex-container flex-phone flex-phone-column flex-phone-center">
                <input type="checkbox" tabindex="0" id="toggle-ps-font" />
                <label for="toggle-ps-font"></label>
                <span class="text-smaller text-uppercase text-bold color-4 p-10">Use Retro Font on PS</span>
            </div>
        </div>`;

    const fontDropdownHtml = `
        <div id="font-selection-container" class="form-group">
            <label for="font-selection-input" class="form-label">
                <i class="fa-solid fa-font m-right-10"></i>Retro Font
            </label>
            <div class="dropdown">
                <input type="text" id="font-selection-input" placeholder="Select font" readonly tabindex="0" />
                <ul class="options" tabindex="0">
                    ${Object.keys(FONTS).map(name => `<li class="option" tabindex="0" data-name="${name}">${name}</li>`).join('')}
                </ul>
            </div>
        </div>`;

    const colorDropdownHtml = `
        <div id="color-selection-container" class="form-group">
            <label for="color-selection-input" class="form-label">
                <i class="fa-solid fa-palette m-right-10"></i>PS Color
            </label>
            <div class="dropdown">
                <input type="text" id="color-selection-input" placeholder="Select color" readonly tabindex="0" />
                <ul class="options" tabindex="0">
                    ${Object.keys(COLORS).map(c => `<li class="option" tabindex="0" data-value="${COLORS[c]}">${c}</li>`).join('')}
                </ul>
            </div>
        </div>`;

    targetDiv.after(psToggleHtml + fontDropdownHtml + colorDropdownHtml);
}

// =========================================
// INITIALIZATION & EVENTS
// =========================================
$(document).ready(function() {
    injectStyles();
    createUiElements();

    // 1. LOAD SAVED/DEFAULT SETTINGS
    let savedFontName = localStorage.getItem("SELECTED_FONT_NAME");
    if (!savedFontName && localStorage.getItem("SELECTED_FONT")) { // Legacy check
         const oldUrl = localStorage.getItem("SELECTED_FONT");
         savedFontName = Object.keys(FONTS).find(key => FONTS[key].url === oldUrl) || SERVER_DEFAULTS.INITIAL_FONT;
    } else if (!savedFontName) {
         savedFontName = SERVER_DEFAULTS.INITIAL_FONT;
    }

    const savedColorHex = localStorage.getItem("SELECTED_PS_COLOR") !== null ? localStorage.getItem("SELECTED_PS_COLOR") : COLORS[SERVER_DEFAULTS.INITIAL_COLOR];
    
    // Check local storage first; if nothing is saved, use the new server default
    const savedPsFontSetting = localStorage.getItem("USE_PS_FONT");
    settings.psFontEnabled = (savedPsFontSetting !== null) ? (savedPsFontSetting === "true") : SERVER_DEFAULTS.INITIAL_PS_FONT_ENABLED;

    // 2. APPLY TO UI
    $("#toggle-ps-font").prop('checked', settings.psFontEnabled);
    $("#font-selection-input").val(savedFontName);
    $("#color-selection-input").val(Object.keys(COLORS).find(k => COLORS[k] === savedColorHex) || "Select Color");

    // 3. APPLY TO ELEMENTS
    loadFont(savedFontName);
    applyColorToPS(savedColorHex);

    // 4. EVENT HANDLERS
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('#font-selection-container .dropdown, #color-selection-container .dropdown').removeClass('opened');
        }
    });

    $('#font-selection-input').on('click', function(e) {
        e.stopPropagation();
        $('#color-selection-container .dropdown').removeClass('opened');
        $('#font-selection-container .dropdown').toggleClass('opened');
    });

    $('#color-selection-input').on('click', function(e) {
        e.stopPropagation();
        $('#font-selection-container .dropdown').removeClass('opened');
        $('#color-selection-container .dropdown').toggleClass('opened');
    });

    // Font Option Click
    $('#font-selection-container .option').on('click', function() {
        const fontName = $(this).data("name");
        localStorage.setItem("SELECTED_FONT_NAME", fontName);
        $("#font-selection-input").val(fontName);
        loadFont(fontName);
        $(this).closest('.dropdown').removeClass('opened');
    });

    // Color Option Click
    $('#color-selection-container .option').on('click', function() {
        const val = $(this).data("value");
        localStorage.setItem("SELECTED_PS_COLOR", val);
        $("#color-selection-input").val($(this).text().trim());
        applyColorToPS(val);
        $(this).closest('.dropdown').removeClass('opened');
    });

    $('#toggle-ps-font').on('change', function() {
        settings.psFontEnabled = this.checked;
        localStorage.setItem("USE_PS_FONT", this.checked);
        // Reload current font to re-trigger applyFontToElements with new PS setting
        loadFont(localStorage.getItem("SELECTED_FONT_NAME") || SERVER_DEFAULTS.INITIAL_FONT);
    });
});