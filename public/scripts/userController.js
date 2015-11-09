var app = angular.module('stamplay', ['ngStamplay','angular-clipboard']);



//CONTROLLER
app.controller('userController', ["$http","$scope", "$stamplay", "appFactory", function($http, $scope, $stamplay, appFactory){

 console.log('hit');

//REGISTER NEW USER
$scope.signUp = function(){

		var registrationData = {
			displayName:$scope.name,
			email: $scope.email,
			password: $scope.password
			};

		$http.post("https://apiapp.stamplayapp.com/api/user/v1/users", registrationData).then(function(res){
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
	$http.get("https://apiapp.stamplayapp.com/auth/v1/logout").then(function(res){
		console.log(res);
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

}]);




