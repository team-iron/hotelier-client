(function() {
  'use strict';
  angular.module('hotelier')
    .controller('GuestListController', GuestListController);

  GuestListController.$inject = [ '$state', 'GuestListService' ];

  /**
   * Guest List constructor function calling the functions from the service into its
   * local scope to pass onto the html.
   * @param {Service} GuestListService Controllers injected service
   */
  function GuestListController($state, GuestListService) {
     var vm = this;
     this.inputValues = {};
     this.errorMessage = {};

     this.createGuest = function createGuest() {

       GuestListService.postGuest(this.inputValues.fullName, this.inputValues.email, this.inputValues.phone)
        .then(function success() {
            $state.go('create-reservation');
        })
        .catch(function error(xhr) {
            console.log(xhr);
            if (xhr.data.error.status > 400 && xhr.data.error.status < 500) {
                vm.errorMessage.statusResponse = xhr.data.error.message;
            } else {
                vm.errorMessage.statusResponse = 'Try again soon. Our system is down.';
            }
        });
     };
       /**
        * This function does a GET request to the $http request
        * from the injected service(GuestListService)
        * @param  {String} id The Id given to the user.
        * @return {Promise}    returns $http promise
        */
       this.allGuests = function allGuests(id) {
         GuestListService.allGuests(id)
         .then(function successHandler(data){
           console.log(data);
         });
       };
  }


}());
