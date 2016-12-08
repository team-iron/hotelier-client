
(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ 'ReservationsService' ];

    function ReservationsController( ReservationsService ) {

        var vm = this;
        this.userToken = localStorage.getItem('userToken');
        this.reservations = JSON.parse(sessionStorage.getItem('reservations')) || null;

        this.getReservations = function getReservations(token) {
            ReservationsService.getReservations(token)
                .then(function success(data) {
                    sessionStorage.setItem('reservations', JSON.stringify(data));
                    vm.reservations = data;
                    console.log(vm.reservations);
                });
        };
    }

}());
