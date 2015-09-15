/// <reference path="./definitions/common_node_modules/node-modules.d.ts" />
var gulp = require('gulp');
var fs = require('fs');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var execObj = require('child_process');
var exorcist = require('exorcist');
var exec = execObj.exec;
/** File paths */
var dist = 'app/dist';
var modelsDir = {
    base: "app/models/"
};
var bannerLines = [
    "/* @license (c) Copyright 2014 HDS IP Holdings, LLC. All Rights Reserved.",
    " * @generated",
    " */\n"
];
var vendorFiles = [
    "node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js",
    "app/lib/**/*.js"
];
var requireFiles = "./app/modules/PageLoader.js";
var watchifyOptions = {
    entries: ["./app/modules/PageLoader.js"],
    extensions: [".js"],
    paths: ["node_modules", "./app/controllers", "./app/models", "./app/modules", "./app/views"]
};
function noop() { }
function compileScripts(debug) {
    var dstFileName = "app.js";
    var srcMapFile = dist + "/app.js.map";
    es6ify.traceurOverrides = { experimental: true };
    var bundler = watchify(watchifyOptions);
    bundler.require(requireFiles);
    bundler.transform(reactify);
    bundler.transform(es6ify.configure(/.jsx|app\\(?!.*\.ts)|app\/(?!.*\.ts)/));
    var pathChecks = [
        "controllers/",
        "models/",
        "dataModel/", "modules/", "generators/", "modelHelpers/", "psData/", "psServices/", "psUtils/",
        "views/"
    ];
    function rebundle() {
        var startTime;
        var endTime;
        var stream = bundler.bundle({
            debug: debug,
            filter: function (path) {
                // tries to valid import statements for incorrect casing ('psUtils' vs. 'psutils') or absolute directories (not starting with './' or '../')
                var notPath = pathChecks.reduce(function (prev, cur) { return prev && path.indexOf(cur) === -1; }, true);
                var notPathLowerCase = pathChecks.reduce(function (prev, cur) { return prev && path.toLowerCase().indexOf(cur.toLowerCase()) === -1; }, true);
                if ((!notPath && !(path.indexOf("./") === 0 || path.indexOf("../") === 0)) || (notPath && !notPathLowerCase)) {
                    gutil.log("incorrect import: '" + path + "', ensure name case is correct and path begins with relative './' or '../'");
                }
                return true;
            }
        });
        function startCb() {
            startTime = Date.now();
            gutil.log("start building '" + dstFileName + "'...");
        }
        function doneCb() {
            endTime = Date.now();
            gutil.log("finished building '" + dstFileName + "', " + (endTime - startTime) + " ms");
        }
        function errorCb(err) {
            console.error("error building '" + dstFileName + "'", err);
        }
        stream.on("error", errorCb);
        stream.on("finish", doneCb);
        stream.on("end", doneCb);
        // exorcist filters off the source maps into a separate file
        stream = stream.pipe(exorcist(srcMapFile));
        stream = stream.pipe(source(watchifyOptions.entries[0]));
        stream.pipe(rename(dstFileName));
        stream.pipe(gulp.dest(dist));
        startCb();
    }
    bundler.on("update", rebundle);
    return rebundle();
}
/** Base tasks
 */
// "--file ../..." path of file to check
gulp.task("checkFileEncoding", function () {
    var fileArg = (gutil.env["file"] || "").toString();
    var srcFile = fileArg.trim();
    fs.readFile(srcFile, function (err, f) {
        if (err) {
            gutil.log("error reading file '" + srcFile + "': " + err + ", continuing");
        }
        gutil.log("checking '" + srcFile + "' file encoding");
        var lines = f.toString().split("\n");
        for (var i = 0, size = lines.length; i < size; i++) {
            var ln = lines[i];
            for (var k = 0, charCount = ln.length; k < charCount; k++) {
                if (ln.charCodeAt(k) > 127) {
                    gutil.log("(" + (i + 1) + "," + (k + 1) + ") '" + ln.charAt(k) + "': " + ln);
                }
            }
        }
    });
});
gulp.task("vendor", function () {
    var dstFileName = "vendor.js";
    return gulp.src(vendorFiles)
        .pipe(uglify())
        .pipe(concat(dstFileName, { newLine: "\n\n" }))
        .pipe(gulp.dest(dist));
});
// "--debug true/false" (default true) whether to include extra debug info in compiled files like source maps
gulp.task("default", ["vendor"], function () {
    var debugArg = (gutil.env["debug"] || "").toString();
    var debug = debugArg.trim().toLowerCase() !== "false";
    compileScripts(debug);
});
