(function() {
    'use strict';

    angular.module('hotelier')
        .factory('ReservationsService', ReservationsService);

    ReservationsService.$inject = [ '$http', 'LoginService' ];

    function ReservationsService($http, LoginService) {
        console.log('creating me');

        var token = LoginService.loginYesNo();
        console.log('reseServe', token);

        return {
            getReservations: getReservations
        };

        function getReservations() {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations',
                headers: {
                    'Authorization': token
                }
            })
            .then(function success(response) {
                console.log(response);
                return response.data;
            });
        }
    }

}());
