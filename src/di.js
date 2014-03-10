/*global get*/
/**
 * Dependency injector
 * Responsibility: Handle dependency injection, provides functionality to register modules and get module instance with real dependencies or mocked ones
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
        throw new Error('Module "' + moduleName + '" is not registered');
    }

    function getConstructor(moduleName) {
        var constructor = getModule(moduleName).constructor;
        if (constructor) {
            return constructor;
        }
        throw new Error('Constructor for module "' + moduleName + '" is not registered');
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
            Factory = Function.prototype.bind.apply(constructor, args);
        return new Factory();
    }

    function getNewInstance(moduleName) {
        var constructor = getConstructor(moduleName),
            dependencies = resolveDependencies(moduleName);
        return create(constructor, dependencies);
    }

    /**
     * Return an instance of asked module. If it is asked first time, it will create new instance and return in.
     * If an instance already exists, it will return that instance back. (if forceNew is not set to true). Dependencies will be resolved automatically.
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
    function getCustomInstance(moduleName) {
        var module = getModule(moduleName),
            constructor = getConstructor(moduleName),
            args = Array.prototype.slice.call(arguments).slice(1);
        if (module.dependencies && args.length !== module.dependencies.length) {
            throw new Error('Number of dependencies passed is not correct for module "' + moduleName + '". Passed ' + args.length + '. Expected: ' + module.dependencies.length);
        }
        return constructor.apply(this, args);
    }

    return {
        register: register,
        get: get,
        getCustomInstance: getCustomInstance
    };
}());