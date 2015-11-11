
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
      var data = {"rate": 3};
      var token = window.localStorage.getItem("x-stamplay-jwt");
      var headers = {
        "x-stamplay-jwt" : token,
        "content-type" : "application/json"
      };
      console.log(headers);
      var q = $q.defer();
      $http.put("https://apiapp.stamplayapp.com/api/cobject/v1/restaurant/56428cefd53d37e40ef1aed9/rate", data)
      .then(function(res){
        q.resolve(res);
      });
      return q.promise;
    }


};
}
})();