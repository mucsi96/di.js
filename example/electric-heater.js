/*global di*/
(function () {
    var ElectricHeater = function () {
        function on() {
            console.log('Turning on electric heater...');
        }

        function off() {
            console.log('Turning off electric heater...');
        }

        return {
            on: on,
            off: off
        };
    };

    di.register('heater', ElectricHeater);
}());