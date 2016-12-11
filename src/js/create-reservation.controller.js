(function() {
    'use strict';

    angular.module('hotelier')
        .controller('CreateReservationController', CreateReservationController);

    CreateReservationController.$inject = [ '$state', 'CreateReservationService' ];

    /**
     * Create Reservation Constructor Function
     * @param {Service} CreateReservationService Service injected from the CreateReservationService
     * @return {void}
     */
    function CreateReservationController($state, CreateReservationService) {
        this.reservationDetails = {};

        this.addReservation = function addReservation() {
            CreateReservationService.createReservation(
              this.reservationDetails.checkinDate,
              this.reservationDetails.checkoutDate,
              this.reservationDetails.numberOfGuests,
              this.reservationDetails.guestId,
              this.reservationDetails.roomId)
              .then(function succes(data) {
                  console.log(data);
                  var urlPath = data.id;
                  $state.go('reservation', {guestId: urlPath});
              })
              .catch(function error(xhr) {
                  console.log(xhr);
              });
        };
    }
}());
