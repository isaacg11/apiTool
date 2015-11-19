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
$scope.textToCopyQuery = "https://[appid].stamplayapp.com/api/cobject/v1/post?propertyField=value";
$scope.textToCopyRate = "https://[appid].stamplayapp.com/api/cobject/v1/post/id/rate";
 
$scope.success = function () {
    Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
 
$scope.fail = function (err) {
    console.error('Error!', err);
    };

//PLACEHOLDER IMAGES
$scope.bookImg = "public/images/book.jpg";
$scope.restaurantImg = "public/images/food.png";
$scope.rateRestaurant = "public/images/rateRes.jpg";

//ON PAGE LOAD GET & DISPLAY DATA FOR QUERIES
objectFactory.getBook().then(function(res){
  $scope.updateTitle = res.data.title;
  $scope.updateAuthor = res.data.author;
  $scope.updateDate = res.data.dt_update;
  $scope.updateId = res.data._id;
  $scope.updateImg = res.data.bookImage;
});

objectFactory.getRestaurant().then(function(res){
  $scope.rateRestaurantOutput = res.data.restaurant;
  $scope.rateRatingsOutput = res.data.actions.ratings.avg;
  var upvotes = res.data.actions.votes.users_upvote.length;
  var downvotes = res.data.actions.votes.users_downvote.length;
  var difference = upvotes - downvotes;
  $scope.rateLikesOutput = difference;
  var lastComment = res.data.actions.comments;
  var newComment = lastComment[lastComment.length - 1];
  $scope.rateReviewOutput = '" ' + newComment.text + ' "';

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
  var image = $scope.newImage;

  var newData = {
      title: title,
      author: author,
      bookImage: image
  };

  objectFactory.editObject(newData).then(function(res){
    document.getElementById('updateConsoleCursor').className = "hidden";
    document.getElementById('updateConsoleStatus').className = "";
    document.getElementById('updateConsoleBody').className = "";
    document.getElementById('updateConsoleResponse').className = "";
    console.log(res);
    $scope.updateBody = newData;
    $scope.updateResponse = res;
    $scope.updateTitle = res.data.title;
    $scope.updateAuthor = res.data.author;
    $scope.updateDate = res.data.dt_update;
    $scope.updateImg = res.data.bookImage;
    $scope.updateId = res.data._id;
    $scope.newTitle = "";
    $scope.newAuthor = "";
    $scope.newImage = "";
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
    $scope.restaurantImg = res.data.data[0].restaurantImage;
    $scope.queryRestaurantOutput = res.data.data[0].restaurant;
    $scope.queryPhoneOutput = res.data.data[0].phone;
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
    document.getElementById('rateConsoleCursor').className = "hidden";
    document.getElementById('rateConsoleStatus').className = "";
    document.getElementById('rateConsoleBody').className = "";
    document.getElementById('rateConsoleResponse').className = "";
    $scope.rateRatingsOutput = res.data.actions.ratings.avg;
    $scope.rateBody = {"rate": 5};
    $scope.rateResponse = res;
  });
};
$scope.rateFour = function(){
  var four = 4;
  objectFactory.rate(four).then(function(res){
    document.getElementById('rateConsoleCursor').className = "hidden";
    document.getElementById('rateConsoleStatus').className = "";
    document.getElementById('rateConsoleBody').className = "";
    document.getElementById('rateConsoleResponse').className = "";
    $scope.rateRatingsOutput = res.data.actions.ratings.avg;
    $scope.rateBody = {"rate": 4};
    $scope.rateResponse = res;
  });
};
$scope.rateThree = function(){
  var three = 3;
  objectFactory.rate(three).then(function(res){
    document.getElementById('rateConsoleCursor').className = "hidden";
    document.getElementById('rateConsoleStatus').className = "";
    document.getElementById('rateConsoleBody').className = "";
    document.getElementById('rateConsoleResponse').className = "";
    $scope.rateRatingsOutput = res.data.actions.ratings.avg;
    $scope.rateBody = {"rate": 3};
    $scope.rateResponse = res;
  });
};
$scope.rateTwo = function(){
  var two = 2;
  objectFactory.rate(two).then(function(res){
    document.getElementById('rateConsoleCursor').className = "hidden";
    document.getElementById('rateConsoleStatus').className = "";
    document.getElementById('rateConsoleBody').className = "";
    document.getElementById('rateConsoleResponse').className = "";
    $scope.rateRatingsOutput = res.data.actions.ratings.avg;
    $scope.rateBody = {"rate": 2};
    $scope.rateResponse = res;
  });
};
$scope.rateOne = function(){
  var one = 1;
  objectFactory.rate(one).then(function(res){
    document.getElementById('rateConsoleCursor').className = "hidden";
    document.getElementById('rateConsoleStatus').className = "";
    document.getElementById('rateConsoleBody').className = "";
    document.getElementById('rateConsoleResponse').className = "";
    $scope.rateRatingsOutput = res.data.actions.ratings.avg;
    $scope.rateBody = {"rate": 1};
    $scope.rateResponse = res;
  });
};

//UPVOTE
$scope.upvote = function(){
  objectFactory.votePositive().then(function(res){
    document.getElementById('rateConsoleCursor').className = "hidden";
    document.getElementById('rateConsoleStatus').className = "";
    document.getElementById('rateConsoleBody').className = "";
    document.getElementById('rateConsoleResponse').className = "";
    $scope.rateBody = {"type": "upvote"};
    $scope.rateResponse = res;
    var upvotes = res.data.actions.votes.users_upvote.length;
    var downvotes = res.data.actions.votes.users_downvote.length;
    var difference = upvotes - downvotes;
    $scope.rateLikesOutput = difference;
  });
};

//DOWNVOTE
$scope.downvote = function(){
  objectFactory.voteNegative().then(function(res){
    document.getElementById('rateConsoleCursor').className = "hidden";
    document.getElementById('rateConsoleStatus').className = "";
    document.getElementById('rateConsoleBody').className = "";
    document.getElementById('rateConsoleResponse').className = "";
    $scope.rateBody = {"type": "downvote"};
    $scope.rateResponse = res;
    var upvotes = res.data.actions.votes.users_upvote.length;
    var downvotes = res.data.actions.votes.users_downvote.length;
    var difference = upvotes - downvotes;
    $scope.rateLikesOutput = difference;
  });
};

//REVIEW
$scope.review = function(){
  var review = $scope.newReview;
  objectFactory.placeReview(review).then(function(res){
    console.log(res);
    document.getElementById('rateConsoleCursor').className = "hidden";
    document.getElementById('rateConsoleStatus').className = "";
    document.getElementById('rateConsoleBody').className = "";
    document.getElementById('rateConsoleResponse').className = "";
    $scope.rateBody = {"text": review};
    $scope.rateResponse = res.data;
    var lastComment = res.data.actions.comments;
    var newComment = lastComment[lastComment.length - 1];
    $scope.rateReviewOutput = '" ' + newComment.text + ' "';
    $scope.newReview = "";
  });
};

//ACTIVITES
var counter = 0;
var id = '56428cefd53d37e40ef1aed9';
objectFactory.getActivites(id).then(function(res){
  var activity = res.data.data;
  for(var i = 0; i < activity.length; i++){
    var action = activity[i].activity;
    if(action === "rated"){
      counter = counter + 1;
      console.log(counter);
      $scope.rates = counter;
    }
    else if(action === "upvoted"){
      $scope.upvotes = action;
    }
    else if(action === "downvoted"){
      $scope.downvotes = action;
    }
    else if(action === "commented"){
      $scope.comments = action;
    }
  }
});

}
})();



