(function() {
    'use strict';

    angular.module('hotelier')
        .controller('CreateReservationController', CreateReservationController);

    CreateReservationController.$inject = ['CreateReservationService'];

    function CreateReservationController(CreateReservationService) {
        this.reservationDetails = {};

        this.addReservation = function addReservation() {
            CreateReservationService.createReservation(
                this.ReservationDetails.checkinDate,
                this.ReservationDetails.checkoutDate,
                this.ReservationDetails.numberOfGuests,
                this.ReservationDetails.guestId,
                this.ReservationDetails.roomId
            );
        };
    }
}());
