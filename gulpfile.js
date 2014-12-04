// Plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');
var jshint = require('jshint-stylish');
var lr = require('tiny-lr');
var server = lr();
var chalk = require('chalk');

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
        .pipe(gulp.dest('css'));
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
        .pipe(gulp.dest('./js'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'));
        // .pipe(plugins.livereload(server));
});

// Optimize Images
gulp.task('images', function() {
    return gulp.src(['img/social/*.svg'])
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('./img/social/'));
});

// Assemble templates

var options = {
    data: 'data/*/**.{json,yml}',
    partials: ['data/partials/*.md', '*.hbs'],
    layoutdir: '*.hbs',
};

gulp.task('assemble', function() {
    gulp.src('*.hbs')
        .pipe(plugins.assemble(options))
        .pipe(gulp.dest('./'));
        // .pipe(plugins.livereload(server));
});

// Chained Tasks
gulp.task('default', function() {
    gulp.start('styles', 'jshint', 'scripts', 'images', 'assemble');
});

// Watch Task
gulp.task('watch', function() {
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
        gulp.watch(['img/*/**'], function(event) {
            gulp.start('images');
            logger(event);
        });
        gulp.watch(['*.hbs', 'data/*/**.{json,yml}', 'data/*.hbs', 'data/partials/*/**.md'], function() {
            gulp.start('assemble');
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