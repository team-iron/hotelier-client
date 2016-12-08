(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ 'LoginService', 'ReservationsService' ];

    function ReservationsController( LoginService, ReservationsService ) {
        console.log('hey');

        var vm = this;
        this.userToken = LoginService.loginToken;
        this.reservations = null;

        this.getReservations = function getReservations(token) {
            ReservationsService.getReservations(token)
                .then(function success(response) {
                    console.log('reserve', response.data);
                    vm.reservations = response.data;
                });
        };
    }

}());
