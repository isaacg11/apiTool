var app = angular.module('stamplay', ['ngStamplay','angular-clipboard']);

//CONTROLLER
app.controller('objectController', ["$http", "$scope", "$stamplay", "objectFactory", function($http, $scope, $stamplay, objectFactory){

//DATE PICKER
jQuery('.datepicker').pickadate({
    selectMonths: true, 
    selectYears: 15 
});

//COPY TO CLIPBOARD FIELDS
$scope.textToCopyCreate = "https://[appid].stamplayapp.com/api/cobject/v1/post";
$scope.textToCopyUpdate = "https://[appid].stamplayapp.com/api/cobject/v1/post/id";
$scope.textToCopyQuery = "http://[appid].stamplayapp.com/api/cobject/v1/post?propertyField=value";
$scope.textToCopyRate = "https://[appid].stamplayapp.com/api/user/v1/users";
 
$scope.success = function () {
    Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
 
$scope.fail = function (err) {
    console.error('Error!', err);
    };

//ON PAGE LOAD GET DATA FOR QUERIES
objectFactory.getBook().then(function(res){
  $scope.updateTitle = res.title;
  $scope.updateAuthor = res.author;
  $scope.updateDate = res.dt_update;
  $scope.updateId = res._id;
});

objectFactory.getRestaurant().then(function(res){
  $scope.rateRestaurantOutput = res.restaurant;
  $scope.rateRatingsOutput = res.actions.ratings.avg;
  var upvotes = res.actions.votes.users_upvote.length;
  var downvotes = res.actions.votes.users_downvote.length;
  $scope.rateLikesOutput = upvotes - downvotes;
  $scope.rateReviewOutput = res.actions.comments.length;
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
    document.getElementById('createConsoleStatus').className = "";
    document.getElementById('createConsoleBody').className = "";
    document.getElementById('createConsoleResponse').className = "";
    $scope.createBody = newObject;
    $scope.createResponse = res;
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
    document.getElementById('updateConsoleCursor').className = "hidden";
    document.getElementById('updateConsoleStatus').className = "";
    document.getElementById('updateConsoleBody').className = "";
    document.getElementById('updateConsoleResponse').className = "";
    $scope.updateBody = newData;
    $scope.updateResponse = res;
    $scope.updateTitle = res.title;
    $scope.updateAuthor = res.author;
    $scope.updateDate = res.dt_update;
    $scope.updateId = res._id;
    $scope.newTitle = "";
    $scope.newAuthor = "";
  });
};

//QUERY OBJECT
$scope.queryObject = function(){
  var queryParams = {
    cuisine: $scope.queryCuisine,
    city: $scope.queryCity
  };

  objectFactory.findObject(queryParams).then(function(res){
    document.getElementById('queryConsoleCursor').className = "hidden";
    document.getElementById('queryConsoleStatus').className = "";
    document.getElementById('queryConsoleBody').className = "";
    document.getElementById('queryConsoleResponse').className = "";
    $scope.queryBody = queryParams;
    $scope.queryResponse = res;
    $scope.queryRestaurantOutput = res.data[0].restaurant;
    $scope.queryCuisineOutput = res.data[0].cuisine;
    $scope.queryCityOutput = res.data[0].city;
    $scope.queryAddressOutput = res.data[0].address;
    $scope.queryCuisine = "";
    $scope.queryCity = "";
  });
};

//RATE OBJECT
$scope.rateFive = function(){
  var a = document.getElementById("fiveStars").checked;
  if(a === true) {
    objectFactory.upvoteFive().then(function(res){
      console.log(res);
    });
  }
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
    getRestaurant : function(){
      var q = $q.defer();
      $http.get("https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/56428cefd53d37e40ef1aed9").success(function(res){
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
    },
    findObject: function(queryParams){
      var q = $q.defer();
      $http.get('http://apiapp.stamplayapp.com/api/cobject/v1/restaurant?where={"$and":[{"cuisine":"'+queryParams.cuisine+'"},{"city":"'+queryParams.city+'"}]}').success(function(res){
        q.resolve(res);
      });
      return q.promise;
    },
    upvoteFive: function(){
      var q = $q.defer();
      var data = {rate: 3};
      $http.put("https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/56428cefd53d37e40ef1aed9",data).success(function(res){
        q.resolve(res);
      });
      return q.promise;
    }



  };
}]);