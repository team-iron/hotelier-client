
(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ 'ReservationsService' ];

    /**
     * Constructor function for ReservationController managing reservation data
     * @param {Service} ReservationsService custom built angular service (see reservations.service.js)
     */
    function ReservationsController( ReservationsService ) {

        var vm = this;

        this.reservations =
            ReservationsService.getReservations()
                .then(function success(reservations) {
                    vm.reservations = reservations;
                })
                .catch(function error(xhr) {
                    console.log(xhr);
                });
    }

}());
