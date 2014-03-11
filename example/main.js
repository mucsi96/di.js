/*global di*/
(function () {
    console.log('--------------[MAIN]-----------------');
    var coffeeMaker = di.get('coffee-maker');
    coffeeMaker.brew();
}());