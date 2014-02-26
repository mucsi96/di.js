/*global getInstance*/
var di = (function () {
    var constructors = {},
        singletons = {},
        dependencyContainer = {};

    function register(moduleName, moduleConstructor, dependencies) {
        dependencyContainer[moduleName] = dependencies;
        constructors[moduleName] = moduleConstructor;
    }
    function getConstructor(moduleName) {
        return constructors[moduleName];
    }
    function reset() {
        constructors = {};
        singletons = {};
        dependencyContainer = {};
    }
    function getSingleton(moduleName) {
        if (singletons[moduleName]) {
            return singletons[moduleName];
        }
        singletons[moduleName] = getInstance(moduleName);
        return singletons[moduleName];
    }
    function resolveDependencies(moduleName) {
        var i,
            moduleDependencies = dependencyContainer[moduleName],
            instances = [];

        for (i = 0; moduleDependencies && i < moduleDependencies.length; i += 1) {
            instances.push(getSingleton(moduleDependencies[i]));
        }

        return instances;
    }
    function getInstance(moduleName) {
        var params,
            constructor = getConstructor(moduleName);
        Array.prototype.splice.call(arguments, 0, 1);
        params = arguments;
        if (constructor) {
            if (params.length > 0) {
                return constructor.apply(this, params);
            }
            return constructor.apply(this, resolveDependencies(moduleName));
        }
        throw "Object[" + moduleName + "] is not registered";
    }


    return {
        register: register,
        getConstructor: getConstructor,
        reset: reset,
        getInstance: getInstance,
        getSingleton: getSingleton
    };
}());