# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

This is a personal portfolio website with custom build scripts. Use these commands for development:

```bash
# Primary build command - minifies CSS/JS and updates cache busting
php build.php

# Alternative Python build
python build.py

# Just update cache busting (no minification)
php deploy.php

# Only minify CSS/JS files
php minify.php
```

## Architecture Overview

This is a static website with a custom build system. The key architectural elements:

1. **No framework dependencies** - Pure HTML/CSS/JS implementation
2. **Custom minification pipeline** - PHP/Python scripts handle minification and cache busting
3. **Terminal emulator** - Interactive command-line interface built in vanilla JS
4. **Cache busting** - Automatic timestamp query parameters added to asset URLs

## Key Files and Their Purposes

- `index.html` - Main site with terminal interface, social links, and quote system
- `styles.css` / `script.js` - Source files that get minified during build
- `build.php` / `build.py` - Combined minification and deployment scripts
- `contact.php` - Contact form handler with reCAPTCHA (currently unused)

## Development Workflow

1. Edit source files (`styles.css`, `script.js`, `index.html`)
2. Run `php build.php` to minify and update cache busting
3. The build script will:
   - Create `styles.min.css` and `script.min.js`
   - Update `index.html` with new timestamps
   - Show file size reductions
   - Create `.bak` backup files

## Interactive Features

The site includes several interactive elements that may need maintenance:
- Terminal emulator with custom commands (help, about, skills, etc.)
- Konami code Easter egg triggering "hacker mode"
- Animated role text cycling
- Quote refresh system
- Social link hover effects