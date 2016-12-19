(function() {
    'use strict';

    angular.module('hotelier')
        .factory('ReservationsService', ReservationsService);

    ReservationsService.$inject = [ '$http', 'LoginService' ];

    function ReservationsService($http, LoginService) {

        return {

            getReservations: getReservations,
            getReservation: getReservation,
            deleteReservations: deleteReservations

        };

        /**
         * Send http request for hotelier reservations data and transforms
         * data response to only include reservations array
         * @return {Promise} Callback promises able to transform and mitigate http response
         */
        function getReservations() {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations',
                params: {
                    filter: {"order": "number ASC"}
                },
                headers: {
                    'Authorization': LoginService.loginYesNo()
                }
            })
            .then(function success(response) {
                return response.data;
            });
        }


        function getReservation(id) {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations/' + id,
                headers: {
                    'Authorization': LoginService.loginYesNo()
                }
            })
            .then(function success(response) {
                return response.data;
            });
        }

      function deleteReservations(reservationId) {
        console.log('in the service');
          return $http({
              url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations/' + reservationId,
              method: 'delete',
              headers: {
                  'Authorization': LoginService.loginYesNo()
              }
          });
        }

    }


}());
