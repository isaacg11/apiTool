
//FACTORY

(function() {
  'use strict';
  angular.module('stamplay')
  .factory('objectFactory', objectFactory);
  objectFactory.$inject = ['$http', '$q'];

  function objectFactory($http, $q) {

  return {
    getBook : function(){
      var q = $q.defer();
      $http.get("https://apiapp.stamplayapp.com/api/cobject/v1/book/564a8ddf6f58fbac2fd34be4")
        .then(function success(res){
          q.resolve(res);
        }, function error(err) {
          console.log(err);
        });
        return q.promise;
    },
    addBook: function(data){
      var q = $q.defer();
      $http.post("https://apiapp.stamplayapp.com/api/cobject/v1/book", data)
        .then(function success(res){
          q.resolve(res);
        }, function error(err) {
          console.log(err);
        });
        return q.promise;
    },
    getRestaurant : function(){
      var q = $q.defer();
      $http.get("https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/56428cefd53d37e40ef1aed9")
        .then(function success(res){
          q.resolve(res);
        }, function error(err) {
          console.log(err);
        });
        return q.promise;
    },
    editObject: function(newData){
      var q = $q.defer();
      $http({
        method: "PUT",
        url : "https://apiapp.stamplayapp.com/api/cobject/v1/book/564a8ddf6f58fbac2fd34be4",
        data : newData,
        headers : { 
          "x-stamplay-jwt" : window.localStorage.getItem(window.location.origin+'-jwt')
        }
      })
        .then(function success(res){
          console.log(res);
          q.resolve(res);
        }, function error(err) {
          console.log(err);
        });
        return q.promise;
    },
    findObject: function(queryParams){
      var q = $q.defer();
     
      $http.get('https://apiapp.stamplayapp.com/api/cobject/v1/restaurant?where={"$and":[{"cuisine":"'+queryParams.cuisine+'"},{"city":"'+queryParams.city+'"}]}')
      .then(function success(res){
        q.resolve(res);
      }, function error(err) {
        console.log(err);
      });
      return q.promise;
    },
    rate: function(num){
      var q = $q.defer();
      $http({
        method: "PUT",
        url : "https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/56428cefd53d37e40ef1aed9/rate",
        data : {"rate": num},
        headers : { 
          "x-stamplay-jwt" : window.localStorage.getItem(window.location.origin+'-jwt')
        }
      }).then(function success(res){
          q.resolve(res);
        }, function error(err) {
          Materialize.toast('Only 1 rating per user!', 3000, 'rounded');
          console.log(err);
        });
        return q.promise;
    },
    votePositive: function(){
      var q = $q.defer();
      $http({
        method: "PUT",
        url : "https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/56428cefd53d37e40ef1aed9/vote",
        data : {"type": "upvote"},
        headers : { 
          "x-stamplay-jwt" : window.localStorage.getItem(window.location.origin+'-jwt')
        }
      }).then(function success(res){
          q.resolve(res);
        }, function error(err) {
          Materialize.toast('Only 1 upvote per user!', 3000, 'rounded');
          console.log(err);
        });
        return q.promise;
    },
    voteNegative: function(){
      var q = $q.defer();
      $http({
        method: "PUT",
        url : "https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/56428cefd53d37e40ef1aed9/vote",
        data : {"type": "downvote"},
        headers : { 
          "x-stamplay-jwt" : window.localStorage.getItem(window.location.origin+'-jwt')
        }
      }).then(function success(res){
          q.resolve(res);
        }, function error(err) {
          Materialize.toast('Only 1 downvote per user!', 3000, 'rounded');
          console.log(err);
        });
        return q.promise;
    },
    placeReview: function(review){
      var q = $q.defer();
      $http({
        method: "PUT",
        url : "https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/56428cefd53d37e40ef1aed9/comment",
        data : {"text": review},
        headers : { 
          "x-stamplay-jwt" : window.localStorage.getItem(window.location.origin+'-jwt')
        }
      }).then(function success(res){
          q.resolve(res);
        }, function error(err) {
          console.log(err);
        });
        return q.promise;
    },
    getActivites: function(id){
      var q = $q.defer();
      $http({
        method: "GET",
        url : "https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/"+id+"/activities",
        headers : { 
          "x-stamplay-jwt" : window.localStorage.getItem(window.location.origin+'-jwt')
        }
      })
      .then(function success(res){
          q.resolve(res);
        }, function error(err) {
          console.log(err);
        });
        return q.promise;
    },
    getImage : function(id){
      var q = $q.defer();
      $http.get("https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/"+id+"")
        .then(function success(res){
          q.resolve(res);
        }, function error(err) {
          console.log(err);
        });
        return q.promise;
    }


};
}
})();