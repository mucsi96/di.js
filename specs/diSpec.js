/*global di*/
describe('DI module', function () {

    afterEach(function () {
        di.reset();
    });

    describe('register method', function () {
        it('should register modules', function () {
            var testModule = function () {
                return undefined;
            };
            di.register('testModule', testModule);
            expect(di.getConstructor('testModule')).toEqual(testModule);
        });
    });

    it('should clear all modules on reset()', function () {
        var testModule = function () {
            return undefined;
        };
        di.register('testModule', testModule);
        expect(di.getConstructor('testModule')).toEqual(testModule);
        di.reset();
        expect(di.getConstructor('testModule')).toBeUndefined();
    });

    describe('getInstance method', function () {
        it('should create new instance of module', function () {
            var counter = 0,
                testModule = function () {
                    counter += 1;
                    return {
                        count: counter
                    };
                },
                instanceA,
                instanceB;
            di.register('testModule', testModule);
            instanceA = di.getInstance('testModule');
            instanceB = di.getInstance('testModule');
            expect(instanceA.count).toBeDefined();
            expect(instanceB.count).toBeDefined();
            expect(instanceA.count).not.toEqual(instanceB.count);
        });

        it('should pass all arguments to constructor', function () {
            var instance,
                testModule = function () {
                    var ca = arguments;
                    return {
                        getConstructorArguments: function () {
                            return ca;
                        }
                    };
                };
            di.register('testModule', testModule);
            instance = di.getInstance('testModule', 'A', 'B', 'C');
            expect(instance.getConstructorArguments()).toEqual(['A', 'B', 'C']);

        });
    });

    it('should return the same instance if singleton is asked', function () {
        var counter = 0,
            testModule = function () {
                counter += 1;
                return {
                    count: counter
                };
            },
            instanceA,
            instanceB;
        di.register('testModule', testModule);
        instanceA = di.getSingleton('testModule');
        instanceB = di.getSingleton('testModule');
        expect(instanceA.count).toBeDefined();
        expect(instanceB.count).toBeDefined();
        expect(instanceA.count).toEqual(instanceB.count);
    });

    it('should resolve dependencies', function () {
        var instance,
            alma = function () {
                return 'Alma';
            },
            korte = function () {
                return 'Korte';
            },
            narancs = function (a, b) {
                return {
                    getA: a,
                    getB: b
                };
            };
        di.register('Alma', alma);
        di.register('Korte', korte);
        di.register('Narancs', narancs, ['Alma', 'Korte']);
        instance = di.getSingleton('Narancs');
        expect(instance.getA).toEqual('Alma');
        expect(instance.getB).toEqual('Korte');
    });

    it('should resolve second level dependencies', function () {
        var instance,
            citrom = function () {
                return 'Citrom';
            },
            alma = function (g) {
                return {
                    getName: 'Alma',
                    getCitrom: g
                };
            },
            korte = function () {
                return 'Korte';
            },
            narancs = function (a, b) {
                return {
                    getA: a,
                    getB: b
                };
            };
        di.register('Narancs', narancs, ['Alma', 'Korte']);
        di.register('Citrom', citrom);
        di.register('Alma', alma, ['Citrom']);
        di.register('Korte', korte);
        instance = di.getSingleton('Narancs');
        expect(instance.getA.getName).toEqual('Alma');
        expect(instance.getA.getCitrom).toEqual('Citrom');
        expect(instance.getB).toEqual('Korte');
    });
});