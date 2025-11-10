# dx-retro-font

> **Version:** 10ú Samhain 2025
> **Author:** Rhían Mac G

Retro font plugin for Noobish's [FM-DX Webserver](https://github.com/NoobishSVK/fm-dx-webserver)

![image](https://github.com/user-attachments/assets/027206e7-0565-42d1-a2af-57c0d6c7cb02)
![image](https://github.com/user-attachments/assets/d5e3f684-b1e8-475c-be69-f8f806f835eb)

## Overview

This script allows users to customize the font and colours for PS and various other parts of the FM-DX-Webserver

## Features

  * \*\* Dynamic Font Loading:\*\* Loads external font files (`.ttf`) on demand without requiring pre-defined CSS `@font-face` rules for every option.
  * **Per-Font Scaling:** Supports a unique `scale` factor for each font configuration to normalize varying font base sizes (e.g., making a tiny pixel font larger to match standard fonts).
  * **Toggling:**
      * Independent coluor selection for PS text, useful if you are trying to make it look like an old car radio 😉
      * Toggle switch to optionally apply the retro font to PS text or keep it standard.
  * **Persistence:** Automatically saves user selections (font, color, toggles) to browser `localStorage`.
  * **Smart Defaults:** Configurable "server defaults" for initial visitors.

## Installation

 - Copy all the contents of the plugins folder to the plugins directory of your FM-DX-webserver installation.
 - Copy the retrofont folder and its contents to the web directory of your webserver, not the plugins directory!
 - Enable in Webserver settings
 - Job done!

## Configuration

All major configurations are handled at the top of the script script.

### 1\. Server Defaults

Control the initial state for new users who have not yet configured their preferences.

```javascript
const SERVER_DEFAULTS = {
    INITIAL_FONT: "Retro",            // The starting font name (must match a key in FONTS)
    INITIAL_COLOR: "Default (White)", // The starting PS color name (must match a key in COLORS)
    INITIAL_PS_FONT_ENABLED: false    // true = PS uses retro font by default, false = PS uses standard font
};
```

### 2\. Font Definition (`FONTS`)

Define available fonts here. The key is the display name in the dropdown.

  * **url**: Path to the font file relative to the web root.
  * **scale**: A float multiplier to adjust the font size. `1.0` is baseline. Use `> 1.0` to increase size and `< 1.0` to decrease it.

<!-- end list -->

```javascript
const FONTS = {
    "Default":   { url: "", scale: 1.0 }, // Leave URL empty to use site's original CSS font
    "Retro":     { url: "retrofont/font.ttf", scale: 1.0 },
    "Retro Car": { url: "retrofont/lcd2_1.ttf", scale: 0.65 }, // Example of scaling down a large font
    // ... add more fonts here
};
```

### 3\. Color Definition (`COLORS`)

Define the color palette available for the PS text.

```javascript
const COLORS = {
    "Default (White)": "#ffffff",
    "Amber": "#ffa500",
    "Red": "#ff4444",
    // ... add more colors here
};
```

## Technical Details

### Target Elements

The script specifically targets and overrides styles for the following DOM elements:

  * `#data-frequency` (Main frequency display)
  * `#data-ps` (Program Service text)
  * `.text-big` and `.text-medium-big` (Generic large text containers)

### UI Injection

The script searches for an element with the ID `#imperial-units` and injects the new settings controls (PS Toggle, Font Dropdown, Color Dropdown) into its parent `.form-group`.

### Local Storage Keys

User preferences are saved using the following `localStorage` keys:

  * `SELECTED_FONT_NAME`: The name of the chosen font.
  * `SELECTED_PS_COLOR`: The hex code of the chosen PS color.
  * `USE_PS_FONT`: Boolean state of the PS font toggle.
