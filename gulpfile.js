// Plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');
var jshint = require('jshint-stylish');
var lr = require('tiny-lr');
var server = lr();
var chalk = require('chalk');
var browserSync = require('browser-sync');

require('gulp-grunt')(gulp);

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist/"
        }
    });
});

// CSS
gulp.task('styles', function() {
    gulp.src('sass/style.scss')
        .pipe(plugins.sass({
            includePaths: [
                'sass/utilities',
                'sass/base',
                'sass/components',
                'sass/modules'
            ],
            onSuccess: function(css) {
                console.log(chalk.black.bgGreen("Success!"));
            },
            onError: function(err) {
                console.log(chalk.black.bgRed("Error!") + " " + chalk.red(err));
            },
        }))
        .pipe(plugins.autoprefixer("last 2 versions"))
    //.pipe(gulp.dest('css'))
    // .pipe(plugins.base64())
    //     .pipe(plugins.csso())
    .pipe(plugins.rename({
        suffix: '.min'
    }))
        .pipe(gulp.dest('./dist/'));
        // .pipe(plugins.livereload(server));
});

// JS Hint
gulp.task('jshint', function() {
    gulp.src('js/modules/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// JS Compile
gulp.task('scripts', function() {
    gulp.src(['js/vendor/jquery.js', 'js/vendor/*.js', 'js/modules/*.js'])
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));
        // .pipe(plugins.livereload(server));
});

// Optimize Images
gulp.task('images', function() {
    return gulp.src(['./dist/img/social/*.svg'])
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('./dist/img/social/'));
});

// Chained Tasks
gulp.task('default', function() {
    gulp.start('styles', 'jshint', 'scripts', 'images', 'grunt-assemble');
});

// Watch Task
gulp.task('watch', function() {
    gulp.start('default');
    function logger(event) {
        console.log('File ' + chalk.yellow(event.path) + ' was ' + chalk.yellow(event.type));
    }
    server.listen(35729, function(err) {
        if (err) return console.log(err);
        gulp.watch(['sass/*.scss', 'sass/*/**.scss'], function(event) {
            gulp.start('styles');
            logger(event);
        });
        gulp.watch('js/*/**.js', function(event) {
            gulp.start('jshint', 'scripts');
            logger(event);
        });
        gulp.watch(['/dist/img/*/**'], function(event) {
            gulp.start('images');
            logger(event);
        });
        gulp.watch(['src/*.hbs', 'data/*/**.{json,yml}', 'data/*.hbs', 'data/partials/*/**.md'], function() {
            gulp.start('grunt-assemble');
        });
        gulp.watch(['*.html', '*.php', '*.md'], function(evt) {
            server.changed({
                body: {
                    files: ["build/index.html"]
                }
            });
        });
    });
});