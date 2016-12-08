(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ 'LoginService', 'ReservationsService' ];

    function ReservationsController( LoginService, ReservationsService ) {

        var vm = this;
        this.userToken = LoginService.loginToken;
        this.reservations = null;

        this.getReservations = function getReservations(token) {
            ReservationsService.getReservations(token)
                .then(function success(data) {
                    vm.reservations = data;
                    console.log(vm.reservations);
                });
        };
    }

}());
