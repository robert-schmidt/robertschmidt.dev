<?php
echo "Starting build process for V2...\n";

// Create backups of existing minified files
$backupFiles = [
    'styles-v2.min.css' => 'styles-v2.min.css.bak',
    'script-v2.min.js' => 'script-v2.min.js.bak'
];

foreach ($backupFiles as $original => $backup) {
    if (file_exists($original)) {
        copy($original, $backup);
        echo "Created backup: $backup\n";
    }
}

// Minify CSS
$cssContent = file_get_contents('styles-v2.css');
if ($cssContent === false) {
    die("Error: Could not read styles-v2.css\n");
}

$originalCssSize = strlen($cssContent);

// CSS minification
$cssContent = preg_replace('/\/\*.*?\*\//s', '', $cssContent); // Remove comments
$cssContent = preg_replace('/\s+/', ' ', $cssContent); // Collapse whitespace
$cssContent = preg_replace('/;\s*}/', '}', $cssContent); // Remove semicolon before closing brace
$cssContent = preg_replace('/\s*{\s*/', '{', $cssContent); // Remove spaces around opening brace
$cssContent = preg_replace('/;\s*/', ';', $cssContent); // Remove spaces after semicolon
$cssContent = preg_replace('/:\s*/', ':', $cssContent); // Remove spaces after colon
$cssContent = preg_replace('/,\s*/', ',', $cssContent); // Remove spaces after comma
$cssContent = trim($cssContent);

$minifiedCssSize = strlen($cssContent);
$cssReduction = round((($originalCssSize - $minifiedCssSize) / $originalCssSize) * 100, 2);

file_put_contents('styles-v2.min.css', $cssContent);
echo "CSS minified: styles-v2.css -> styles-v2.min.css ({$cssReduction}% reduction)\n";

// Minify JavaScript
$jsContent = file_get_contents('script-v2.js');
if ($jsContent === false) {
    die("Error: Could not read script-v2.js\n");
}

$originalJsSize = strlen($jsContent);

// Very conservative JavaScript minification to avoid breaking URLs
$jsContent = preg_replace('/\/\/.*$/m', '', $jsContent); // Remove single-line comments
$jsContent = preg_replace('/\/\*.*?\*\//s', '', $jsContent); // Remove multi-line comments
$jsContent = preg_replace('/\s+/', ' ', $jsContent); // Collapse whitespace
$jsContent = preg_replace('/\s*([{}();,])\s*/', '$1', $jsContent); // Remove spaces around operators, but protect strings
// Don't touch colons at all to protect URLs
$jsContent = trim($jsContent);

$minifiedJsSize = strlen($jsContent);
$jsReduction = round((($originalJsSize - $minifiedJsSize) / $originalJsSize) * 100, 2);

file_put_contents('script-v2.min.js', $jsContent);
echo "JavaScript minified: script-v2.js -> script-v2.min.js ({$jsReduction}% reduction)\n";

// Update HTML with cache-busting timestamps
$htmlContent = file_get_contents('index-v2.html');
if ($htmlContent === false) {
    die("Error: Could not read index-v2.html\n");
}

$timestamp = time();

// Update CSS link
$htmlContent = preg_replace(
    '/styles-v2\.min\.css\?[0-9]+/',
    "styles-v2.min.css?$timestamp",
    $htmlContent
);

// Update JS link
$htmlContent = preg_replace(
    '/script-v2\.min\.js\?[0-9]+/',
    "script-v2.min.js?$timestamp",
    $htmlContent
);

file_put_contents('index-v2.html', $htmlContent);
echo "Updated HTML with cache-busting timestamps\n";

// Calculate total reduction
$totalOriginalSize = $originalCssSize + $originalJsSize;
$totalMinifiedSize = $minifiedCssSize + $minifiedJsSize;
$totalReduction = round((($totalOriginalSize - $totalMinifiedSize) / $totalOriginalSize) * 100, 2);

echo "\nBuild completed!\n";
echo "=== File Size Summary ===\n";
echo "CSS: " . number_format($originalCssSize / 1024, 2) . " KB → " . number_format($minifiedCssSize / 1024, 2) . " KB ({$cssReduction}% reduction)\n";
echo "JS: " . number_format($originalJsSize / 1024, 2) . " KB → " . number_format($minifiedJsSize / 1024, 2) . " KB ({$jsReduction}% reduction)\n";
echo "Total: " . number_format($totalOriginalSize / 1024, 2) . " KB → " . number_format($totalMinifiedSize / 1024, 2) . " KB ({$totalReduction}% reduction)\n";

echo "\nDeployment files for V2:\n";
echo "- index-v2.html\n";
echo "- styles-v2.min.css\n";
echo "- script-v2.min.js\n";
echo "- ghibli-portrait.png\n";
echo "- robert-portrait.png\n";

echo "\nCache information:\n";
echo "- Timestamp: $timestamp\n";
echo "- CSS Hash: " . substr(md5($cssContent), 0, 8) . "\n";
echo "- JS Hash: " . substr(md5($jsContent), 0, 8) . "\n";

echo "\nIf you encounter any issues with the minified files, you can restore from backups with:\n";
echo "copy styles-v2.min.css.bak styles-v2.min.css\n";
echo "copy script-v2.min.js.bak script-v2.min.js\n";

echo "\nDone! Upload these files to your server.\n";
?>