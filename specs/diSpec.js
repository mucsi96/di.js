/*global di*/
describe('DI module', function () {

    describe('register method', function () {
        it('should register modules', function () {
            var testModule = function () {
                return 'alma';
            };
            di.register('testModule', testModule);
            expect(di.get('testModule')).toEqual('alma');
        });
    });

    describe('get method', function () {

        it('should return the same instance if called twice without force new param', function () {
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
            instanceA = di.get('testModule');
            instanceB = di.get('testModule');
            expect(instanceA.count).toBeDefined();
            expect(instanceB.count).toBeDefined();
            expect(instanceA.count).toEqual(instanceB.count);
        });

        it('should create new instance of module if called twice with force new param', function () {
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
            instanceA = di.get('testModule', true);
            instanceB = di.get('testModule', true);
            expect(instanceA.count).toBeDefined();
            expect(instanceB.count).toBeDefined();
            expect(instanceA.count).not.toEqual(instanceB.count);
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
            instance = di.get('Narancs');
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
            instance = di.get('Narancs');
            expect(instance.getA.getName).toEqual('Alma');
            expect(instance.getA.getCitrom).toEqual('Citrom');
            expect(instance.getB).toEqual('Korte');
        });
    });

    describe('mockOver', function () {
        it('should pass all arguments to constructor', function () {
            var testModule = jasmine.createSpy();
            di.register('testModule', testModule);
            di.mockOver('testModule', 'A', 'B', 'C');
            expect(testModule).toHaveBeenCalledWith('A', 'B', 'C');

        });
    });
});