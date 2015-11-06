var app = angular.module('stamplay', ['ngStamplay']);

//CONTROLLER
app.controller('objectController', ["$scope", "$stamplay", "appFactory", function($scope, $stamplay, appFactory){

 //GET USER INFO ON PAGE LOAD
//   appFactory.getUser().then(function(user) {
//   	var email = user.get("email");
//   	$scope.email = email;
//   });

}]);

//CONTROLLER
app.controller('userController', ["$http","$scope", "$stamplay", "appFactory", function($http, $scope, $stamplay, appFactory){


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
			$scope.name = "";
			$scope.email = "";
			$scope.password = "";
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



}]);


//FACTORY----------------------------------------------------------------------------//
app.factory('appFactory', ["$q", function($q) {
  return {
    getUser : function(){
      // var q = $q.defer();
      // var user = new Stamplay.User().Model;
      // user.currentUser().then(function(){
      //   q.resolve(user);
      // });
      // return q.promise;
    }



  };
}]);
