define(function(require) {

	var SortHelper = {

		compare: function(properyName, order)
		{
			var orderInt = order === "asc" ? 1 : -1;
			return function(a, b)
			{
				var comparison = (a.get(properyName) > b.get(properyName)) ? 1 : ((a.get(properyName) < b.get(properyName)) ? -1 : 0);
				return orderInt*comparison;
			}
		}
  	};

	return SortHelper;
});