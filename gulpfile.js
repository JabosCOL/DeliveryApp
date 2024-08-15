const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css() {
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
}

function images() {
    return src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'))
}

function webpVersion() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp({quality: 50}))
        .pipe(dest('build/img'))
}

function avifVersion() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif({quality: 50}))
        .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', images);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.default = series(images, webpVersion, avifVersion, css, dev);