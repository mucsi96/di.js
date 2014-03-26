/*global di*/
describe('DI module', function () {

    describe('register method', function () {
        it('should register modules', function () {
            var instance,
                testModule = function () {
                    return {alma: 'alma'};
                };
            di.register('testModule', testModule);
            instance = di.get('testModule');
            expect(instance.alma).toEqual('alma');
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
                    return {name: 'Alma'};
                },
                korte = function () {
                    return {name: 'Korte'};
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
            expect(instance.getA.name).toEqual('Alma');
            expect(instance.getB.name).toEqual('Korte');
        });

        it('should resolve second level dependencies', function () {
            var instance,
                citrom = function () {
                    return {name: 'Citrom'};
                },
                alma = function (g) {
                    return {
                        getName: 'Alma',
                        getCitrom: g
                    };
                },
                korte = function () {
                    return {name: 'Korte'};
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
            expect(instance.getA.getCitrom.name).toEqual('Citrom');
            expect(instance.getB.name).toEqual('Korte');
        });

        it('should create new instances using new keyword', function () {
            var instance,
                alma = function () {
                    return undefined;
                };
            alma.prototype.fa = function () {
                return 'almafa';
            };
            di.register('Alma', alma);
            instance = di.get('Alma');
            expect(instance).toBeDefined();
            expect(instance.fa()).toEqual('almafa');
        });
    });

    describe('getCustomInstance', function () {
        it('should pass all arguments to constructor', function () {
            var testModule = jasmine.createSpy();
            di.register('testModule', testModule);
            di.getCustomInstance('testModule', 'A', 'B', 'C');
            expect(testModule).toHaveBeenCalledWith('A', 'B', 'C');
        });

        it('should not resolve dependencies automatically', function () {
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
            instance = di.getCustomInstance('Narancs', 'citrom', 'barack');
            expect(instance.getA).toEqual('citrom');
            expect(instance.getB).toEqual('barack');
        });

        it('should throw exception if dependency is missing', function () {
            var alma = function () {
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
            expect(function () {
                di.getCustomInstance('Narancs', alma);
            }).toThrowError('Number of dependencies passed is not correct for module "Narancs". Passed 1. Expected: 2');
        });

        it('should create new instances using new keyword', function () {
            var instance,
                alma = function () {
                    return undefined;
                };
            alma.prototype.fa = function () {
                return 'almafa';
            };
            di.register('Alma', alma);
            instance = di.getCustomInstance('Alma');
            expect(instance).toBeDefined();
            expect(instance.fa()).toEqual('almafa');
        });
    });
});