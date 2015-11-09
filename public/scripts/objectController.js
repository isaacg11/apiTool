var app = angular.module('stamplay', ['ngStamplay','angular-clipboard']);

//CONTROLLER
app.controller('objectController', ["$scope", "$stamplay", "appFactory", function($scope, $stamplay, appFactory){


jQuery('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});

$scope.textToCopyCreate = "https://[appid].stamplayapp.com/api/user/v1/users";
$scope.textToCopyUpdate = "https://[appid].stamplayapp.com/api/user/v1/users";
 
$scope.success = function () {
    Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
 
$scope.fail = function (err) {
    console.error('Error!', err);
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