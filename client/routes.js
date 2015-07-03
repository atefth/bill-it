angular
.module('mohona-billing')
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('/', {
        url: '/',
        templateUrl: '/views/home.html',
        controller: 'MainCtrl'
    })
    .state('orders', {
        url: 'orders/',
        templateUrl: '/views/orders/index.html',
        controller: 'OrderCtrl'
    })
    .state('newOrder', {
        url: 'orders/new',
        templateUrl: '/views/orders/edit.html',
        controller: 'OrderCtrl'
    })
    .state('viewOrder/:id', {
        url: 'orders/:id',
        templateUrl: '/views/orders/show.html',
        controller: 'OrderCtrl'
    })
    .state('editOrder', {
        url: 'orders/:id/edit',
        templateUrl: '/views/orders/edit.html',
        controller: 'OrderCtrl'
    })
    .state('clients', {
        url: 'clients/',
        templateUrl: '/views/clients/index.html',
        controller: 'ClientCtrl'
    })
    .state('newClient', {
        url: 'clients/new',
        templateUrl: '/views/clients/edit.html',
        controller: 'ClientCtrl'
    })
    .state('viewClient/:id', {
        url: 'clients/:id',
        templateUrl: '/views/clients/show.html',
        controller: 'ClientCtrl'
    })
    .state('editClient', {
        url: 'clients/:id/edit',
        templateUrl: '/views/clients/edit.html',
        controller: 'ClientCtrl'
    })
    .state('items', {
        url: 'items/',
        templateUrl: '/views/items/index.html',
        controller: 'ItemCtrl'
    })
    .state('newItem', {
        url: 'items/new',
        templateUrl: '/views/items/edit.html',
        controller: 'ItemCtrl'
    })
    .state('viewItem/:id', {
        url: 'items/:id',
        templateUrl: '/views/items/show.html',
        controller: 'ItemCtrl'
    })
    .state('editItem', {
        url: 'items/:id/edit',
        templateUrl: '/views/items/edit.html',
        controller: 'ItemCtrl'
    })
    .state('categories', {
        url: 'categories/',
        templateUrl: '/views/categories/index.html',
        controller: 'CategoryCtrl'
    })
    .state('newCategory', {
        url: 'categories/new',
        templateUrl: '/views/categories/edit.html',
        controller: 'CategoryCtrl'
    })
    .state('viewCategory/:id', {
        url: 'categories/:id',
        templateUrl: '/views/categories/show.html',
        controller: 'CategoryCtrl'
    })
    .state('editCategory', {
        url: 'categories/:id/edit',
        templateUrl: '/views/categories/edit.html',
        controller: 'CategoryCtrl'
    })
    .state('newUser', {
        url: 'users/new',
        templateUrl: '/views/users/edit.html',
        controller: 'UserCtrl'
    })
    .state('login', {
        url: 'users/login',
        templateUrl: '/views/users/edit.html',
        controller: 'UserCtrl'
    })
    .state('myOrders', {
        url: 'users/orders',
        templateUrl: '/views/orders/index.html',
        controller: 'UserCtrl'
    });

    $urlRouterProvider.otherwise('/');
}]);
