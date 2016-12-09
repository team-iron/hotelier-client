(function() {
    'use strict';

  angular.module('hotelier', ['ui.router'])
    .config(viewConfig);

  viewConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  /**
   * Sets states for single page application views when routing
   * @param  {Service} $stateProvider built in angular-ui-router service
   * @return {void}
   */
  function viewConfig($stateProvider, $urlRouterProvider){

     $urlRouterProvider.when('', '/');

    $stateProvider
    .state({
      name: 'home',
      url: '/',
      templateUrl:'views/home.template.html'
    })
    .state({
      name: 'staff-login',
      url: '/staff-login',
      templateUrl: 'views/staff-login.template.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .state({
      name: 'add-guest',
      url: '/add-guest',
      templateUrl: 'views/guest-form.template.html',
      controller: 'GuestListController',
      controllerAs: 'guestlist'
    })
    .state({
      name: 'reservations',
      url: '/reservations',
      templateUrl: 'views/reservations.template.html',
      controller: 'ReservationsController',
      controllerAs: 'reservations'
    })
    .state({
        name: 'available-rooms',
        url: '/available-rooms',
        templateUrl: 'views/allRooms.template.html',
        controller: 'AllRoomsController',
        controllerAs: 'allRooms'
    })
    .state({
      name: 'all-guests',
      url: '/Guests',
      templateUrl: 'views/reservations.template.html',
      controller: 'GuestListController',
      controllerAs: 'guestlist'

    })
    .state({
       name: 'create-reservation',
       url: '/create-reservation',
       templateUrl: 'views/create-reservation.template.html',
       controller: 'CreateReservationController',
       controllerAs: 'createReservation'
      });

    }
}());
