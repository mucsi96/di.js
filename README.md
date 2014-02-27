Nano Dependency Injector
========================
di.register(moduleName, moduleConstructor, dependencies)
--------------------------------------------------------
Register a new module using its constructor


**Parameters**

**moduleName**:  *string*,  modules name

**moduleConstructor**:  *function*,  modules constructor

**dependencies**:  *string[]*,  dependent module names

di.getConstructor(moduleName)
-----------------------------
Returns asked registered module constructor


**Parameters**

**moduleName**:  *string*,  module name

**Returns**

*function*,  modules constructor

di.reset()
----------
Resets own state to initial. Forgets every registered module. Useful for testing.


di.getInstance(moduleName)
--------------------------
Return an instance of asked module. If it is asked first time, it will create new instance and return in. If it was asked before, it will return the previous one


**Parameters**

**moduleName**:  *string*,  module name

**Returns**

*object*,  module instance

di.getNewInstance(moduleName, optional)
---------------------------------------
Return a new instance of asked module. It always creates a new instance.


**Parameters**

**moduleName**:  *string*,  module name

**optional**:  *...**,  dependency module dependencies (instances). For manual dependency resolving. Used in tests.

**Returns**

*object*,  module instance

