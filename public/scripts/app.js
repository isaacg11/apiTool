
(function() {
	'use strict';
	var app = angular.module('stamplay', ['ui.router','ngStamplay','angular-clipboard'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	app.run(function($location){
		var params = window.location.href.split("?")[1];
		if(params) {
			console.log("Login From Redirect.");
			console.log(window.location.href.split("?"));
		} else {
			console.log("Not from redirect.");
		}
	});
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
	$stateProvider.state('Catalog',{
		url: '/catalog',
		templateUrl: '/catalog.html',
		controller: 'objectController'
	});
	$stateProvider.state('Stripe',{
		url: '/stripe',
		templateUrl: '/stripe.html',
		controller: 'stripeController'
	});
	$urlRouterProvider.otherwise('/');
	}

})();