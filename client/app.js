angular
.module('mohona-billing',
    ['ui.router', 'ui.bootstrap', 'ui.date', 'lbServices', 'mohona-billing.controllers'])
.config(['$httpProvider', 'LoopBackResourceProvider', function($httpProvider, LoopBackResourceProvider) {
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');
    LoopBackResourceProvider.setUrlBase('http://billit.softbotsystems.com/api');
}])
.run(['$rootScope', 'User', '$state', function ($rootScope, User, $state) {
    if (User.isAuthenticated()) {
        $rootScope.isAuthenticated = true;
        $rootScope.user = User.getCachedCurrent();
    };
    $rootScope.logout = function () {
        User.logout();
        $rootScope.isAuthenticated = false;
        $state.go('/');
    }
}]);
