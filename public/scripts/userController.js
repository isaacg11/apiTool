
//CONTROLLER
(function() {
	'use strict';
	angular.module('stamplay')
	.controller('userController', userController);
	userController.$inject = ['$state',"$http","$scope", "$stamplay"];

  function userController($state, $http, $scope, $stamplay){


//REGISTER NEW USER
$scope.signUp = function(){

		var registrationData = {
			displayName:$scope.name,
			email: $scope.email,
			password: $scope.password
			};

		$http.post("https://apiapp.stamplayapp.com/api/user/v1/users", registrationData).then(function(res){
			window.localStorage.setItem("x-stamplay-jwt", res.headers("x-stamplay-jwt"));
			$scope.displayName = res.data.displayName;
			$scope.userEmail = res.data.email;
			$scope.userDtCreated = res.data.dt_create;
			$scope.userId = res.data._id;
			document.getElementById('consoleCursor').className = "hidden";
			document.getElementById('consoleStatus').className = "";
			document.getElementById('consoleBody').className = "";
			document.getElementById('consoleRes').className = "";
			$scope.status = res.status;
			$scope.text = res.statusText;
			$scope.body = registrationData;
			$scope.response = res.data;
			$scope.name = "";
			$scope.email = "";
			$scope.password = "";
			document.getElementById('logoutBtn').className = "";
			document.getElementById('signUpBtn').className = "hidden";
		});
	};

$scope.reset = function(){
	$scope.displayName = "";
	$scope.userEmail = "";
	$scope.userDtCreated = "";
	$scope.userId = "";
};

//LOGOUT USER//
$scope.logout = function(){
	var token = window.localStorage.getItem("http://localhost:8080-jwt");
	token.setToken("").then(function(res){
		console.log(res);
	}, function(err) {
		console.error(err);
	});
};

$scope.facebook = function(){
	console.log('hit');
	$http.get("https://apiapp.stamplayapp.com/auth/v1/facebook/connect").then(function(res){
		console.log(res);
	});
};

$scope.textToCopyEP = "https://[appid].stamplayapp.com/api/user/v1/users";
$scope.textToCopy = "https://[appid].stamplayapp.com/auth/v1/facebook/connect";
 
$scope.success = function () {
    Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
 
$scope.fail = function (err) {
    console.error('Error!', err);
    };

}
})();




