define(function() {

	function FooVO() {

	}

	FooVO.prototype = {
		value: 0,
		setValue: function FooVO_getValue(value) {
			this.value = value;
		},
		getValue: function FooVO_getValue() {
			return this.value;
		}
	};

	return FooVO;
});