(function() {
    'use strict';

    angular.module('hotelier')
        .factory('ReservationsService', ReservationsService);

    ReservationsService.$inject = [ '$http' ];

    function ReservationsService($http) {
        console.log('hey');

        return {
            getReservations: getReservations
        };

        function getReservations(token) {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations',
                headers: {
                    'Authorization' : token
                }
            });
        }
    }

}());
