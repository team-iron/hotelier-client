(function() {
    'use strict';

    angular.module('hotelier')
        .factory('ReservationsService', ReservationsService);

    ReservationsService.$inject = [ '$http' ];

    function ReservationsService() {
        console.log('hey');
    }

}());
