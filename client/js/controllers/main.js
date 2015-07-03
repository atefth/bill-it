'ues strict';

angular
.module('mohona-billing.controllers', [])
.controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.page = 'home';
}]);
