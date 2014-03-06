Nano Dependency Injector
========================
di.register(moduleName, moduleConstructor, dependencies)
--------------------------------------------------------
Register a new module using its constructor


**Parameters**

**moduleName**:  *string*,  modules name

**moduleConstructor**:  *function*,  modules constructor

**dependencies**:  *string[]*,  dependent module names

di.get(moduleName, forceNew)
----------------------------
Return an instance of asked module. If it is asked first time, it will create new instance and return in. If it was asked before, it will return the previous one (if forceNew is not set to true)


**Parameters**

**moduleName**:  *string*,  module name

**forceNew**:  *boolean*,  force creating new instance. By default it's false

**Returns**

*object*,  module instance

di.mockOver(moduleName, \[dependencies...\])
--------------------------------------------
Return a new instance of asked module. It always creates a new instance.


**Parameters**

**moduleName**:  *string*,  module name

**[dependencies...]**:  *object...*,  module dependencies (instances). For manual dependency resolving. Used in tests.

**Returns**

*object*,  module instance

