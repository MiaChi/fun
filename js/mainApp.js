var mainApp = angular.module('mainApp',['ngRoute','mainController','mainService']);

mainApp.config(['$routeProvider',
	function($routeProvider){
    $routeProvider.
	    when('/',{
		    templateUrl:'views/bill.html',
		    controller:'getEaters'	
			}).
      when('/login',{
		    templateUrl:'views/login.html',
		    controller:''	
			}).
      when('/detail',{
		    templateUrl:'views/detail.html',
		    controller:'getDetail'	
			}).
      when('/all',{
		    templateUrl:'views/all.html',
		    controller:'getAll'	
			}).
	    otherwise({
			  redirectTo:'/'
			});
	}]);
