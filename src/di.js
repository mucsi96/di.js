/*global get*/
/**
 * @title Nano Dependency Injector
 * @module di
 */
var di = (function () {
    var modules = {};

    /**
     * Register a new module using its constructor
     * @param {string} moduleName modules name
     * @param {function} moduleConstructor  modules constructor
     * @param {string[]} dependencies dependent module names
     */
    function register(moduleName, moduleConstructor, dependencies) {
        modules[moduleName] = {
            constructor: moduleConstructor,
            dependencies: dependencies
        };
    }

    function getModule(moduleName) {
        var module = modules[moduleName];
        if (module) {
            return module;
        }
        throw new Error("Module[" + moduleName + "] is not registered");
    }

    function getConstructor(moduleName) {
        var constructor = getModule(moduleName).constructor;
        if (constructor) {
            return constructor;
        }
        throw new Error("Constructor for module[" + moduleName + "] is not registered");
    }

    function resolveDependencies(moduleName) {
        var i,
            moduleDependencies = getModule(moduleName).dependencies,
            instances = [],
            length = moduleDependencies ? moduleDependencies.length : 0;

        for (i = 0; i < length; i += 1) {
            instances.push(get(moduleDependencies[i]));
        }

        return instances;
    }

    function create(constructor, argArray) {
        var args = [null].concat(argArray),
            Factory = constructor.bind.apply(constructor, args);
        return new Factory();
    }

    function getNewInstance(moduleName) {
        var constructor = getConstructor(moduleName),
            dependencies = resolveDependencies(moduleName);
        return create(constructor, dependencies);
    }

    /**
     * Return an instance of asked module. If it is asked first time, it will create new instance and return in. If it was asked before, it will return the previous one (if forceNew is not set to true). Dependencies will be resolved automatically.
     * @param {string} moduleName module name
     * @param {boolean} forceNew force creating new instance. By default it's false
     * @returns {object} module instance
     */
    function get(moduleName, forceNew) {
        var module = getModule(moduleName);
        if (!forceNew && module.instance) {
            return module.instance;
        }
        module.instance = getNewInstance(moduleName);
        return module.instance;
    }



    /**
     * Return a new instance of asked module by calling the constructor with given dependencies. Use for testing purposes
     * @param {string} moduleName module name
     * @param {object...} [dependencies...] module dependencies (instances). For manual dependency resolving.
     * @returns {object} module instance
     */
    function mockAround(moduleName) {
        var constructor = getConstructor(moduleName);
        Array.prototype.splice.call(arguments, 0, 1);
        return constructor.apply(this, arguments);
    }

    return {
        register: register,
        get: get,
        mockAround: mockAround
    };
}());