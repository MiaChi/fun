var mainController = angular.module('mainController', ['mainService']);

mainController.controller('getEaters', function($scope, $http) {
	$http.get("http://localhost:3000/eaters")
	.success(function(response) {$scope.eaters = response;});
});

mainController.controller('getRestaurant', function($scope, $http) {
	$http.get("http://localhost:3000/restaurant")
	.success(function(response) {
		$scope.rests = response;
	});
});
mainController.controller('getWallet', function($scope, $http) {
	$http.get("http://localhost:3000/wallet")
	.success(function(response) {
		$scope.change = response;
	 });
});

mainController.controller('getDetail', function($scope, $http) {
	$http.get("http://localhost:3000/detail")
	.success(function(response) {$scope.detail = response;});
});
mainController.controller('getAll', function($scope, $http) {
	$http.get("http://localhost:3000/all")
	.success(function(response) {$scope.all = response;});
});

mainController.controller('add', function($scope, $http, Data) {
	$scope.required_value = 0;
	$scope.msg = '';
	$scope.param = {};
	$http.get("http://localhost:3000/wallet")
	.success(function(response) {
		$scope.change = response;
	 });

	$scope.addBill = function(){
		$scope.param.year = year.value;
		$scope.param.month = month.value;
		$scope.param.day = day.value;

		var attendees =[];
		angular.forEach($scope.change,function(value,key){
			if(value.selected){
				this.push(value.mail);
			}
		},attendees);
	  //$scope.param.attendees = attendees.join(',');
	  $scope.param.attendees = attendees;

	$http({
		method:'GET',
		url:"http://localhost:3000/addBill",
		params:$scope.param,
		header:{'Access-Control-Allow-Origin': '*'}
	})
	.success(function(res){
		if(res === 'succeed'){
      $scope.msg = 'Submitted!';
		}
		if(res === 'failed'){
      $scope.msg = 'Error!';
		}
		console.log("from server response: "+res);
		//console.log("change:"+$scope.change);
		console.log("rest:"+$scope.param.restaurant);
		console.log("host:"+$scope.param.host);
		console.log("rest:"+Data.restaurant);
		console.log($scope.param.attendees);
	});
	}
});
