#!/usr/bin/env python3
"""
Combined Minify and Deploy Script (Python version)

This script handles:
1. CSS/JS minification
2. Updating file references with cache busting
3. Basic deployment process

Usage: python build.py
"""

import os
import re
import time
import shutil
import hashlib
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(message)s'
)
logger = logging.getLogger(__name__)

# Configuration
CSS_FILE = 'styles.css'
JS_FILE = 'script.js'
OUTPUT_CSS_FILE = 'styles.min.css'
OUTPUT_JS_FILE = 'script.min.js'
HTML_FILE = 'index.html'

def create_backups():
    """Create backups of minified files if they exist"""
    if os.path.exists(OUTPUT_CSS_FILE):
        shutil.copy2(OUTPUT_CSS_FILE, f"{OUTPUT_CSS_FILE}.bak")

    if os.path.exists(OUTPUT_JS_FILE):
        shutil.copy2(OUTPUT_JS_FILE, f"{OUTPUT_JS_FILE}.bak")

    logger.info("Created backups of minified files")

def minify_css(css):
    """Minify CSS content"""
    if not css or not isinstance(css, str):
        return ''

    try:
        # Remove comments
        css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)

        # Remove whitespace
        css = re.sub(r'\s+', ' ', css)

        # Remove spaces before and after special characters
        for char in [':', ',', ';', '{', '}']:
            css = css.replace(f" {char} ", char)
            css = css.replace(f"{char} ", char)
            css = css.replace(f" {char}", char)

        # Remove unnecessary semicolons
        css = css.replace(';}', '}')

        # Remove line breaks
        css = css.replace('\r\n', '').replace('\r', '').replace('\n', '')

        # Simple color optimization for hex colors like #ffffff to #fff
        css = re.sub(r'#([a-f0-9])\1([a-f0-9])\2([a-f0-9])\3', r'#\1\2\3', css, flags=re.IGNORECASE)

        return css.strip()
    except Exception as e:
        logger.warning(f"Warning: CSS minification error: {str(e)}")
        return css

def minify_js(js):
    """Minify JavaScript content"""
    if not js or not isinstance(js, str):
        return ''

    try:
        # Remove multi-line comments
        js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)

        # Handle single-line comments (carefully to not break URLs)
        lines = js.split('\n')
        for i, line in enumerate(lines):
            comment_pos = line.find('//')
            if comment_pos != -1:
                # Check if // is within a string
                in_string = False
                string_char = ''
                escaped = False

                for j in range(comment_pos):
                    char = line[j]

                    if escaped:
                        escaped = False
                        continue

                    if char == '\\':
                        escaped = True
                        continue

                    if not in_string and (char == '"' or char == "'"):
                        in_string = True
                        string_char = char
                    elif in_string and char == string_char:
                        in_string = False

                if not in_string:
                    lines[i] = line[:comment_pos]

        js = '\n'.join(lines)

        # Simply reduce whitespace without breaking syntax
        js = re.sub(r'\s+', ' ', js)
        js = js.replace('\r\n', '').replace('\r', '').replace('\n', '')

        # Safely remove spaces that don't affect syntax
        replacements = [
            ('{ ', '{'), (' }', '}'), ('( ', '('), (' )', ')'),
            ('; ', ';'), (': ', ':'), (', ', ','), (' {', '{'),
            ('} ', '}'), (' ;', ';')
        ]

        for old, new in replacements:
            js = js.replace(old, new)

        return js.strip()
    except Exception as e:
        logger.warning(f"Warning: JS minification error: {str(e)}")
        return js

def process_css():
    """Process CSS file"""
    if not os.path.exists(CSS_FILE):
        logger.error(f"CSS file not found: {CSS_FILE}")
        with open(OUTPUT_CSS_FILE, 'w') as f:
            f.write('')
        return

    try:
        with open(CSS_FILE, 'r', encoding='utf-8') as f:
            css = f.read()

        minified_css = minify_css(css)

        with open(OUTPUT_CSS_FILE, 'w', encoding='utf-8') as f:
            f.write(minified_css)

        original_size = len(css)
        minified_size = len(minified_css)
        reduction = round((original_size - minified_size) / original_size * 100, 2) if original_size > 0 else 0

        logger.info(f"CSS minified: {CSS_FILE} -> {OUTPUT_CSS_FILE} ({reduction}% reduction)")

    except Exception as e:
        logger.error(f"Error processing CSS: {str(e)}")
        # Create CSS file with original content if minification fails
        if os.path.exists(CSS_FILE):
            shutil.copy2(CSS_FILE, OUTPUT_CSS_FILE)
            logger.info("Copied original CSS file without minification")

def process_js():
    """Process JavaScript file"""
    if not os.path.exists(JS_FILE):
        logger.error(f"JavaScript file not found: {JS_FILE}")
        with open(OUTPUT_JS_FILE, 'w') as f:
            f.write('')
        return

    try:
        with open(JS_FILE, 'r', encoding='utf-8') as f:
            js = f.read()

        minified_js = minify_js(js)

        with open(OUTPUT_JS_FILE, 'w', encoding='utf-8') as f:
            f.write(minified_js)

        original_size = len(js)
        minified_size = len(minified_js)
        reduction = round((original_size - minified_size) / original_size * 100, 2) if original_size > 0 else 0

        logger.info(f"JavaScript minified: {JS_FILE} -> {OUTPUT_JS_FILE} ({reduction}% reduction)")

    except Exception as e:
        logger.error(f"Error processing JavaScript: {str(e)}")
        # Create JS file with original content if minification fails
        if os.path.exists(JS_FILE):
            shutil.copy2(JS_FILE, OUTPUT_JS_FILE)
            logger.info("Copied original JS file without minification")

def update_html_with_cache_busting():
    """Update HTML file with cache busting parameters"""
    if not os.path.exists(HTML_FILE):
        logger.error(f"HTML file not found: {HTML_FILE}")
        return

    try:
        with open(HTML_FILE, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Add timestamp for cache busting
        timestamp = int(time.time())

        # Update CSS link with timestamp
        html_content = re.sub(
            r'<link rel="stylesheet" href="styles\.min\.css(\?[a-z0-9]*)?">',
            f'<link rel="stylesheet" href="styles.min.css?{timestamp}">',
            html_content
        )

        # Update JS link with timestamp
        html_content = re.sub(
            r'<script src="script\.min\.js(\?[a-z0-9]*)?"></script>',
            f'<script src="script.min.js?{timestamp}"></script>',
            html_content
        )

        with open(HTML_FILE, 'w', encoding='utf-8') as f:
            f.write(html_content)

        logger.info("Updated HTML with cache-busting timestamps")
        return timestamp

    except Exception as e:
        logger.error(f"Error updating HTML: {str(e)}")
        return None

def get_file_size(filename):
    """Get formatted file size"""
    if not os.path.exists(filename):
        return 0, "0 B"

    size_bytes = os.path.getsize(filename)
    units = ['B', 'KB', 'MB', 'GB']
    unit_index = 0
    size = size_bytes

    while size > 1024 and unit_index < len(units) - 1:
        size /= 1024
        unit_index += 1

    return size_bytes, f"{round(size, 2)} {units[unit_index]}"

def get_file_hash(filename):
    """Get MD5 hash of file"""
    if not os.path.exists(filename):
        return "nohash"

    try:
        with open(filename, 'rb') as f:
            file_hash = hashlib.md5(f.read()).hexdigest()
        return file_hash[:8]
    except Exception:
        return "nohash"

def print_summary(timestamp):
    """Print build summary"""
    original_css_size, original_css_formatted = get_file_size(CSS_FILE)
    minified_css_size, minified_css_formatted = get_file_size(OUTPUT_CSS_FILE)
    original_js_size, original_js_formatted = get_file_size(JS_FILE)
    minified_js_size, minified_js_formatted = get_file_size(OUTPUT_JS_FILE)

    css_reduction = round((original_css_size - minified_css_size) / original_css_size * 100, 2) if original_css_size > 0 else 0
    js_reduction = round((original_js_size - minified_js_size) / original_js_size * 100, 2) if original_js_size > 0 else 0

    total_original = original_css_size + original_js_size
    total_minified = minified_css_size + minified_js_size
    total_reduction = round((total_original - total_minified) / total_original * 100, 2) if total_original > 0 else 0

    css_hash = get_file_hash(OUTPUT_CSS_FILE)
    js_hash = get_file_hash(OUTPUT_JS_FILE)

    logger.info("\nBuild completed!")
    logger.info("=== File Size Summary ===")
    logger.info(f"CSS: {original_css_formatted} → {minified_css_formatted} ({css_reduction}% reduction)")
    logger.info(f"JS: {original_js_formatted} → {minified_js_formatted} ({js_reduction}% reduction)")
    logger.info(f"Total: {get_file_size(None)[1] if total_original == 0 else format(total_original, ',d')} B → {get_file_size(None)[1] if total_minified == 0 else format(total_minified, ',d')} B ({total_reduction}% reduction)")

    logger.info("\nDeployment files:")
    logger.info("- index.html")
    logger.info("- styles.min.css")
    logger.info("- script.min.js")
    logger.info("- ghibli-portrait.png")

    logger.info("\nCache information:")
    logger.info(f"- Timestamp: {timestamp}")
    logger.info(f"- CSS Hash: {css_hash}")
    logger.info(f"- JS Hash: {js_hash}")

    logger.info("\nIf you encounter any issues with the minified files, you can restore from backups with:")
    if os.name == 'nt':  # Windows
        logger.info("copy styles.min.css.bak styles.min.css")
        logger.info("copy script.min.js.bak script.min.js")
    else:  # Unix-like
        logger.info("cp styles.min.css.bak styles.min.css")
        logger.info("cp script.min.js.bak script.min.js")

    logger.info("\nDone! Upload these files to your server.")

def main():
    """Main function to run the build process"""
    logger.info("Starting build process...")

    # Create backups
    create_backups()

    # Process files
    process_css()
    process_js()
    timestamp = update_html_with_cache_busting()

    # Print summary
    print_summary(timestamp)

if __name__ == "__main__":
    main()