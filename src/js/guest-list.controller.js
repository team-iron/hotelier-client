(function() {
  'use strict';
  angular.module('hotelier')
    .controller('GuestListController', GuestListController);

  GuestListController.$inject = ['GuestListService'];

  function GuestListController(GuestListService) {
     this.inputValues = {};

     this.createGuest = function createGuest() {
       console.log('it worked');

       GuestListService.postGuest(this.inputValues.fullname, this.inputValues.email, this.inputValues.phone);

     }
  };


}());
