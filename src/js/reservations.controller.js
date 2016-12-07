(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ 'ReservationsService' ];

    function ReservationsController(ReservationsService) {
        console.log('hey');

        var vm = this;
        this.reservations = [];

        this.getReservations = function getReservations() {
            ReservationsService.getReservations()
                .then(function success(data) {
                    console.log(data);
                    vm.reservations = data;
                });
        };
    }

}());
