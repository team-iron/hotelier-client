(function() {
    'use strict';

    angular.module('hotelier')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

    function LoginService($http){
        return {
            login: login,
            createNewStaffLogin: createNewStaffLogin
        };

        function login(email, password) {
            return $http({
                url : 'https://hotelier-api-iron.herokuapp.com/api/Staffs/login',
                method: 'post',
                data: {
                    'email': email,
                    'password' : password
                },
                headers: {
                    'Content-type': 'application/json'
                }
            });
        }

        function createNewStaffLogin(email, password, fullName) {
            return $http({
                url : 'https://hotelier-api-iron.herokuapp.com/api/Staffs',
                method: 'post',
                data: {
                    'email': email,
                    'password' : password,
                    'fullName' : fullName
                },
                headers: {
                    'Content-type': 'application/json'
                }
            });
        }
    }
}());
