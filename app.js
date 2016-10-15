angular.module('BuyMyJunk', ['ngMaterial', 'ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "home.html" , controller: HomeCtrl
			});
	});