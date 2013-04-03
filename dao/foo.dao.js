define(function() {

	function FooDAO(value) {
		
	}

	FooDAO.prototype = {
		makeRandomValue: function FooDAO_getRandomValue() {
			// generate a random int between 0-9
			return (Math.random() * 10).foFixed(0);
		}
	};

	return FooDAO;
});