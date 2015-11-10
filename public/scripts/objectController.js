var app = angular.module('stamplay', ['ngStamplay','angular-clipboard']);

//CONTROLLER
app.controller('objectController', ["$http", "$scope", "$stamplay", "objectFactory", function($http, $scope, $stamplay, objectFactory){

//DATE PICKER
jQuery('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});

//COPY TO CLIPBOARD
$scope.textToCopyCreate = "https://[appid].stamplayapp.com/api/cobject/v1/post";
$scope.textToCopyUpdate = "https://[appid].stamplayapp.com/api/user/v1/users";
$scope.textToCopyQuery = "https://[appid].stamplayapp.com/api/user/v1/users";
$scope.textToCopyRate = "https://[appid].stamplayapp.com/api/user/v1/users";
 
$scope.success = function () {
    Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
 
$scope.fail = function (err) {
    console.error('Error!', err);
    };

//CREATE OBJECT
$scope.createObject = function(){
  var title = $scope.objectName;
  var author = $scope.objectAuthor;
  var objectPrice = $scope.objectPrice;
  var objectDate = document.getElementById('objectDate').value;
  var price = parseFloat(objectPrice);
  var published = new Date(objectDate);

  var newObject = {
    title: title,
    author: author,
    price: price,
    datePublished: published
  };

  $http.post("https://apiapp.stamplayapp.com/api/cobject/v1/book", newObject).success(function(res){
    document.getElementById('consoleCursor').className = "hidden";
    document.getElementById('consoleStatus').className = "";
    document.getElementById('consoleBody').className = "";
    document.getElementById('consoleRes').className = "";
    $scope.status = res.status;
    $scope.text = res.statusText;
    $scope.body = newObject;
    $scope.response = res;
    document.getElementById('objectOutputName').innerHTML = res.title;
    document.getElementById('objectOutputAuthor').innerHTML = res.author;
    document.getElementById('objectOutputDate').innerHTML = res.dt_create;
    document.getElementById('objectOutputId').innerHTML = res._id;
    $scope.objectName = "";
    $scope.objectAuthor = "";
    $scope.objectPrice = "";
    var objectDate = document.getElementById('objectDate').value = "";


  });
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