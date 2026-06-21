<?php
// Static-export entry point for PHP-only hosts (e.g. InfinityFree).
// Apache may prefer index.php over index.html; just serve the prerendered HTML.
readfile(__DIR__ . '/index.html');
