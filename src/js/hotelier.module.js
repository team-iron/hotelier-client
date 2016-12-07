(function() {
    'use strict';

    angular.module('hotelier', [ 'ui.router' ])
        .config(viewConfig);

    viewConfig.$inject = [ '$stateProvider' ];

    function viewConfig($stateProvider) {

        $stateProvider
            .state({
                name: 'staff-login',
                url: '/staff-login',
                templateUrl: 'views/staff-login.template.html',
                controller: 'LoginController',
                controllerAs: 'login'
            });
    }



}());
