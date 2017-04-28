app.filter('escape', escape);

function escape() {
	return function(html) {
	  return angular.element('<pre/>').text(html).html();
	};
}