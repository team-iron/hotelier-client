(function() {
  'use strict';

  angular.module('hotelier', ['ui.router'])
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider'];

  function routerConfig($stateProvider){
    $stateProvider
      .state({
        name: 'home',
        url: '',
      });
  }

}());
