// Plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');
var jshint = require('jshint-stylish');
var lr = require('tiny-lr');
var server = lr();
var chalk = require('chalk');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

require('gulp-grunt')(gulp);

// Static server
gulp.task('browser-sync', ['styles'], function() {    
    
    browserSync({
        server: "./dist/"
    });

    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', reload);

});

// Chained Tasks
gulp.task('default', function() {
    gulp.start('styles', 'jshint', 'scripts', 'grunt-assemble', 'browser-sync');
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
    .pipe(plugins.rename({
        suffix: '.min'
    }))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}));
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
        .on("error", errorAlert)
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}));
});

// Optimize Images
// gulp.task('images', function() {
//     return gulp.src(['./dist/img/**/*.{svg,png,jpg}'])
//         .pipe(plugins.imagemin())
//         .pipe(gulp.dest('./dist/img/**/'));
// });


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
        // gulp.watch(['/dist/img/*/**'], function(event) {
        //     gulp.start('images');
        //     logger(event);
        // });
        gulp.watch(['src/*.hbs', 'src/data/*.{json,yml}', 'src/data/*.hbs', 'src/partials/*.md'], function() {
            gulp.start('grunt-assemble');
        });
        gulp.watch("dist/*.html").on("change", reload);
    });
});

function errorAlert(err) {
    console.log(err.toString());
    this.emit("end");
}