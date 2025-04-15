// Plugin configuration, this is used in the administration when plugins are loaded
var pluginConfig = {
    name: 'Retro Font',
    version: '2.0.0',
    author: 'Ryan G, ODX, Noobish and Bkram',
    frontEndPath: 'retro-font/retro-font.js'
}

var pluginSettings = {
    frequencyFontEnabled: true,  // Set this to false to only change the frequency, instead of all text.
}

// Backend (server) changes can go here...

// Don't change anything below here if you are making your own plugin
module.exports = {
    pluginConfig
}