(function() {
    'use strict';

    angular.module('hotelier')
        .factory('ReservationsService', ReservationsService);

    ReservationsService.$inject = [ '$http' ];

    function ReservationsService($http) {
        console.log('hey service');

        return {
            getReservations: getReservations
        };

        function getReservations(token) {
            console.log(token);
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations',
                headers: {
                    'Authorization': token
                }
            });
        }
    }

}());
