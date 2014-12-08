'use strict';

angular.module('docApp').controller('DocsCtrl', function($scope, $location, DOCS_NAVIGATION){
	var docs = this;
	var basePath = '/';

	docs.currentArea = null;

	docs.navState = function (navItem) {
		var res = [];
		if (navItem.type === 'section'){
			res.push('nav-index-section');
		} 
		if ('/' + navItem.href === docs.currentPath){
			res.push('current');
		}
		return res;
	};

	docs.changeCurrent = function(newPath, hash){
		var area;
		docs.currentPath = newPath;
		newPath = newPath.replace(new RegExp('^' + basePath), '');
		area = newPath.split('/')[0];
		docs.currentArea = DOCS_NAVIGATION[area];

		if(newPath === '' || newPath === 'index.html'){
			newPath = 'index';
		}
		if(!newPath.match(/\.html$/)){
			newPath = newPath + '.html';
		}
		newPath = 'partials/' + newPath;

		//console.log(newPath, hash);

		docs.currentHash = hash;
		docs.partialPath = newPath;

	};

	$scope.$on('$locationChangeStart', function(){
		docs.changeCurrent($location.path(), $location.hash());
	});

});

