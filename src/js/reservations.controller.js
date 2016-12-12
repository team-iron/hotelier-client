
(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ '$state', 'ReservationsService' ];

    /**
     * Constructor function for ReservationController managing reservation data
     * @param {Service} ReservationsService custom built angular service (see reservations.service.js)
     */
    function ReservationsController( $state, ReservationsService ) {

        var vm = this;

        this.reservations =
            ReservationsService.getReservations()
                .then(function success(reservations) {
                    vm.reservations = reservations;
                    return reservations;
                })
                .catch(function error(xhr) {
                    console.log(xhr);
                });

       vm.deleteCurrentReservation = function deleteCurrentReservation(reservationId) {
           $state.go('delete', {reservationId: reservationId});
       };
    }

}());
