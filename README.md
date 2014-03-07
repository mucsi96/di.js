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
Return an instance of asked module. If it is asked first time, it will create new instance and return in. If it was asked before, it will return the previous one (if forceNew is not set to true). Dependencies will be resolved automatically.


**Parameters**

**moduleName**:  *string*,  module name

**forceNew**:  *boolean*,  force creating new instance. By default it's false

**Returns**

*object*,  module instance

di.mockAround(moduleName, \[dependencies...\])
----------------------------------------------
Return a new instance of asked module by calling the constructor with given dependencies. Use for testing purposes


**Parameters**

**moduleName**:  *string*,  module name

**[dependencies...]**:  *object...*,  module dependencies (instances). For manual dependency resolving.

**Returns**

*object*,  module instance

