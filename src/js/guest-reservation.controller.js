(function() {
    'use strict';

    angular.module('hotelier')
        .controller('GuestReservationController', GuestReservationController);

    GuestReservationController.$inject = [ '$stateParams', 'ReservationsService' ];

    function GuestReservationController($stateParams, ReservationsService) {

        var vm = this;
        this.guestReservation = {};
        console.log('ddssds');

            ReservationsService.getReservation($stateParams.guestId)
                .then(function success(reservation) {
                    vm.guestReservation = reservation;
                })
                .catch(function error(xhr) {
                    console.log(xhr);
                });
    }
}());
