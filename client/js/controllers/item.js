'ues strict';

angular
.module('mohona-billing.controllers')
.controller('ItemCtrl', ['$scope', '$rootScope', '$state', 'Item', 'Category', '$q', function($scope, $rootScope, $state, Item, Category, $q) {
    $rootScope.page = 'items';
    $scope.items = [];
    $scope.categories = [];
    $scope.item = {
        id: "",
        name: "",
        desciption: "",
        code: "",
        rate: "",
        categoryId: "",
        category: {}
    };
    Category
    .query()
    .$promise
    .then( function (data) {
        $scope.categories = data;
    });
    function eagerLoader(index) {
        return function (category) {
            $scope.items[index].category = category;
            if ($scope.items[index].rate == '') {
                $scope.items[index].rate = category.rate;
                $scope.items[index].inherited = true;
            }
        }
    }

    function get() {
        Item
        .get({id: $state.params.id})
        .$promise
        .then( function (item) {
            $scope.item = item;
        });
    }

    function getAll() {
        Item
        .query()
        .$promise
        .then( function (items) {
            $scope.items = items;
            for (var i = 0, len = $scope.items.length; i < len; i++) {
                var callback = eagerLoader(i);
                Item.category ( {id: $scope.items[i].id} )
                .$promise
                .then ( callback );
            }
        });
    }

    function update() {
        $scope.item.updated = new Date();
        $scope.item
        .$save()
        .then(function () {
            $state.go('viewItem/:id', {id: $scope.item.id});
        });
    }

    function add() {
        var newItem = {
            name: $scope.item.name, 
            description: $scope.item.description, 
            code: $scope.item.code, 
            rate: $scope.item.rate,
            created: new Date(),
            updated: new Date(),
            categoryId: $scope.item.categoryId
        };
        Item
        .create(newItem)
        .$promise
        .then( function () {
            $scope.items.push(newItem);
            $state.go('items');
        });
    }

    $scope.addOrUpdate = function () {
        if ($scope.item.id != '') {
            update();
        } else {
            add();
        }
    }

    $scope.viewItem = function (item) {
        $scope.item = item;
        $state.go('viewItem/:id', {id: $scope.item.id});
    }

    $scope.destroy = function (item) {
        Item
        .deleteById({id: item.id})
        .$promise
        .then ( function () {
            var index = $scope.items.indexOf(item);
            $scope.items.splice(index, 1); 
            $state.go('items');
        });
    }

    if ($state.current.name == 'newItem') {
        $scope.method = 'post';
    }else if ($state.params.id != null ){
        $scope.method = 'put';
        get();
    }else{
        getAll();
    }

}]);

