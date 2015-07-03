'ues strict';

angular
.module('mohona-billing.controllers')
.controller('CategoryCtrl', ['$scope', '$rootScope', '$state', 'Category', function($scope, $rootScope, $state, Category, $location) {
    $rootScope.page = 'categories';
    $scope.categories = Category.query();
    $scope.category = {
        id: "",
        name: "",
        desciption: "",
        calculation: "",
        rate: ""
    };
    function getAll() {
        Category
        .query()
        .$promise
        .then( function (categories) {
            $scope.categories = categories;
        });
    }
    function update() {
        $scope.category.updated = new Date();
        $scope.category
        .$save()
        .then(function () {
            $state.go('viewCategory/:id', {id: $scope.category.id});
        });
    }
    function add() {
        Category
        .create({name: $scope.category.name, 
                description: $scope.category.description, 
                calculation: $scope.category.calculation, 
                rate: $scope.category.rate
        })
        .$promise
        .then( function () {
            $scope.categories.push($scope.category);
            $state.go('categories');
        });
    }
    $scope.addOrUpdate = function () {
        if ($scope.category.id != '') {
            update();
        } else {
            add();
        }
    }
    $scope.destroy = function (category) {
        Category
        .deleteById({id: category.id})
        .$promise
        .then ( function () {
            var index = $scope.categories.indexOf(category);
            $scope.categories.splice(index, 1); 
            $state.go('categories');
        });
    }
    $scope.viewCategory = function (category) {
        $scope.category = category;
        $state.go('viewCategory/:id', {id: $scope.category.id});
    }
    $scope.viewItem = function (item) {
        $state.go('viewItem/:id', {id: item.id});
    }
    if ($state.current.name == 'newCategory') {
        $scope.method = 'post';
    }else if ($state.params.id != null ){
        Category
        .get({id: $state.params.id}) 
        .$promise
        .then( function (category) {
            $scope.category = category;
            $scope.category.since = new Date($scope.category.since);
            Category
            .items( {id: $scope.category.id} )
            .$promise
            .then( function (items) {
                $scope.category.items = items;
            });
        });
        $scope.method = 'put';
    }else{
        getAll();
    }
}]);
