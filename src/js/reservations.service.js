(function() {
    'use strict';

    angular.module('hotelier')
        .factory('ReservationsService', ReservationsService);

    ReservationsService.$inject = [ '$http', 'LoginService' ];

    function ReservationsService($http, LoginService) {

        var token = LoginService.loginYesNo;

        return {
            getReservations: getReservations
        };

        /**
         * Send http request for hotelier reservations data and transforms
         * data response to only include reservations array
         * @return {Promise} Callback promises able to transform and mitigate http response
         */
        function getReservations() {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations',
                headers: {
                    'Authorization': token()
                }
            })
            .then(function success(response) {
                return response.data;
            });
        }
    }

}());
