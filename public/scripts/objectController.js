var app = angular.module('stamplay', ['ngStamplay','angular-clipboard']);

//CONTROLLER
app.controller('objectController', ["$http", "$scope", "$stamplay", "objectFactory", function($http, $scope, $stamplay, objectFactory){

//DATE PICKER
jQuery('.datepicker').pickadate({
    selectMonths: true, 
    selectYears: 15 
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

//ON PAGE LOAD GET DATA
objectFactory.getBook().then(function(res){
  $scope.updateTitle = res.title;
  $scope.updateAuthor = res.author;
  $scope.updateDate = res.dt_update;
  $scope.updateId = res._id;
});

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
    $scope.createTitle = res.title;
    $scope.createAuthor = res.author;
    $scope.createDate = res.dt_create;
    $scope.createId = res._id;
    $scope.objectName = "";
    $scope.objectAuthor = "";
    $scope.objectPrice = "";
    var objectDate = document.getElementById('objectDate').value = "";
  });
};

//UPDATE OBJECT
$scope.updateObject = function(){
  var title = $scope.newTitle;
  var author = $scope.newAuthor;

  newData = {
    title: title,
    author: author
  };

  objectFactory.editObject(newData).then(function(res){
    $scope.updateTitle = res.title;
    $scope.updateAuthor = res.author;
    $scope.updateDate = res.dt_update;
    $scope.updateId = res._id;
    $scope.newTitle = "";
    $scope.newAuthor = "";

  });
};






}]);
//FACTORY----------------------------------------------------------------------------//
app.factory('objectFactory', ["$http","$q", function($http, $q) {
  return {
    getBook : function(){
      var q = $q.defer();
      $http.get("https://apiapp.stamplayapp.com/api/cobject/v1/book/564273fad53d37e40ef1ae88").success(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    editObject: function(newData){
      var q = $q.defer();
      $http.put("https://apiapp.stamplayapp.com/api/cobject/v1/book/564273fad53d37e40ef1ae88", newData).success(function(res){
        q.resolve(res);
      });
      return q.promise;
    }



  };
}]);