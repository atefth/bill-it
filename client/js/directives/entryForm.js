angular
.module('mohona-billing')
.directive('entryForm', ['Item', 'Entry', function (Item, Entry) {
    return {
        restrict: 'A',
        templateUrl: 'views/entries/form.html',
        transclude: false,
        scope: {
            entry: '=',
            items: '=',
            deleteEntry: '&',
            updateTotals: '&'
        },
        link: function (scope, element, attrs) {
            scope.$watch('entry', function (newVal) {
            });
            scope.$watch('items', function (newVal) {
            });
            function updateArea () {
                scope.entry.area = 1.0 * scope.entry.x * scope.entry.y;
            }
            scope.updateCost = function () {
                if (scope.entry.item != null) {
                    if (scope.entry.item.calculation == 1) {
                        updateArea();
                        scope.entry.amount = scope.entry.area * scope.rate * scope.entry.sheets;
                    }else if (scope.entry.item.calculation == 2) {
                        scope.entry.amount = scope.entry.ups * scope.rate * scope.entry.sheets;
                    }else{
                    }
                    scope.entry.rps = scope.entry.amount / scope.entry.sheets;
                    scope.updateTotals();
                }
            }
            scope.updateRate = function () {
                scope.entry.item = scope.selectedItem;
                var rate = scope.selectedItem.rate;
                scope.rate = rate;
                scope.entry.inherited = true;
                scope.updateCost();
            }
            scope.customRate = function () {
                scope.entry.rate = scope.rate;
                scope.entry.inherited = false;
                scope.updateCost();
            }
            scope.getItem = function () {
                console.log(scope);
                Entry
                .item({id: scope.entry.itemId})
                .$promise
                .then( function (item) {
                    console.log(item);
                    return item;
                })
            }
        }
    };

} ])
