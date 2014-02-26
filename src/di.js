var di = (function () {
    var modules = {},
        singletons = {},
        register = function (moduleName, moduleConstructor) {
            return modules[moduleName] = moduleConstructor;
        },
        getConstructor = function (moduleName) {
            return modules[moduleName];
        },
        reset = function () {
            modules = {};
        },
        getInstance = function (moduleName) {
            var params,
                constructor = getConstructor(moduleName);
            Array.prototype.splice.call(arguments, 0, 1);
            params = arguments;
            if (constructor) {
                return constructor.apply(this, params);
            }
        },
        getSingleton = function (moduleName) {
            if (singletons[moduleName]) {
                return singletons[moduleName];
            } else {
                singletons[moduleName] = getInstance(moduleName);
                return singletons[moduleName];
            }
        };

    return {
        register: register,
        getConstructor: getConstructor,
        reset: reset,
        getInstance: getInstance,
        getSingleton: getSingleton
    };
})();