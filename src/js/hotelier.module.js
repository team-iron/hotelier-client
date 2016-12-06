(function() {
  'use strict';

  angular.module('hotelier', ['ui.router'])
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider'];

  function routerConfig() {

    $stateProvider
      .state({
        name: 'AddGuest',
        url: '/create-guest',
        templateUrl: '../views/guest-form.template.html',
        controller: 'GuestListController',
        controllerAs: 'guestlist'
      });

  }

}());
