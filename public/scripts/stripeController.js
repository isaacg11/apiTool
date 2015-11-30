//CONTROLLER
(function() {
  'use strict';
  angular.module('stamplay')
  .controller('stripeController', stripeController);
  stripeController.$inject = ['$rootScope','stripeFactory', '$state',"$http","$scope", "$stamplay"];

  function stripeController($rootScope, stripeFactory, $state, $http, $scope, $stamplay){
//STRIPE
  	Stripe.setPublishableKey('pk_test_HPR6tudq146rHCAxtjl84xm3');


//PLACEHOLDER IMAGES
	  $scope.stripeImg = "public/images/stripe.png";

//COPY TO CLIPBOARD FIELDS
	  $scope.textToCopyStripeAddCustomer = "https://[appid].stamplayapp.com/api/stripe/v1/customers";
    $scope.textToCopyStripeAddCard = "https://[appid].stamplayapp.com/api/stripe/v1/customers/:userId/cards";
    $scope.textToCopyStripeChargeCard = "https://[appid].stamplayapp.com/api/stripe/v1/charges";
    $scope.textToCopyStripeNewSubscription = "https://[appid].stamplayapp.com/api/stripe/v1/customers/:userId/subscriptions";
	  $scope.textToCopyStripeUpdateSubscription = "https://[appid].stamplayapp.com/api/stripe/v1/customers/:userId/subscriptions/:subscriptionId";

	  $scope.success = function () {
    	Materialize.toast('Copied to clipboard!', 3000, 'rounded');
    };
	  $scope.fail = function (err) {
    	console.error('Error!', err);
    };

//ADD NEW CUSTOMER
  	$scope.addCustomer = function(){
  		var userId = $scope.customerId;
  		stripeFactory.newCustomer(userId).then(function(res){
  			document.getElementById('addCustomerConsoleCursor').className = "hidden";
    		document.getElementById('addCustomerConsoleStatus').className = "";
    		document.getElementById('addCustomerConsoleBody').className = "";
    		document.getElementById('addCustomerConsoleResponse').className = "";
    		$scope.addCustomerBody = {"userId":userId};
    		$scope.addCustomerResponse = res;
    		$scope.addCustomerIdOutput = res.data.customer_id;
    		$scope.addCustomerDtCreated = res.data.dt_create;
    		$scope.customerId = "";
  		});
  	};

//ADD NEW CARD
  	$scope.card = {
    	number: '',
    	cvc: '',
    	exp_month: '',
    	exp_year: ''
  	};  	

  	$scope.addCard = function(){
  		var id = $scope.addCardUserId;
  		Stripe.card.createToken($scope.card, function(status, response){
      		if (response.error) {
        		console.log('error', response.error);
      		} else {
        		var token = response.id;
        		stripeFactory.newCard(token, id)
        		.then(function (res) {
        		  document.getElementById('addCardConsoleCursor').className = "hidden";
    				  document.getElementById('addCardConsoleStatus').className = "";
    				  document.getElementById('addCardConsoleBody').className = "";
    				  document.getElementById('addCardConsoleResponse').className = "";
    				  var body = $scope.card;
    				  $scope.addCardBody = body;
    				  $scope.addCardResponse = res;
    				  $scope.cardBrand = res.data.brand;
    				  $scope.cardId = res.data.card_id;
    				  $scope.cardCountry = res.data.country;
    				  $scope.cardLast4 = res.data.last4;
    				  $scope.card.number = "";
    				  $scope.card.cvc = "";
    				  $scope.card.exp_month = "";
    				  $scope.card.exp_year = "";
  					  $scope.addCardUserId = "";
        		  });
      		  }
    	 });
  	};

//UPDATE CARD
  	$scope.updateCard = function(){
  		var id = $scope.updateCardUserId;
  		Stripe.card.createToken($scope.card, function(status, response){
      		if (response.error) {
        		console.log('error', response.error);
      		} else {
        		var token = response.id;
        		stripeFactory.editCard(token, id)
        		.then(function (res) {
        		  document.getElementById('updateCardConsoleCursor').className = "hidden";
    				  document.getElementById('updateCardConsoleStatus').className = "";
    				  document.getElementById('updateCardConsoleBody').className = "";
    				  document.getElementById('updateCardConsoleResponse').className = "";
    				  var body = $scope.updateCardUserId;
    				  $scope.updateCardBody = body;
    				  $scope.updateCardResponse = res;
    				  $scope.updateBrand = res.data.brand;
    				  $scope.updateCardId = res.data.card_id;
    				  $scope.updateCardCountry = res.data.country;
    				  $scope.updateCardLast4 = res.data.last4;
    				  $scope.card.number = "";
    				  $scope.card.cvc = "";
    				  $scope.card.exp_month = "";
    				  $scope.card.exp_year = "";
  					  $scope.updateCardUserId = "";
        		});
      		}
    	});
  	};

//CHARGE CARD
    $scope.card = {
      number: '',
      cvc: '',
      exp_month: '',
      exp_year: ''
    };

    $scope.chargeCard = function(){
      var amount = parseInt($scope.amount);
      Stripe.card.createToken($scope.card, function(status, response){
          if (response.error) {
            console.log('error', response.error);
          } else {
            var token = response.id;
            var chargeInfo = {
            userId: $scope.chargeCardCardUserId,
            token: token,
            amount: amount,
            currency: $scope.currency
          };
            stripeFactory.newCharge(chargeInfo)
            .then(function (res) {
              console.log(res);
            document.getElementById('chargeCardConsoleCursor').className = "hidden";
            document.getElementById('chargeCardConsoleStatus').className = "";
            document.getElementById('chargeCardConsoleBody').className = "";
            document.getElementById('chargeCardConsoleResponse').className = "";
            var body = chargeInfo;
            $scope.chargeCardBody = body;
            $scope.chargeCardResponse = res;
            $scope.chargeAmount = res.data.amount;
            $scope.transactionNumber = res.data.id;
            $scope.transactionTime = res.data.created;
            $scope.card.number = "";
            $scope.card.cvc = "";
            $scope.card.exp_month = "";
            $scope.card.exp_year = "";
            $scope.chargeCardUserId = "";
            $scope.amount = "";
            $scope.currency = "";
            });
          }
      });
    };

//NEW SUBSCRIPTION
    $scope.newSubscription = function(){
      var subscriptionInfo = {
        userId: $scope.newSubscriptionUserId,
        planId: $scope.newSubscriptionPlanId
      };
      stripeFactory.addSubscription(subscriptionInfo)
      .then(function (res) {
        console.log(res);
        document.getElementById('newSubscriptionConsoleCursor').className = "hidden";
        document.getElementById('newSubscriptionConsoleStatus').className = "";
        document.getElementById('newSubscriptionConsoleBody').className = "";
        document.getElementById('newSubscriptionConsoleResponse').className = "";
        var body = subscriptionInfo;
        $scope.newSubscriptionConsoleBody = body;
        $scope.newSubscriptionConsoleResponse = res;
        $scope.newSubscriptionId = res.data.id;
        $scope.newSubscriptionPlanStarts = res.data.current_period_start;
        $scope.newSubscriptionPlanEnds = res.data.current_period_end;
        $scope.newSubscriptionUserId = "";
        $scope.newSubscriptionPlanId = "";
      });
    };
//UPDATE SUBSCRIPTION
    $scope.updateSubscription = function(){
      var updatedInfo = {
        userId: $scope.updateSubscriptionUserId,
        subscriptionId: $scope.updateSubscriptionId,
        updatePlan: $scope.updatePlan
      };
      stripeFactory.editSubscription(updatedInfo)
      .then(function (res) {
        console.log(res);
        document.getElementById('updateSubscriptionConsoleCursor').className = "hidden";
        document.getElementById('updateSubscriptionConsoleStatus').className = "";
        document.getElementById('updateSubscriptionConsoleBody').className = "";
        document.getElementById('updateSubscriptionConsoleResponse').className = "";
        var body = updatedInfo;
        $scope.updateSubscriptionConsoleBody = body;
        $scope.updateSubscriptionConsoleResponse = res;
        $scope.updateSubscriptionIdOutput = res.data.id;
        $scope.updateSubscriptionPlanStarts = res.data.current_period_start;
        $scope.updateSubscriptionPlanEnds = res.data.current_period_end;
        $scope.updateSubscriptionUserId = "";
        $scope.updateSubscriptionId = "";
        $scope.updatePlan = "";
      });
    };
  

//CLOSING BRACKETS
}
})();