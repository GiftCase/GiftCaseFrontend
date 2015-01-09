define(function(require) {

	var SortHelper = {

		compare: function(properyName, order)
		{
			var orderInt = order === "asc" ? 1 : -1;
			return function(a, b)
			{
				console.log("Order " + order);
				console.log("PropertyName " + properyName);
				console.log("Compare " + a.get(properyName) + " and " + b.get(properyName));
				var comparison = (a.get(properyName) > b.get(properyName)) ? 1 : ((a.get(properyName) < b.get(properyName)) ? -1 : 0);
				console.log("Result " + (orderInt*comparison));
				return orderInt*comparison;
			}
		}
  	};

	return SortHelper;
});