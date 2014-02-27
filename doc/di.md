Nano Dependency Injector
========================
di.register(modules, modules, dependent)
----------------------------------------
Register a new module using its constructor


**Parameters**

**modules**:  *oduleName {string*,  name

**modules**:  *oduleConstructor {function*,  constructor

**dependent**:  *ependencies {string[]*,  module names

di.getConstructor(module)
-------------------------
Returns asked registered module constructor


**Parameters**

**module**:  *oduleName {string*,  name

**Returns**

*function*,  modules constructor

di.reset()
----------
Resets own state to initial. Forgets every registered module. Useful for testing.


di.getInstance(module)
----------------------
Return an instance of asked module. If it is asked first time, it will create new instance and return in. If it was asked before, it will return the previous one


**Parameters**

**module**:  *oduleName {string*,  name

**Returns**

*object*,  module instance

di.getNewInstance(module, module)
---------------------------------
Return a new instance of asked module. It always creates a new instance.


**Parameters**

**module**:  *oduleName {string*,  name

**module**:  *ependency {...**,  dependencies (instances). For manual dependency resolving. Used in tests.

**Returns**

*object*,  module instance

