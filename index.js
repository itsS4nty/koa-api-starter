#! /usr/bin/env node

const fs = require('fs');
const { spawn } = require('child_process');
const degit = require('degit');
const args = require('args');

args.option('typescript', 'Use typescript template.', false)
	.option('directory', 'The name of the directory to create.')
	.option(
		'add-deps',
		'Array of the extra dependencies you want to install',
		[]
	)
	.option(
		'add-dev-deps',
		'Array of the extra dev dependencies you want to install',
		[]
	)
	.examples([
		{
			usage: 'koa-api-starter -d my-api',
			description: 'Create koa api in directory my-api',
		},
		{
			usage: 'koa-api-starter -t -d my-api',
			description: 'Create koa api with Typescript in directory my-api',
		},
		{
			usage: 'koa-api-starter -t -d my-api --add-deps mongoose axios --add-dev-deps @types/mongoose',
			description: 'Create koa api with Typescript in directory my-api with additional dependencies and dev dependencies',
		},
	]);

const flags = args.parse(process.argv, {
	name: 'koa-api-starter',
});

import('chalk').then(({ default: chalk }) => {
	function errorLog(message) {
		console.log(chalk.red.bgBlack(message));
	}

	if (!flags.d || flags.d.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
		errorLog(`Error: Missing or Invalid directory name: "${flags.d}"`);
		args.showHelp();
		process.exit(-1);
	}

	if (fs.existsSync(flags.d)) {
		errorLog(`Error: Directory "${flags.d}" already exists.`);
		process.exit(-1);
	}

	if (flags.addDeps[0] === true) {
		errorLog('If add-deps is passed, can not be empty');
		process.exit(-1);
	}

	if (flags.addDevDeps[0] === true) {
		errorLog('If add-dev-deps is passed, can not be empty');
		process.exit(-1);
	}

	const repoName = `itsS4nty/koa-server-scaffold${flags.t ? '-ts' : ''}`;

	const emitter = degit(repoName, {
		force: true,
		verbose: true,
	});

	emitter.on('info', (info) => {
		console.log(info.message);
	});

	function runCommand(command, args, options = undefined) {
		const spawned = spawn(command, args, options);

		return new Promise((resolve) => {
			spawned.stdout.on('data', (data) => {
				console.log(chalk.bgBlack.white(data.toString()));
			});

			spawned.stderr.on('data', (data) => {
				errorLog(data.toString());
			});

			spawned.on('close', () => {
				resolve();
			});
		});
	}

	emitter.clone(flags.d).then(() => {
		console.log(chalk.bgBlack.cyan('Installing dependencies...'));
		const command = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
		const cwdOption = { cwd: `${process.cwd()}/${flags.d}` };
		const installArgs = ['install'].concat(
			flags.addDeps[0] ? flags.addDeps[0].split(' ') : ''
		);

		return runCommand(command, installArgs, cwdOption)
			.then(() => {
				if (flags.addDevDeps.length) {
					console.log(
						chalk.bgBlack.cyan('Installing dev dependencies...')
					);
					return runCommand(
						command,
						['install'].concat(
							flags.addDevDeps[0].split(' '),
							'-D'
						),
						cwdOption
					);
				}
			})
			.then(() => {
				console.log(chalk.bgBlack.cyan('Done! 🏁'));
				console.log('');
				console.log(chalk.bgBlack.white('To get started:'));
				console.log(chalk.bgBlack.cyan(`cd ${flags.d}`));
				console.log(chalk.bgBlack.cyan('npm run start:dev'));
			});
	});
});
