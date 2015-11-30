//FACTORY

(function() {
  'use strict';
  angular.module('stamplay')
  .factory('stripeFactory', stripeFactory);
  stripeFactory.$inject = ['$http', '$q'];

  function stripeFactory($http, $q) {

  	return {
    	newCustomer : function(userId){
      		var q = $q.defer();
      		var id = {"userId": userId};
      		$http.post("https://apiapp.stamplayapp.com/api/stripe/v1/customers/", id)
        	.then(function success(res){
          		q.resolve(res);
        	}, function error(err) {
          		console.log(err);
        	});
        		return q.promise;
    	},
    	newCard : function(token, id){
      		var q = $q.defer();
      		var cardToken = {"token": token};
      		$http.post("https://apiapp.stamplayapp.com/api/stripe/v1/customers/"+id+"/cards", cardToken)
        	.then(function success(res){
          		q.resolve(res);
        	}, function error(err) {
          		console.log(err);
        	});
        		return q.promise;
    	},
      editCard: function(token, id){
        var q = $q.defer();
        var cardToken = {"token": token};
        $http({
          method: "PUT",
          url : "https://apiapp.stamplayapp.com/api/stripe/v1/customers/"+id+"/cards",
          data : cardToken,
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
      newCharge : function(chargeInfo){
        var q = $q.defer();
        $http.post("https://apiapp.stamplayapp.com/api/stripe/v1/charges", chargeInfo)
        .then(function success(res){
            q.resolve(res);
        }, function error(err) {
            console.log(err);
        });
        return q.promise;
      },
      addSubscription : function(subscriptionInfo){
        var plan = {"planId":subscriptionInfo.planId};
        var q = $q.defer();
        $http.post("https://apiapp.stamplayapp.com/api/stripe/v1/customers/"+subscriptionInfo.userId+"/subscriptions", plan)
        .then(function success(res){
            q.resolve(res);
        }, function error(err) {
            console.log(err);
        });
        return q.promise;
      },
      editSubscription: function(updatedInfo){
        var q = $q.defer();
        var request = {"options":{
            "plan":updatedInfo.updatePlan
        }};
        $http({
          method: "PUT",
          url : "https://apiapp.stamplayapp.com/api/stripe/v1/customers/"+updatedInfo.userId+"/subscriptions/"+updatedInfo.subscriptionId+" ",
          data : request,
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
      }
	 };

//CLOSING BRACKETS
}
})();