const gulp = require("gulp");
const clean = require("gulp-clean");
const run = require("gulp-run");
const tsProject = require("gulp-typescript").createProject("tsconfig.json");

gulp.task("clean", () => {
    return gulp.src(["out-ts", "lib"]).pipe(clean());
});

gulp.task("build code", ["clean"], () => {
    return gulp
        .src("src/**/*.ts")
        .pipe(tsProject())
        .js.pipe(gulp.dest("out-ts"));
});

gulp.task("build data", ["build code"], (done) => {
    run('node out-ts/build.js').exec(() => {
        done();
    })
});

gulp.task("default", ["build data"], () => {
    gulp.src(["out-ts/index.js"]).pipe(gulp.dest('./lib'));
    gulp.src(['out-ts/data/*.json']).pipe(gulp.dest('./lib/data'));
});
