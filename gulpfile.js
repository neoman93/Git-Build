// Main module
import gulp from 'gulp';
// Import path
import { path } from './gulp/config/path.js';

// Import common plugins

import { plugins } from './gulp/config/plugins.js';

// Global variable
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path,
	gulp,
	plugins,
};

// Import tasks
import { copy } from './gulp/tasks/copy.js';
import { clean } from './gulp/tasks/clean.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprite } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Watch function
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

export { svgSprite };

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// modes

const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, mainTasks);
const deployZIP = gulp.series(clean, mainTasks, zip);
const deployFTP = gulp.series(clean, mainTasks, ftp);

// Export scripts
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Run default task
gulp.task('default', dev);
