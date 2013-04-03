define(['bo/foo.bo'], function(FooBO) {

	// Constructor
	function FooController(id) {
		this.id = id;

		/*
		 * If a property is a reference type ({object}, [array], Date, RegExp, etc.),
		 * then you need to initialize it here as opposed to in the prototype. 
		 * If you don't do it here, then the the property will be shared across all 
		 * instances, which usually isn't what we want.
		 */
		this.referenceType = {}; // for objects/arrays

		/*
		 * Let's go ahead and get an instance of our BO here:
		 */
		this.bo = new FooBO();

		/*
		 * The exception is for methods; don't add those here, or else every object
		 * will re-create the function (performance hit). Instead, add them in the
		 * prototype.
		 */
		this.badMethod = function badMethod(){}; // no functions, though
	}

	/*
	 * You can create your prototype properties (members/methods) in several ways.
	 * 
	 * This one is probably the most recognizable:
	 */
	FooController.prototype.someMethod = function FooController_someMethod() {};


	/*
	 * You can also create all your prototype properties in one object, which is 
	 * my personal preference since it more closely resembles a class definition:
	 */
	FooController.prototype = {

		/*
		 * Please name the methods like this, so that it is easy to diagnose where
		 * the code came from in a stacktrace:
		 *
		 *     {ClassName}_{methodName}
		 */
		someMethod: function FooController_someMethod() {
			this.log('called: FooController_someMethod');
			this.bo.populateCollection();
			this.bo.renderCollection();
		},

		/*
		 * If a method is going to listen as an event-handler (click, for example),
		 * then you can also append that to the name for even more context:
		 *
		 *     {ClassName}_{methodName}_{event}
		 */
		search: function FooController_search_click() {	}
	};

	/*
	 * Another way to add methods is through horizontal re-use, which in PHP is named
	 * "traits" and in most other languages simply as "mixins".
	 *
	 * Let's say we have this mixin which defines a simple logger:
	 */
	var mixins = {
		logger: {
			log: function(s) { 
				console.log(s);
			}
		}
	};

	/*
	 * We can re-use this across multiple objects without having to copy/paste the code by
	 * assigning it as a method on the prototype.
	 *
	 * Note: Once assigned to the prototype, the method will have access to any & all other
	 * methods and properties, just as if it was declared within the object itself. In other
	 * words, you can use "this" inside of it.
	 * 
	 * Also note: To be able to take advantage of mixins effectively, the original mixins object 
	 * should be in it's own file -- I included the source above just for example.
	 *
	 * Anyways, here is how to mixin the logger:
	 */
	FooController.prototype.log = mixins.logger.log;

	/*
	 * To create static properties and methods, simply omit "prototype" from the definition,
	 * like this:
	 */
	FooController.instances = {};
	FooController.factory = function FooController_factory(id) {
		if (!FooController.instances[id]) {			
			FooController.instances[id] = new FooController(id);
			FooController.instances[id].log(id + ' lives!');
		}
		return FooController.instances[id];
	};

	return FooController;
});