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

//MODAL
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });

//COPY TO CLIPBOARD FIELDS
$scope.textToCopyCreate = "https://[appid].stamplayapp.com/api/cobject/v1/post";
$scope.textToCopyUpdate = "https://[appid].stamplayapp.com/api/cobject/v1/post/id";
$scope.textToCopyQuery = "https://[appid].stamplayapp.com/api/cobject/v1/post?propertyField=value";
$scope.textToCopyRate = "https://[appid].stamplayapp.com/api/cobject/v1/post/id/rate";
$scope.textToCopyActivity = "https://[appid].stamplayapp.com/api/cobject/v1/post/id/activities";
$scope.textToCopyEmail = "https://[appid].stamplayapp.com/api/email/v1/send";
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
$scope.activityImg = "public/images/activity.jpg";
$scope.emailImg = "public/images/email.jpg";

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

//CATELOG ANIMATIONS
$scope.zipDownloadUser = function(){
  document.getElementById('userSignUp').className = "fa fa-users large categoryIcons animated pulse";
};

$scope.zipDownloadSocial = function(){
  document.getElementById('socialLogin').className = "fa fa-facebook large categoryIcons animated pulse";
};

$scope.zipDownloadCreateUpdate = function(){
  document.getElementById('createUpdate').className = "fa fa-plus large categoryIcons animated pulse";
};

$scope.zipDownloadQuery = function(){
  document.getElementById('queryObject').className = "fa fa-search large categoryIcons animated pulse";
};

$scope.zipDownloadRate = function(){
  document.getElementById('rateObject').className = "fa fa-star large categoryIcons animated pulse";
};

$scope.zipDownloadVote = function(){
  document.getElementById('voteObject').className = "fa fa-thumbs-up large categoryIcons animated pulse";
};

$scope.zipDownloadComment = function(){
  document.getElementById('objectComment').className = "fa fa-commenting large categoryIcons animated pulse";
};

$scope.zipDownloadActions = function(){
  document.getElementById('objectActions').className = "fa fa-bolt large categoryIcons animated pulse";
};

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
var ratesCounter = 0;
var upvotesCounter = 0;
var downvotesCounter = 0;
var commentsCounter = 0;

$scope.getActivity = function() {
  var selectName = document.getElementById("selectName");
  var id = selectName.options[selectName.selectedIndex].value;

  objectFactory.getActivites(id).then(function(res){
    objectFactory.getImage(id).then(function(img){
      document.getElementById('activityConsoleCursor').className = "hidden";
      document.getElementById('activityConsoleStatus').className = "";
      document.getElementById('activityConsoleBody').className = "";
      document.getElementById('activityConsoleResponse').className = "";
      $scope.activityBody = { };
      $scope.activityResponse = res.data;
      $scope.activityImg = img.data.restaurantImage;

      var activity = res.data.data;
      if(res.data.data.length === 0){
        $scope.rates = 0;
        $scope.upvotes = 0;
        $scope.downvotes = 0;
        $scope.comments = 0;
      }
      for(var i = 0; i < activity.length; i++){
        var action = activity[i].activity;

        if(action === "rated"){
          ratesCounter = ratesCounter + 1;
          $scope.rates = ratesCounter;
        }
        else if(action === "upvoted"){
          upvotesCounter = upvotesCounter + 1;
          $scope.upvotes = upvotesCounter;
        }
        else if(action === "downvoted"){
          downvotesCounter = downvotesCounter + 1;
          $scope.downvotes = downvotesCounter;
        }
        else if(action === "commented"){
          commentsCounter = commentsCounter + 1;
          $scope.comments = commentsCounter;
        }
      }
    });
  });
};

//EMAIL
  $scope.sendEmail = function(){
    var to = $scope.emailTo;
    var from = $scope.emailFrom;
    var subject = $scope.emailSubject;
    var body = $scope.emailBody;

    var email = {
      to: to,
      from: from,
      subject: subject,
      body: body
    };

    objectFactory.Mail(email).then(function(res){
      document.getElementById('emailConsoleCursor').className = "hidden";
      document.getElementById('emailConsoleStatus').className = "";
      document.getElementById('emailConsoleBody').className = "";
      document.getElementById('emailConsoleResponse').className = "";
      $scope.to = email.to;
      $scope.from = email.from;
      $scope.subject = email.subject;
      $scope.body = email.body;
      $scope.emailConsoleBody = email;
      $scope.emailResponse = res;
      document.getElementById('emailTo').value = "";
      document.getElementById('emailFrom').value = "";
      document.getElementById('emailSubject').value = "";
      document.getElementById('emailBody').value = "";
      $scope.emailImg = "public/images/sent.png";
      Materialize.toast('Send successful!', 3000, 'rounded');
    });


  };

}
})();



