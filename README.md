# angular-memoize
memoization promises in angular

##usage:

```sh
bower install --save angular-memoize
```

```js
angular.module('app', ['memoize'])
  .service('AnimalsService', function ($http, cache) {
  
    var load = function (name) {
      return $http.get('animals', {params: {q: 'name='+name} })
        .then(function (response) {
          return response.data;
        })
    };
    
    return {
      load: function (name) {
        return cache(load);
      }
    }
    
  });
```
