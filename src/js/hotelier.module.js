(function() {
  'use strict';

  angular.module('hotelier', ['ui.router'])
    .config(viewConfig);

  routerConfig.$inject = ['$stateProvider'];

  function routerConfig($stateProvider){
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
      });
    }
}());
