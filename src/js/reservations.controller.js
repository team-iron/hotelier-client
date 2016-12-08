(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ 'LoginService', 'ReservationsService' ];

    function ReservationsController(ReservationsService, LoginService) {
        console.log('hey');

        var vm = this;
        this.userToken = LoginService.userToken;
        this.reservations = [];

        this.getReservations = function getReservations(token) {
            ReservationsService.getReservations(token)
                .then(function success(data) {
                    console.log(data);
                    vm.reservations = data;
                });
        };
    }

}());
