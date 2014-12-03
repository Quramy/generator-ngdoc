'use strict';

var _ = require('lodash');

module.exports = function generateNavigationProcessor(log) {

	var debug = log.debug;

	var AREA_NAMES = {
		api: 'API',
		guide: 'Guide'
	};

	var mappers = {
		api: function (pages, key) {
			var res = [];


			_(pages)
			.filter('module').groupBy('module').forEach(function (components, moduleName) {
				debug(moduleName);
				var navGroup = {
					name: moduleName,
					type: 'groups',
					href: 'api/' + moduleName,
					navItems: []
				};

				_(components)
				.filter(function (it) {
					return it.docType !== 'module';
				})
				.groupBy('docType')
				.forEach(function (categories, typeName) {
					navGroup.navItems.push({
						name: typeName,
						type: 'section',
						href: 'api/' + moduleName + '/' + typeName
					});
					_(categories).forEach(function (it) {
						if (it.docType !== 'module') {
							navGroup.navItems.push({
								name: it.name,
								type: it.docType,
								href: it.path
							});
						}
					});
				});

				res.push(navGroup);
			});
			debug(res);
			return res;
		},
		guide: function (pages, key) {
			var res = {
				name: 'Guide',
				type: 'groups',
				href: 'guide',
				navItems: []
			};

			_(pages).forEach(function (page) {
				res.navItems.push({
					name: page.name,
					type: '',
					href: page.path
				});
			});

			return [res];
		}
	};

	return {
		$runAfter: ['paths-computed'],
		$runBefore: ['rendering-docs'],
		$process: function (docs) {

			var areas = {}, areaIds = [];
			var pages = _(docs)
			.filter(function (it) {
				return it.area;
			});

			_(pages).groupBy('area').forEach(function (pages, key) {
				debug('start process area:', key);
				if (mappers[key]) {
					areas[key] = {
						id: key,
						name: AREA_NAMES[key] || key,
						navGroups: mappers[key](pages, key)
					};
					areaIds.push(key);
				}
			});

			docs.push({
				docType: 'nav-data',
				id: 'nav-data',
				template: 'nav-data.template.js',
				outputPath: 'src/nav-data.js',
				areas: areas
			});

			docs.push({
				template: 'area-data.template.js',
				outputPath: 'src/area-data.js',
				areaIds: areaIds
			});

		}
	};
};
