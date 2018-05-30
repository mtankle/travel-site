var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    browserSync = require('browser-sync').create(),
    cssImport = require('postcss-import')
    ;

gulp.task('default', function() {
    console.log("Whooppee - we created a GULP task.");
});

gulp.task('html', function() {
    console.log("Imagine something useful being done right here!");
});

gulp.task('styles', function() {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {
    
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    
    watch('./app/index.html', function() {
        browserSync.reload();
    });
    
    watch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });
    
});

gulp.task('cssInject',['styles'], function() {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
})