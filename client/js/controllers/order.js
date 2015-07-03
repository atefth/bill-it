'use strict';

angular
.module('mohona-billing.controllers')
.controller('OrderCtrl', ['$scope', '$rootScope', 'Order', '$state', 'Item', 'Client', 'Entry', function($scope, $rootScope, Order, $state, Item, Client, Entry) {
    $rootScope.page = 'orders';
    $scope.orders = [];
    $scope.items = [];
    $scope.clients = [];
    $scope.order = {
        orderId: "",
        clientId: "",
        userId: "",
        amount: "",
        paidAmount: "",
        remainingAmount: "",
        totalSheet: "",
        orderedSheet: "",
        balancedSheet: "",
        created: new Date(),
        delivered: new Date(),
        status: false,
        address: "",
        entries: [{}]
    };
    function eagerLoader(index) {
        return function (category) {
            $scope.items[index].category = category;
            if ($scope.items[index].rate == '') {
                $scope.items[index].rate = category.rate;
                $scope.items[index].inherited = true;
            }
        }
    }

    function populateFields() {
        Item
        .query()
        .$promise
        .then( function (items) {
            $scope.items = items;
            for (var i = 0, len = items.length; i < len; i++) {
                var callback = eagerLoader(i);
                Item.category ( {id: items[i].id} )
                .$promise
                .then ( callback );
            }
        });
        Client
        .query()
        .$promise
        .then( function (clients) {
            $scope.clients = clients;
        });
    }

    function entryItemEagerLoader(index) {
        return function (item) {
            $scope.order.entries[index].item = item;
        };
    }

    function get() {
        Order
        .get( {id: $state.params.id} )
        .$promise
        .then( function (order) {
            $scope.order = order;
            $scope.order.date = new Date(order.date);
            $scope.order.delivered = new Date(order.delivered);
            Order
            .entries({id: order.id})
            .$promise
            .then( function (entries) {
                $scope.order.entries = entries;
                for (var i = 0, len = $scope.order.entries.length; i < len; i++) {
                    var callback = entryItemEagerLoader(i);
                    Entry.item ( {id: $scope.order.entries[i].id} )
                    .$promise
                    .then ( callback );
                }
            });
        });
    }

    function getAll() {
        Order
        .query()
        .$promise
        .then( function (orders) {
            $scope.orders = orders;
        });
    }

    function update() {
        $scope.order.updated = Date();
        $scope.order
        .$save()
        .then(function () {
            $state.go('viewOrder/:id', {id: $scope.order.id});
        });
    }

    function add() {
        var newOrder = {
            address: $scope.order.address,
            status: $scope.order.status,
            orderId: $scope.order.orderId,
            clientId: $scope.order.clientId,
            userId: $rootScope.user.id,
            amount: $scope.order.amount,
            paidAmount: $scope.order.paidAmount,
            remainingAmount: $scope.order.remainingAmount,
            totalSheet: $scope.order.totalSheet,
            orderedSheet: $scope.order.orderedSheet,
            balancedSheet: $scope.order.balancedSheet,
            created: Date(),
            updated: Date()
        };
        Order
        .create(newOrder)
        .$promise
        .then( function (order) {
            $scope.orders.push(newOrder);
            for (var i = 0, len = $scope.order.entries; i < len; i++) {
                Order
                .entries
                .create({id: order.id}, $scope.order.entries[i]);
            }
            $state.go('orders');
        });
    }

    function entryFields() {
        this.item = {};
    }

    $scope.addEntry = function () {
        $scope.order.entries.push(new entryFields());
    }

    $scope.deleteEntry = function (entry) {
        var index = $scope.order.entries.indexOf(entry);
        $scope.order.entries.splice(index, 1);
        $scope.entryIndex--;
    }

    $scope.updateTotals = function () {
        var sheets = 0;
        var amount = 0;
        for (var i = 0, len = $scope.order.entries.length; i < len; i++) {
            sheets = +$scope.order.entries[i].sheets + +sheets;
            amount = +$scope.order.entries[i].amount + +amount;
        }
        $scope.order.orderedSheet = sheets;
        $scope.order.amount = amount;
        $scope.order.remainingAmount = +$scope.order.amount - +$scope.order.paidAmount;
        $scope.order.balancedSheet = +$scope.order.totalSheet - +$scope.order.orderedSheet;
    }

    $scope.addOrUpdate = function () {
        if ($state.params.id != null) {
            update();
        } else {
            add();
        }
    }

    $scope.viewOrder = function (order) {
        $scope.order = order;
        $state.go('viewOrder/:id', {id: $scope.order.id});
    }

    $scope.destroy = function (order) {
        Order
        .deleteById({id: order.id})
        .$promise
        .then ( function () {
            var index = $scope.orders.indexOf(order);
            $scope.orders.splice(index, 1);
            $state.go('orders');
        });
    }
    if ($state.current.name == 'newOrder') {
        populateFields();
        $scope.method = 'post';
    }else if ($state.params.id != null ){
        get();
        populateFields();
        $scope.method = 'put';
    }else{
        getAll();
    }
}]);
