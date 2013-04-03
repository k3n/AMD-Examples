define(['jquery'], function($) {

	function FooView() {

	}

	FooView.prototype = {
		render: function FooView_render(data) {
			$.each(data, function(i, vo) {
				console.log('VO #%s value = %s', i, vo.getValue());
			});
		}
	};

	return FooView;
});