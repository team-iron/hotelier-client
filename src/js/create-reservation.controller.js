(function() {
    'use strict';

    angular.module('hotelier')
        .controller('CreateReservationController', CreateReservationController);

    CreateReservationController.$inject = ['CreateReservationService'];

    /**
     * Create Reservation Constructor Function
     * @param {Service} CreateReservationService Service injected from the CreateReservationService
     * @return {void}
     */
    function CreateReservationController(CreateReservationService) {
        this.reservationDetails = {};

        this.addReservation = function addReservation() {
            CreateReservationService.createReservation(
              this.reservationDetails.checkinDate,
              this.reservationDetails.checkoutDate,
              this.reservationDetails.numberOfGuests,
              this.reservationDetails.guestId,
              this.reservationDetails.roomId);

        };
    }
}());
