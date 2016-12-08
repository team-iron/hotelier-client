(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ 'LoginService', 'ReservationsService' ];

    function ReservationsController( LoginService, ReservationsService ) {

        var vm = this;
        this.userToken = LoginService.loginToken();
        this.reservations = JSON.parse(sessionStorage.getItem('reservations')) || null;

        this.getReservations = function getReservations(token) {
            ReservationsService.getReservations(token)
                .then(function success(data) {
                    vm.reservations = data;
                    sessionStorage.setItem('reservations', JSON.stringify(vm.reservations));
                    console.log(vm.reservations);
                })
                .catch(function error(xhr) {
                    console.log(xhr);
                });
        };
    }

}());
