const gulp = require('gulp');
const babel = require('gulp-babel');
const pkg = require('./package.json');

gulp.task('default', () => {
    return gulp
        .src(['src/**/*.js'])
        .pipe(babel({
            presets: [
                '@babel/preset-env',
            ],
            plugins : [
                '@babel/plugin-proposal-class-properties',
            ],
        }))
        .pipe(gulp.dest('dist/'));
});
