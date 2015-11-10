var app = angular.module('stamplay', ['ngStamplay','angular-clipboard']);

//CONTROLLER
app.controller('objectController', ["$scope", "$stamplay", "objectFactory", function($scope, $stamplay, objectFactory){

//DATE PICKER
jQuery('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});

//COPY TO CLIPBOARD
$scope.textToCopyCreate = "https://[appid].stamplayapp.com/api/user/v1/users";
$scope.textToCopyUpdate = "https://[appid].stamplayapp.com/api/user/v1/users";
$scope.textToCopyQuery = "https://[appid].stamplayapp.com/api/user/v1/users";
$scope.textToCopyRate = "https://[appid].stamplayapp.com/api/user/v1/users";
 
$scope.success = function () {
    Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
 
$scope.fail = function (err) {
    console.error('Error!', err);
    };


}]);

//FACTORY----------------------------------------------------------------------------//
app.factory('objectFactory', ["$q", function($q) {
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