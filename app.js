/*
 * This code can be anywhere -- most likely in a static 
 * (namespaced) object that is globally available.
 */
require(['controller/foo.controller'], function(FooController) {

	var id = 'test',
		foo = FooController.factory('test');

	foo.someMethod();

	/*
	 * Don't have to use a factory though...
	 */
//	foo = new FooController(id);
//	foo.someMethod();

});