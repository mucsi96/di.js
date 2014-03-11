/*global di*/
(function () {
    var CoffeeMaker = function (heater, pump) {

        function brew() {
            pump.pump();
            heater.on();
            console.log('Brewing...');
        }
        return {
            brew: brew
        };
    };

    di.register('coffee-maker', CoffeeMaker, ['heater', 'pump']);
}());