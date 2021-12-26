import fileinclude from 'gulp-file-include';
import webpHtmNosvg from 'gulp-webp-html-nosvg';
import versionsNumber from 'gulp-version-number';
export const html = () => {
	return app.gulp
		.src(app.path.src.html)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'HTML',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(fileinclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(app.plugins.if(app.isBuild, webpHtmNosvg()))

		.pipe(
			app.plugins.if(
				app.isBuild,
				versionsNumber({
					value: '%DT%',
					append: {
						key: '_v',
						cover: 0,
						to: ['css', 'js'],
					},
					output: {
						file: 'gulp/versions.json',
					},
				}),
			),
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browserSync.stream());
};
