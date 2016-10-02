module.exports = function(grunt) {
	var gc = {
		assets: 'assets/template',
		dev: 'develop',
		css: 'css',
		js: 'js',
		img: 'images',
		fonts: 'fonts',
		tmp: 'test',
		bc: "bower_components",
		jq : 'bower_components/jquery',
		ftp: {
			username: "login",
			password: "password",
			host: "host",
			dest: "/public_html/",
			port: 21,
			incrementalUpdates: true
		},
		ftp_enabled: false,
		modernizr_enabled: true,
	},
	message = "ProjectSoft";
	
	
	var taskDef = ['notify:watch','imagemin'];
	gc.modernizr_enabled && taskDef.push('modernizr');
	taskDef.push('uglify', 'copy', 'less');
	gc.ftp_enabled && taskDef.push('ftp_push');
	taskDef.push('notify:done');
	
	var taskJs = ['notify:watch'];
	gc.modernizr_enabled && taskJs.push('modernizr');
	taskJs.push('uglify');
	gc.ftp_enabled && taskJs.push('ftp_push');
	taskJs.push('notify:done');
	
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		less: {
			css: {
				files : {
					'<%= globalConfig.assets %>/<%= globalConfig.css %>/main.css' : [
						'<%= globalConfig.dev %>/<%= globalConfig.css %>/main.less'
					]
				},
				options : {
					compress: true,
					ieCompat: false
				}
			}
		},
		modernizr: {
			dist: {
				"crawl": false,
				"customTests": [],
				"dest": "<%= globalConfig.assets %>/<%= globalConfig.js %>/modernizr.js",
				"tests": [
					"json",
					"filereader",
					"localstorage",
					"sessionstorage"
				],
				"options": [
					"setClasses"
				],
				"uglify": true
			}
		},
		uglify : {
			options: {
				ASCIIOnly: true
			},
			main: {
				files: {
					'<%= globalConfig.assets %>/<%= globalConfig.js %>/main.js': [
						'<%= globalConfig.dev %>/<%= globalConfig.js %>/main.js'
					]
				}
			}
		},
		imagemin: {
			base: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'<%= globalConfig.dev %>/<%= globalConfig.img %>/*.{png,jpg,gif,svg}'
						],
						dest: '<%= globalConfig.dev %>/<%= globalConfig.img %>/optimized/',
						filter: 'isFile'
					}
				]
			}
		},
		copy : {
			fonts: {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'<%= globalConfig.dev %>/<%= globalConfig.fonts %>/*'
						],
						dest: '<%= globalConfig.assets %>/<%= globalConfig.fonts %>/',
						filter: 'isFile'
					},
				]
			},
			images : {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'<%= globalConfig.dev %>/<%= globalConfig.img %>/optimized/*'
						],
						dest: '<%= globalConfig.assets %>/<%= globalConfig.img %>/',
						filter: 'isFile'
					}
				]
			}
		},
		ftp_push: {
			dist: {
				options: gc.ftp,
				files: [
					{
						expand: true,
						flatten : true,
						filter: 'isFile',
						src: [
							'<%= globalConfig.assets %>/**/*',
							'android*.*',
							'apple*.*',
							'favico*.*',
							'mstile*.*',
							'safari*.*',
							'browserconfig.xml',
							'.htaccess',
							'index.html',
							'manifest.json'
						]
					}
				]
			}
		},
		watch: {
			js: {
				files: [
					'<%= globalConfig.dev %>/<%= globalConfig.js %>/*.js'
				],
				tasks: taskJs
			},
			fonts: {
				files: [
					'<%= globalConfig.dev %>/<%= globalConfig.fonts %>/*.*'
				],
				tasks: gc.ftp_enabled ? ['notify:watch','copy:fonts','ftp_push','notify:done'] : ['notify:watch','copy:fonts','notify:done']
			},
			css: {
				files: [
					'<%= globalConfig.dev %>/<%= globalConfig.css %>/*.less',
					'<%= globalConfig.dev %>/<%= globalConfig.css %>/mixins/*.less',
				],
				tasks: gc.ftp_enabled ? ['notify:watch','less','ftp_push','notify:done'] : ['notify:watch','less','notify:done']
			},
			images: {
				files: [
					'<%= globalConfig.dev %>/<%= globalConfig.img %>/*.{png,jpg,gif,svg}'
				],
				tasks: gc.ftp_enabled ? ['notify:watch','imagemin', 'copy:images', 'less','ftp_push','notify:done'] : ['notify:watch','imagemin', 'copy:images', 'less','notify:done']
			},
			html: {
				files: [
					'*.html'
				],
				tasks: gc.ftp_enabled ? ['notify:watch','ftp_push','notify:done'] : ['notify:watch','notify:done']
			}
		},
		notify: {
			watch: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: 'Запуск',
					image: __dirname+'\\notify.png'
				}
			},
			done: {
				options: { 
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: __dirname+'\\notify.png'
				}
			}
		}
	});
	
	grunt.registerTask('default', 	taskDef);
	grunt.registerTask('dev', 		['watch']);
	
};