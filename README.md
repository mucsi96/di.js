

<!-- Start src/di.js -->

lobal getNewInstance

## di

Simple Dependency Injector for module pattern modules. For instance creation it just executes the constructor

## register({string}, {function}, {string[]})

Register a new module using its constructor

### Params: 

* **moduleName** *{string}* modules name

* **moduleConstructor** *{function}* modules constructor

* **dependencies** *{string[]}* dependent module names

## getConstructor({string})

Returns asked registered module constructor

### Params: 

* **moduleName** *{string}* module name

## reset()

Resets own state to initial. Forgets every registered module. Useful for testing.

## getInstance({string})

Return an instance of asked module. If it is asked first time, it will create new instance and return in. If it was asked before, it will return the previous one

### Params: 

* **moduleName** *{string}* module name

## getNewInstance({string})

Return a new instance of asked module. It always creates a new instance.

### Params: 

* **moduleName** *{string}* module name

<!-- End src/di.js -->

