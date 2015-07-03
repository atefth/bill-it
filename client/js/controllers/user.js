'use strict';

angular
.module('mohona-billing.controllers')
.controller('UserCtrl', ['$scope', 'User', '$location', '$rootScope', '$state', 'Order', function($scope, User, $location, $rootScope, $state, Order) {
    $rootScope.page = 'users';
    $scope.user = {
        email: "",
        username: "",
        password: ""
    };
    function add() {
        User
        .create({email: $scope.email,
            username: $scope.username,
            password: $scope.password
        })
        .$promise
        .then( function () {
            login();
        });
    }
    $scope.registerOrLogin = function () {
        if ($state.current.name == 'newUser') {
            add();
        } else {
            login();
        }
    }
    function login() {
        $scope.credentials = {username: $scope.username, password: $scope.password};
        $scope.loginResult = User.login($scope.credentials,
            function(res) {
                $rootScope.user = User.getCachedCurrent();
                $rootScope.isAuthenticated = User.isAuthenticated();
                $state.go('/');
            }, function(res) {
                console.log(res);
            });
    }

    if ($state.current.name == 'newUser') {
        $scope.legend = 'Register';
    }else if($state.current.name == 'login'){
        $scope.legend = 'Login';
    }else{
        $scope.orders = [];
        Order
        .query()
        .$promise
        .then(function (data) {
            data.forEach(function(element, index){
                if (element.userId == $rootScope.user.id) {
                    $scope.orders.push(element);
                };
            });
        })
    };
}]);
