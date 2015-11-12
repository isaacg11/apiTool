//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('objectController', objectController);
  objectController.$inject = ['objectFactory', '$state',"$http","$scope", "$stamplay"];

  function objectController(objectFactory, $state, $http, $scope, $stamplay){

//DATE PICKER
jQuery('.datepicker').pickadate({
    selectMonths: true, 
    selectYears: 15 
});

//COPY TO CLIPBOARD FIELDS
$scope.textToCopyCreate = "https://[appid].stamplayapp.com/api/cobject/v1/post";
$scope.textToCopyUpdate = "https://[appid].stamplayapp.com/api/cobject/v1/post/id";
$scope.textToCopyQuery = "http://[appid].stamplayapp.com/api/cobject/v1/post?propertyField=value";
$scope.textToCopyRate = "https://[appid].stamplayapp.com/api/cobject/v1/post/id/rate";
 
$scope.success = function () {
    Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
 
$scope.fail = function (err) {
    console.error('Error!', err);
    };

//GENERIC BOOK IMAGE
$scope.bookImg = "public/images/book.jpg";

//ON PAGE LOAD GET & DISPLAY DATA FOR QUERIES
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
  $scope.rateReviewOutput = res.actions.comments;
});

//CREATE OBJECT
$scope.createObject = function(){
  var title = $scope.objectName;
  var author = $scope.objectAuthor;
  var objectPrice = $scope.objectPrice;
  var objectDate = document.getElementById('objectDate').value;
  var image = $scope.imageURL;
  var price = parseFloat(objectPrice);
  var published = new Date(objectDate);

  var newObject = {
    title: title,
    author: author,
    price: price,
    datePublished: published,
    bookImage: image
  };

  objectFactory.addBook(newObject).then(function(res){
    document.getElementById('consoleCursor').className = "hidden";
    document.getElementById('createConsoleStatus').className = "";
    document.getElementById('createConsoleBody').className = "";
    document.getElementById('createConsoleResponse').className = "";
    $scope.createBody = newObject;
    $scope.createResponse = res;
    $scope.createTitle = res.data.title;
    $scope.createAuthor = res.data.author;
    $scope.createDate = res.data.dt_create;
    $scope.bookImg = res.data.bookImage;
    $scope.createId = res.data._id;
    $scope.objectName = "";
    $scope.objectAuthor = "";
    $scope.objectPrice = "";
    var objectDate = document.getElementById('objectDate').value = "";
    $scope.imageURL = "";
  });
};

//UPDATE OBJECT
$scope.updateObject = function(){
  var title = $scope.newTitle;
  var author = $scope.newAuthor;

  var newData = {
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
  var selectCuisine = document.getElementById("cuisineDropdown");
  var cuisine = selectCuisine.options[selectCuisine.selectedIndex].value;

  var selectCity = document.getElementById("cityDropdown");
  var city = selectCity.options[selectCity.selectedIndex].value;

  var queryParams = {
    cuisine: cuisine,
    city: city
  };

  objectFactory.findObject(queryParams).then(function(res){
    document.getElementById('queryConsoleCursor').className = "hidden";
    document.getElementById('queryConsoleStatus').className = "";
    document.getElementById('queryConsoleBody').className = "";
    document.getElementById('queryConsoleResponse').className = "";
    $scope.queryBody = queryParams;
    $scope.queryResponse = res;
    $scope.queryRestaurantOutput = res.data.data[0].restaurant;
    $scope.queryCuisineOutput = res.data.data[0].cuisine;
    $scope.queryCityOutput = res.data.data[0].city;
    $scope.queryAddressOutput = res.data.data[0].address;
    $scope.queryCuisine = "";
    $scope.queryCity = "";
  });
};

//RATE OBJECT
$scope.rateFive = function(){
  var five = 5;
  objectFactory.rate(five).then(function(res){
    $scope.rateRatingsOutput = res.actions.ratings.avg;
  });
};
$scope.rateFour = function(){
  var four = 4;
  objectFactory.rate(four).then(function(res){
    $scope.rateRatingsOutput = res.actions.ratings.avg;
  });
};



}
})();



