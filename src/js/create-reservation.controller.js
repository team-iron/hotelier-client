(function() {
    'use strict';

    angular.module('hotelier')
        .controller('CreateReservationController', CreateReservationController);

    CreateReservationController.$inject = [ '$state', 'CreateReservationService' ];

    /**
     * Create Reservation Constructor Function
     * @param {Service} CreateReservationService Service injected from the CreateReservationService
     * @return {void}
     */
    function CreateReservationController($state, CreateReservationService) {
        var vm = this;
        this.reservationDetails = {};
        this.errorMessage = {};

        this.addReservation = function addReservation() {
            CreateReservationService.createReservation(
              this.reservationDetails.checkinDate,
              this.reservationDetails.checkoutDate,
              this.reservationDetails.numberOfGuests,
              this.reservationDetails.guestId,
              this.reservationDetails.roomId)
              .then(function succes(data) {
                  var urlPath = data.id;
                  $state.go('reservation', {guestId: urlPath});
              })
              .catch(function error(xhr) {
                  console.log(xhr);
                  if (xhr.data.error.status > 400 && xhr.data.error.status < 501) {
                      vm.errorMessage.statusResponse = 'Reservation information incorrect.  Roooms cannot be reserved when double booked, over max capacity, and or without guests.';
                  } else {
                      vm.errorMessage.statusResponse = 'Try again soon. Our system is down.';
                  }
              });
        };
    }
}());
