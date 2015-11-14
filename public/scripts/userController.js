
//CONTROLLER
(function() {
	'use strict';
	angular.module('stamplay')
	.controller('userController', userController);
	userController.$inject = ['$state',"$http","$scope", "$stamplay","userFactory"];

function userController($state, $http, $scope, $stamplay, userFactory){

//ON PAGE LOAD GET ALL DATA FOR LOGGED IN USERS

userFactory.getUsers().then(function(res){
	console.log(res);
});

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
	
	window.location.href = "https://apiapp.stamplayapp.com/auth/v1/logout";
};

//SIGN UP WITH FACEBOOK
$scope.facebook = function(){
	
	window.location.href="https://apiapp.stamplayapp.com/auth/v1/facebook/connect";
};



//COPY TO CLIPBOARD
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

//FACTORY
(function() {
  'use strict';
  angular.module('stamplay')
  .factory('userFactory', userFactory);
  userFactory.$inject = ['$http', '$q'];

  function userFactory($http, $q) {

  return {
  	getUsers: function(){
  		var q = $q.defer();
  		$http.get("https://apiapp.stamplayapp.com/api/user/v1/getstatus")
  		.then(function success(res){
  			console.log(res);
  			q.resolve(res);
  		}, function error(err){
  			console.log(err);
  		});
  		return q.promise;
  	}
  };

}
})();




