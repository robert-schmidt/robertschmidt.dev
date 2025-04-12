<?php
	/**
	 * Ultra-Simple Minifier for CSS and JavaScript
	 *
	 * This is a simplified version that sacrifices compression for reliability
	 * Use this if the regular minifier causes issues
	 */

// Configuration
	$cssFile = 'styles.css';
	$jsFile = 'script.js';
	$outputCssFile = 'styles.min.css';
	$outputJsFile = 'script.min.js';

// Simple CSS Minification
	function minifyCss($css) {
		if (!is_string($css) || empty($css)) {
			return '';
		}

		// Basic whitespace removal
		$css = preg_replace('/\s+/', ' ', $css);
		$css = str_replace(["\r\n", "\r", "\n"], '', $css);

		// Basic trimming
		$css = trim($css);

		return $css;
	}

// Simple JavaScript Minification
	function minifyJs($js) {
		if (!is_string($js) || empty($js)) {
			return '';
		}

		// Basic whitespace removal
		$js = preg_replace('/\s+/', ' ', $js);
		$js = str_replace(["\r\n", "\r", "\n"], '', $js);

		// Basic trimming
		$js = trim($js);

		return $js;
	}

// Process CSS
	if (file_exists($cssFile)) {
		$css = file_get_contents($cssFile);
		if ($css !== false) {
			$minifiedCss = minifyCss($css);
			file_put_contents($outputCssFile, $minifiedCss);
			echo "CSS minified (basic): $cssFile -> $outputCssFile\n";
		} else {
			echo "Could not read CSS file: $cssFile\n";
		}
	} else {
		echo "CSS file not found: $cssFile\n";
	}

// Process JavaScript
	if (file_exists($jsFile)) {
		$js = file_get_contents($jsFile);
		if ($js !== false) {
			$minifiedJs = minifyJs($js);
			file_put_contents($outputJsFile, $minifiedJs);
			echo "JavaScript minified (basic): $jsFile -> $outputJsFile\n";
		} else {
			echo "Could not read JavaScript file: $jsFile\n";
		}
	} else {
		echo "JavaScript file not found: $jsFile\n";
	}

	echo "Basic minification completed!\n";