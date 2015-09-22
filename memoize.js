;(function () {

	angular
		.module('memoize', [])
		.factory('cache', cache);

		cache.$inject = ['$q'];

		function cache ($q) {
			return function (promise) {
				return function () {
					var args = Array.prototype.slice.call(arguments);
					var argsLength = args.length;

					var key = '';
					while (argsLength--) {
						var current = args[argsLength];
						key += (typeof current === 'object') ?
							JSON.stringify(current) : current;
					}

					promise.memoize = promise.memoize || {};
					return (key in promise.memoize) ?
						$q.when(promise.memoize[key]) : 
						promise.apply(this, args).then(function (result) {
							return promise.memoize[key] = result;
						});
				}
			}
		}


})();