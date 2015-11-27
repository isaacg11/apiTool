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
    	}
	};
}
})();