define(['jquery', '../vo/foo.vo', '../view/foo.view', '../dao/foo.dao'], function($, FooVO, FooView, FooDAO) {

	// Constructor
	function FooBO() {
		// lazy-load the DAO just for example
		this.dao = null;

		this.view = new FooView();

		/*
		 * Use this when you want a numerically-indexed array.
		 *
		 * In PHP, it'd look like: array(1, 2, 'foo', etc.)
		 */
		this.array = [];

		/*
		 * Use this when you want a string-keyed array.
		 *
		 * In PHP, it'd look like: array('a' => 1, 'b' => 2, etc.)
		 */
		this.hash = {};
	}

	FooBO.prototype = {
		populateCollection: function FooBO_populateCollection() {
			var dao = this.getDao();

			var	vo = new FooVO();
			vo.setValue(dao.makeRandomValue());
			this.array.push(vo);

			vo = new FooVO();
			vo.setValue(dao.makeRandomValue());
			this.array.push(vo);

			vo = new FooVO();
			vo.setValue(dao.makeRandomValue());
			this.array.push(vo);
		},

		renderCollection: function FooBO_renderCollection() {
			this.getView().render(this.array);
		},

		getView: function FooBO_getView() {
			return this.view;
		},
		setView: function FooBO_setView(view) {
			return this.view = view;
		},

		getDao: function FooBO_getDao() {
			if (!this.dao) {
				this.setDao(new FooDAO());
			}
			return this.dao;
		},
		setDao: function FooBO_setDao(dao) {
			return this.dao = dao;
		}
	};

	return FooBO;
});