(function() {
  'use strict';

  angular.module('hotelier', ['ui.router'])
  .config(viewConfig);

  viewConfig.$inject = ['$stateProvider'];

  function viewConfig($stateProvider){
    $stateProvider
    .state({
      name: 'home',
      url: '',
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
      controller: ''
    });
  }


}());
