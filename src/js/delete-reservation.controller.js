(function() {
    'use strict';

    angular.module('hotelier')
        .controller('DeleteReservationController', DeleteReservationController);

    DeleteReservationController.$inject = [ '$stateParams', 'ReservationsService' ];

    function DeleteReservationController($stateParams, ReservationsService) {

        var vm = this;
        this.errorMessage = null;

            ReservationsService.deleteReservations($stateParams.reservationId)
                .then(function success() {
                })
                .catch(function error(xhr) {
                    vm.errorMessage = xhr.data.error.message;
                });
    }
}());
