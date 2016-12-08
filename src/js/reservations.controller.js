
(function() {
    'use strict';

    angular.module('hotelier')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = [ 'ReservationsService' ];

    function ReservationsController( ReservationsService ) {

        console.log('resCONT');

        var vm = this;
        this.reservations = JSON.parse(sessionStorage.getItem('reservations')) ||
            ReservationsService.getReservations()
                .then(function success(data) {
                    sessionStorage.setItem('reservations', JSON.stringify(data));
                    vm.reservations = data;
                    console.log(vm.reservations);
                });
    }

}());
