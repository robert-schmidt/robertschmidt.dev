<?php
	/**
	 * Combined Minify and Deploy Script
	 *
	 * This script handles:
	 * 1. CSS/JS minification
	 * 2. Updating file references with cache busting
	 * 3. Basic deployment process
	 *
	 * Usage: php build.php
	 */

	echo "Starting build process...\n";

// Configuration
	$cssFile = 'styles.css';
	$jsFile = 'script.js';
	$outputCssFile = 'styles.min.css';
	$outputJsFile = 'script.min.js';
	$htmlFile = 'index.html';

// Create backups of original files
	if (file_exists($outputCssFile)) {
		copy($outputCssFile, $outputCssFile . '.bak');
	}
	if (file_exists($outputJsFile)) {
		copy($outputJsFile, $outputJsFile . '.bak');
	}
	echo "Created backups of minified files\n";

// CSS Minification
	function minifyCss($css) {
		if (!is_string($css) || empty($css)) {
			return '';
		}

		try {
			// Remove comments
			$css = preg_replace('#/\*.*?\*/#s', '', $css);

			// Remove whitespace
			$css = preg_replace('#\s+#', ' ', $css);

			// Remove spaces before and after special characters
			$characters = [':', ',', ';', '{', '}'];
			foreach ($characters as $char) {
				$css = str_replace(" $char ", $char, $css);
				$css = str_replace("$char ", $char, $css);
				$css = str_replace(" $char", $char, $css);
			}

			// Remove unnecessary semicolons
			$css = str_replace(';}', '}', $css);

			// Remove line breaks
			$css = str_replace(["\r\n", "\r", "\n"], '', $css);

			// Simple color optimization for hex colors like #ffffff to #fff
			$css = preg_replace('/#([a-f0-9])\\1([a-f0-9])\\2([a-f0-9])\\3/i', '#$1$2$3', $css);

			return trim($css);
		} catch (Exception $e) {
			// If any regex fails, return the original CSS
			echo "Warning: CSS minification error: " . $e->getMessage() . "\n";
			return $css;
		}
	}

// JavaScript Minification
	function minifyJs($js) {
		if (!is_string($js) || empty($js)) {
			return '';
		}

		// A simpler approach that preserves JavaScript syntax
		try {
			// Remove comments in a way that preserves valid JavaScript
			// First, handle multi-line comments
			$js = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $js);

			// Handle single-line comments (carefully to not break URLs)
			$lines = explode("\n", $js);
			foreach ($lines as $i => $line) {
				$commentPos = strpos($line, '//');
				if ($commentPos !== false) {
					// Check if // is within a string
					$inString = false;
					$stringChar = '';
					$escaped = false;

					for ($j = 0; $j < $commentPos; $j++) {
						$char = $line[$j];

						if ($escaped) {
							$escaped = false;
							continue;
						}

						if ($char === '\\') {
							$escaped = true;
							continue;
						}

						if (!$inString && ($char === '"' || $char === "'")) {
							$inString = true;
							$stringChar = $char;
						} else if ($inString && $char === $stringChar) {
							$inString = false;
						}
					}

					if (!$inString) {
						$lines[$i] = substr($line, 0, $commentPos);
					}
				}
			}
			$js = implode("\n", $lines);

			// Simply reduce whitespace without breaking syntax
			$js = preg_replace('/\s+/', ' ', $js);
			$js = str_replace(["\r\n", "\r", "\n"], '', $js);

			// Safely remove spaces that don't affect syntax
			$js = str_replace('{ ', '{', $js);
			$js = str_replace(' }', '}', $js);
			$js = str_replace('( ', '(', $js);
			$js = str_replace(' )', ')', $js);
			$js = str_replace('; ', ';', $js);
			$js = str_replace(': ', ':', $js);
			$js = str_replace(', ', ',', $js);
			$js = str_replace(' {', '{', $js);
			$js = str_replace('} ', '}', $js);
			$js = str_replace('( ', '(', $js);
			$js = str_replace(' )', ')', $js);
			$js = str_replace('; ', ';', $js);
			$js = str_replace(' ;', ';', $js);

			return trim($js);
		} catch (Exception $e) {
			// If anything goes wrong, return the original JS
			echo "Warning: JS minification error: " . $e->getMessage() . "\n";
			return $js;
		}
	}

// Process CSS
	if (file_exists($cssFile)) {
		$css = file_get_contents($cssFile);
		if ($css !== false) {
			try {
				$minifiedCss = minifyCss($css);
				file_put_contents($outputCssFile, $minifiedCss);
				$reduction = (strlen($css) > 0) ?
					round((strlen($css) - strlen($minifiedCss)) / strlen($css) * 100, 2) : 0;
				echo "CSS minified: $cssFile -> $outputCssFile (" . $reduction . "% reduction)\n";
			} catch (Exception $e) {
				echo "Error minifying CSS: " . $e->getMessage() . "\n";
				// Create a CSS file with the original content if minification fails
				file_put_contents($outputCssFile, $css);
				echo "Copied original CSS file without minification\n";
			}
		} else {
			echo "Could not read CSS file: $cssFile\n";
			// Create an empty CSS file to avoid further errors
			file_put_contents($outputCssFile, '');
		}
	} else {
		echo "CSS file not found: $cssFile\n";
		// Create an empty CSS file to avoid further errors
		file_put_contents($outputCssFile, '');
	}

// Process JavaScript
	if (file_exists($jsFile)) {
		$js = file_get_contents($jsFile);
		if ($js !== false) {
			try {
				$minifiedJs = minifyJs($js);
				file_put_contents($outputJsFile, $minifiedJs);
				$reduction = (strlen($js) > 0) ?
					round((strlen($js) - strlen($minifiedJs)) / strlen($js) * 100, 2) : 0;
				echo "JavaScript minified: $jsFile -> $outputJsFile (" . $reduction . "% reduction)\n";
			} catch (Exception $e) {
				echo "Error minifying JavaScript: " . $e->getMessage() . "\n";
				// Create an empty JS file if minification fails
				file_put_contents($outputJsFile, $js);
				echo "Copied original JS file without minification\n";
			}
		} else {
			echo "Could not read JavaScript file: $jsFile\n";
			// Create an empty JS file to avoid further errors
			file_put_contents($outputJsFile, '');
		}
	} else {
		echo "JavaScript file not found: $jsFile\n";
		// Create an empty JS file to avoid further errors
		file_put_contents($outputJsFile, '');
	}

// Update HTML with cache-busting
	$htmlContent = file_get_contents($htmlFile);
	if ($htmlContent !== false) {
		// Add timestamp for cache busting
		$timestamp = time();

		// Update CSS link with timestamp
		$htmlContent = preg_replace(
			'/<link rel="stylesheet" href="styles\.min\.css(\?[a-z0-9]*)?">/',
			'<link rel="stylesheet" href="styles.min.css?' . $timestamp . '">',
			$htmlContent
		);

		// Update JS link with timestamp
		$htmlContent = preg_replace(
			'/<script src="script\.min\.js(\?[a-z0-9]*)?"><\/script>/',
			'<script src="script.min.js?' . $timestamp . '"></script>',
			$htmlContent
		);

		// Save updated HTML
		file_put_contents($htmlFile, $htmlContent);
		echo "Updated HTML with cache-busting timestamps\n";
	} else {
		echo "Could not read HTML file: $htmlFile\n";
	}

// Calculate file sizes and reduction
	function formatSize($bytes) {
		if (!is_numeric($bytes) || $bytes < 0) {
			return '0 B';
		}

		$units = ['B', 'KB', 'MB', 'GB'];
		$i = 0;
		while ($bytes > 1024 && $i < count($units) - 1) {
			$bytes /= 1024;
			$i++;
		}
		return round($bytes, 2) . ' ' . $units[$i];
	}

	$originalCssSize = file_exists($cssFile) ? filesize($cssFile) : 0;
	$minifiedCssSize = file_exists($outputCssFile) ? filesize($outputCssFile) : 0;
	$originalJsSize = file_exists($jsFile) ? filesize($jsFile) : 0;
	$minifiedJsSize = file_exists($outputJsFile) ? filesize($outputJsFile) : 0;

	$cssReduction = $originalCssSize > 0 ? round(($originalCssSize - $minifiedCssSize) / $originalCssSize * 100, 2) : 0;
	$jsReduction = $originalJsSize > 0 ? round(($originalJsSize - $minifiedJsSize) / $originalJsSize * 100, 2) : 0;
	$totalOriginal = $originalCssSize + $originalJsSize;
	$totalMinified = $minifiedCssSize + $minifiedJsSize;
	$totalReduction = $totalOriginal > 0 ? round(($totalOriginal - $totalMinified) / $totalOriginal * 100, 2) : 0;

// Generate hashes for display
	$cssHash = file_exists($outputCssFile) ? substr(md5_file($outputCssFile), 0, 8) : 'nohash';
	$jsHash = file_exists($outputJsFile) ? substr(md5_file($outputJsFile), 0, 8) : 'nohash';

	echo "\nBuild completed!\n";
	echo "=== File Size Summary ===\n";
	echo "CSS: " . formatSize($originalCssSize) . " → " . formatSize($minifiedCssSize) . " ($cssReduction% reduction)\n";
	echo "JS: " . formatSize($originalJsSize) . " → " . formatSize($minifiedJsSize) . " ($jsReduction% reduction)\n";
	echo "Total: " . formatSize($totalOriginal) . " → " . formatSize($totalMinified) . " ($totalReduction% reduction)\n";

// List deployment files
	echo "\nDeployment files:\n";
	echo "- index.html\n";
	echo "- styles.min.css\n";
	echo "- script.min.js\n";
	echo "- ghibli-portrait.png\n";

	echo "\nCache information:\n";
	echo "- Timestamp: $timestamp\n";
	echo "- CSS Hash: $cssHash\n";
	echo "- JS Hash: $jsHash\n";

	echo "\nIf you encounter any issues with the minified files, you can restore from backups with:\n";
	echo "copy styles.min.css.bak styles.min.css\n";
	echo "copy script.min.js.bak script.min.js\n";

	echo "\nDone! Upload these files to your server.\n";