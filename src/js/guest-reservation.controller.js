(function() {
    'use strict';

    angular.module('hotelier')
        .controller('GuestReservationController', GuestReservationController);

    GuestReservationController.$inject = [ '$stateParams', 'ReservationsService' ];

    function GuestReservationController($stateParams, ReservationsService) {

        var vm = this;
        this.guestReservation = {};
        this.errorMessage = null;

            ReservationsService.getReservation($stateParams.guestId)
                .then(function success(reservation) {
                    vm.guestReservation = reservation;
                })
                .catch(function error(xhr) {
                    vm.errorMessage = xhr.data.error.message;
                });
    }
}());
