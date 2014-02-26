describe('DI module', function () {

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
                    return {
                        count: counter++
                    }
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
                    }
                };
            di.register('testModule', testModule);
            instance = di.getInstance('testModule', 'A', 'B', 'C');
            expect(instance.getConstructorArguments()).toEqual(['A', 'B' , 'C']);

        });
    });

    it('should return the same instance if singleton is asked', function () {
        var counter = 0,
            testModule = function () {
                return {
                    count: counter++
                }
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
});