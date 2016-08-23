var gulp = require("gulp");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var useref = require("gulp-useref");
var filter = require("gulp-filter");
var uglify = require("gulp-uglify"); //压缩js
var csso = require("gulp-csso"); //压缩css

gulp.task("default", function() {
	var jsFilter = filter("**/*.js",{restore:true});
	var cssFilter = filter("**/*.css", {restore:true});
	var indexHtmlFilter = filter(["**/*","!**/index.html"], {restore:true}); //感叹号代表排除

	return gulp.src("src/index.html") //找到要处理的文件
	    .pipe(useref()) //分析文件中带有注释标志的地方
	    .pipe(jsFilter) //筛选出标记的js文件
	    .pipe(uglify()) //压缩操作
	    .pipe(jsFilter.restore) // 丢回去
	    .pipe(cssFilter) //筛选css文件 
	    .pipe(csso()) //压缩
	    .pipe(cssFilter.restore) //再丢回去
	    .pipe(indexHtmlFilter) // 把html文件取出
	    .pipe(rev()) //生成版本号
	    .pipe(indexHtmlFilter.restore) //丢回去
	    .pipe(revReplace()) //改名字
	    .pipe(gulp.dest("dist")); // 把文件流扔回dist文件
});