(function() {
  'use strict';
  angular.module('hotelier')
    .controller('GuestListController', GuestListController);

  GuestListController.$inject = ['GuestListService'];

  /**
   * Guest List constructor function calling the functions from the service into its
   * local scope to pass onto the html.
   * @param {Service} GuestListService Controllers injected service
   */
  function GuestListController(GuestListService) {
     this.inputValues = {};

     this.createGuest = function createGuest() {
       console.log('it worked');

       GuestListService.postGuest(this.inputValues.fullName, this.inputValues.email, this.inputValues.phone);

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
     };
  }


}());
