//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('stripeController', stripeController);
  stripeController.$inject = ['stripeFactory', '$state',"$http","$scope", "$stamplay"];

  function stripeController(stripeFactory, $state, $http, $scope, $stamplay){

  	//PLACEHOLDER IMAGES
	$scope.stripeImg = "public/images/stripe.png";

	//COPY TO CLIPBOARD FIELDS
	$scope.textToCopyStripeAddCustomer = "https://[appid].stamplayapp.com/api/stripe/v1/customers";
	$scope.success = function () {
    	Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
 
	$scope.fail = function (err) {
    	console.error('Error!', err);
    };

	//ADD NEW CUSTOMER
  	$scope.addCustomer = function(){
  		var selectUser = document.getElementById("cuisineDropdown");
  		var userId = selectUser.options[selectUser.selectedIndex].value;

  		stripeFactory.newCustomer(userId).then(function(res){
  			console.log(res);
  			document.getElementById('consoleCursor').className = "hidden";
    		document.getElementById('addCustomerConsoleStatus').className = "";
    		document.getElementById('addCustomerConsoleBody').className = "";
    		document.getElementById('addCustomerConsoleResponse').className = "";
    		$scope.addCustomerBody = {"userId":userId};
    		$scope.addCustomerResponse = res;
    		$scope.addCustomerIdOutput = res.data.customer_id;
    		$scope.addCustomerDtCreated = res.data.dt_create;
  		});
  	};

}
})();