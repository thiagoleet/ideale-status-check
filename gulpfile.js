var gulp = require('gulp');
    useref = require('gulp-useref');
    rename = require('gulp-rename');
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin');
    clean = require('gulp-clean');
    concat = require('gulp-concat');
    htmlReplce = require('gulp-html-replace');
    uglify = require('gulp-uglify');
    usemin = require('gulp-usemin');
    cssmin = require('gulp-cssmin');
    browserSync = require('browser-sync');
    jshint = require('gulp-jshint');
    jshintStylish = require('jshint-stylish');
    csslint = require('gulp-csslint');
    babel = require('gulp-babel');
    sourcemaps = require('gulp-sourcemaps');


gulp.task('default', ['clean'], function(){

    gulp.start(['copy', 'build']);

    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('src/app/**/*.js').on('change', function(event){
        gulp.start(['build', 'vendors']);
    });

    gulp.watch('src/**/*').on('change', function(event){
     gulp.start(['build', 'vendors']);
     browserSync.reload;
    });
        
});

gulp.task('clean', function(){
    var stream = gulp.src('dist')
        .pipe(clean())
    return stream;
})

gulp.task('copy', function(){
    gulp.src('src/apis/**/*')
        .pipe(gulp.dest('dist/apis/'));
    
    gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets/'));
    
    return gulp.start('vendors');
});


gulp.task('build', function(){
    gulp.src('src/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write({sourceRoot: '/src'}))
        .pipe(gulp.dest('dist/app'));

    return gulp.start('copy');
});

gulp.task('vendors', function(){
    var stream = gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssmin()))
        .pipe(gulp.dest('dist'));
    return stream;
});

gulp.task('server', ['copy', 'build'], function(){
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('src/app/**/*.js').on('change', function(event){
        gulp.start('build');
    });

    // gulp.watch(['dist/**/*.js', '!dist/system.min.js']).on('change', function(event){
    //     gulp.src(event.path)
    //     .pipe(jshint())
    //     .pipe(jshint.reporter(jshintStylish))
    // });

    // gulp.watch('dist/**/*.css').on('change', function(event){
    //     gulp.src(event.path)
    //     .pipe(csslint())
    //     .pipe(csslint.reporter())
    // });

    gulp.watch('src/**/*').on('change', browserSync.reload);
    
});
