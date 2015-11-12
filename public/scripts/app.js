
(function() {
	'use strict';
	var app = angular.module('stamplay', ['ui.router','ngStamplay','angular-clipboard'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];

	app.config(function($httpProvider) {
  	$httpProvider.defaults.headers.common = {
    	"Content-Type" : "application/json",
  	};
  	$httpProvider.defaults.headers.put = {
    	"x-stamplay-jwt" : window.localStorage.getItem("x-stamplay-jwt") || false
  	};
});

function Config($stateProvider, $urlRouterProvider) {
	$stateProvider.state('Landing',{
		url: '/',
		templateUrl: '/landingPage.html'
	});
	$stateProvider.state('Users',{
		url: '/users',
		templateUrl: '/users.html',
		controller: 'userController'
	});
	$stateProvider.state('Objects',{
		url: '/objects',
		templateUrl: '/objects.html',
		controller: 'objectController'
	});
	$urlRouterProvider.otherwise('/');
	}

})();