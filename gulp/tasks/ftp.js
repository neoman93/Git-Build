import { congigFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
	congigFTP.log = util.log;
	const ftpConnect = vinylFTP.create(congigFTP);
	return app.gulp
		.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'FTP',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
};
