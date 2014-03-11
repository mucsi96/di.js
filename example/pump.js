/*global di*/
(function () {
    var Pump = function (heater) {
        function pump() {
            heater.on();
            console.log('Pumping...');
        }

        return {
            pump: pump
        };
    };

    di.register('pump', Pump, ['heater']);
}());