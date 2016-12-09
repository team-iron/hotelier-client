(function() {
    'use strict';

    angular.module('hotelier')
        .controller('GuestReservationController', GuestReservationController);

    GuestReservationController.$inject = [ '$stateParams', 'ReservationsService' ];

    function GuestReservationController($stateParams, ReservationsService) {

        this.guestReservation = {};

        this.getReservation =
            ReservationsService.getReservation($stateParams.guestId)
                .then(function success(reservation) {
                    return reservation;
                })
                .catch(function error(xhr) {
                    console.log(xhr);
                });
    }
}());
