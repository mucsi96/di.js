/*global get*/
/**
 * Dependency injector
 * Responsibility: Handle dependency injection, provides functionality to register modules and get module instance with real dependencies or mocked ones
 */
var di = (function () {
    var modules = {};

    function register(moduleName, fn, dependencies) {
        modules[moduleName] = {
            orignFn: fn,
            dependencies: dependencies || []
        };
        return true;
    }

    function getModule(moduleName) {
        var module = modules[moduleName];
        if (module) {
            return module;
        }
        throw new Error('Module "' + moduleName + '" is not registered');
    }

    function resolveDependencies(moduleName, dependencies) {
        var i,
            args = [],
            module = getModule(moduleName),
            len = dependencies.length;

        for(i = 0; i < len; i += 1){
            args.push(get(dependencies[i]));
        }
        return module.orignFn.apply(module.orignFn, args);
    }



    function get(moduleName, forceNew) {
        var module = getModule(moduleName);
        if (!forceNew && module.fn) {
            return module.fn;
        }
        module.fn = resolveDependencies(moduleName, module.dependencies);
        return module.fn;
    }

    function getCustomInstance(moduleName) {
        var module = getModule(moduleName),
            args = Array.prototype.slice.call(arguments, 1);

        if(module.dependencies && module.dependencies.length !== args.length){
            throw new Error('Number of dependencies passed is not correct for module "' + moduleName + '". Passed ' + args.length + '. Expected: ' + module.dependencies.length);  
        }
        return module.orignFn.apply(module.orignFn, args);
    }

    return {
        /**
         * Register a new module using its constructor
         * @param {string} moduleName modules name
         * @param {function} moduleConstructor  modules constructor
         * @param {string[]} dependencies dependent module names
         */
        register: register,
        /**
         * Return an instance of asked module. If it is asked first time, it will create new instance and return in.
         * If an instance already exists, it will return that instance unless forceNew is set to true. Dependencies will be resolved automatically.
         * @param {string} moduleName module name
         * @param {boolean} [forceNew=false] force creating new instance.
         * @returns {object} module instance
         */
        get: get,
        /**
         * Return a new instance of asked module by calling the constructor with given dependencies. Use for testing purposes
         * @param {string} moduleName module name
         * @param {object...} [dependencies...] module dependencies (instances). For manual dependency resolving.
         * @returns {object} module instance
         */
        getCustomInstance: getCustomInstance
    };
}());