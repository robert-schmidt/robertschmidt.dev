<?php
	/**
	 * Simple Minifier for CSS and JavaScript
	 *
	 * Usage:
	 * php minify.php
	 */

// Configuration
	$cssFile = 'styles.css';
	$jsFile = 'script.js';
	$outputCssFile = 'styles.min.css';
	$outputJsFile = 'script.min.js';

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

// Generate hash for cache busting
	$cssHash = substr(md5_file($outputCssFile), 0, 8);
	$jsHash = substr(md5_file($outputJsFile), 0, 8);

	echo "CSS Hash: $cssHash\n";
	echo "JS Hash: $jsHash\n";
	echo "Done!\n";