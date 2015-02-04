# Twig-Gulp-Bower-LibSass-Foundation-Starterkit

Starterkit for building static sites compiled with with Twig.js (Gulp port from PHP Twig) Its got Bower and Libsass Foundation baked in. And it compiles html pages and directories with Pretty urls (so "http://www.davidvandenbor.nl/projecten" instead of "http://www.davidvandenbor.nl/projecten.html")
I have to credit Colyn Brown for showing me what was possible with gulp boilerplates. He made a similar starterkit which I learned from. His starterkit has React JSX compiling and bundling with webpack. If thats your thing you should definitely check it out! https://github.com/colynb/gulp-react-webpack-twig-boilerplate

The one thing I couldn't get going was Gulp FTP support. I tried two Gulp NPM plugins: gulp-ftp and vinyl-ftp. Both failed to work with my setup. So I decided to leave FTP out of it.
