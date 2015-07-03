'ues strict';

angular
.module('mohona-billing.controllers')
.controller('ClientCtrl', ['$scope', '$rootScope', '$state', 'Client', function($scope, $rootScope, $state, Client, $location) {
    $rootScope.page = 'clients';
    $scope.clients = Client.query();
    $scope.client = {
        id: "",
        name: "",
        company: "",
        address: "",
        mobile: "",
        since: ""
    };
    function update() {
        $scope.client.updated = new Date();
        $scope.client
        .$save()
        .then(function () {
            $state.go('viewClient/:id', {id: $scope.client.id});
        });
    }
    function add() {
        Client
        .create({name: $scope.client.name, 
                company: $scope.client.company, 
                address: $scope.client.address, 
                email: $scope.client.email, 
                mobile: $scope.client.mobile, 
                since: new Date($scope.client.since),
                created: new Date(),
                updated: new Date()})
                .$promise
                .then( function () {
                    $scope.clients.push($scope.client);
                    $state.go('clients');
                });
    }
    $scope.addOrUpdate = function () {
        if ($scope.client.id != '') {
            update();
        } else {
            add();
        }
    }
    $scope.destroy = function (client) {
        Client
        .deleteById({id: client.id})
        .$promise
        .then ( function () {
            var index = $scope.clients.indexOf(client);
            $scope.clients.splice(index, 1); 
            $state.go('clients');
        });
    }
    if ($state.current.name == 'newClient') {
        $scope.method = 'post';
    }else if ($state.params.id != null ){
        $scope.client = Client
        .get({id: $state.params.id}, function () {
            $scope.client.since = new Date($scope.client.since);
        });
        $scope.method = 'put';
    }
}]);
