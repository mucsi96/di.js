/*global di*/
(function () {
    console.log('--------------[TEST]-----------------');
    var mockHeater = {
            on: function () {
                console.log('Turning on mock heater...');
            },
            off: function () {
                console.log('Turning off mock heater...');
            }
        },
        mockPump = {
            pump: function () {
                console.log('Mock pump is pumping...');
            }
        },
        coffeeMaker = di.getCustomInstance('coffee-maker', mockHeater, mockPump);
    coffeeMaker.brew();
}());