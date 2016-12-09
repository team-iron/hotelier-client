(function() {
    'use strict';

    angular.module('hotelier')
        .factory('CreateReservationService', CreateReservationService);

    CreateReservationService.$inject = ['$http', 'LoginService'];

    /**
     * Services' Constructor Function
     * @param {DependencyInjection} $http Injected as a dependency into the service to
     * have successful ajax calls.
     * @return {Promise} Returns an Ajax promise when completed.
     */
    function CreateReservationService($http, LoginService) {

        var token = LoginService.loginYesNo;

        return {
            createReservation: createReservation
        };

        /**
         * $http request that creates a new reservation when given the proper parameters
         * @param  {String} checkinDate    Date given when guest Checks in
         * @param  {String} checkoutDate   Date given when guest will checkout
         * @param  {String} numberOfGuests Number of guests signed up for the reservation
         * @param  {String} guestId        The guest who is reserving a rooms' id.
         * @param  {String} roomId         The Id of the room being reserved
         * @return {Promise}
         */
        function createReservation(checkinDate, checkoutDate, numberOfGuests, guestId, roomId) {
            return $http({
                url: 'https://hotelier-api-iron.herokuapp.com/api/Reservations',
                data: {
                    checkinDate: checkinDate,
                    checkoutDate: checkoutDate,
                    numberOfGuests: numberOfGuests,
                    guestId: guestId,
                    roomId: roomId
                },
                method: 'post',
                headers: {
                    'Authorization': token()
                }
                })
                .then(function returnResponse(response) {
                    console.log(response);
                })
                .catch(function handleFailure(xhr) {
                  console.log(xhr);
                });

        }
    }
}());
