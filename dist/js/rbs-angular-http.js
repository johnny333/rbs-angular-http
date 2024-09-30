(function() {
  angular.module('rbs-angular-http', ['ngResource', 'rbs-angular-core']);

}).call(this);

(function() {
  var REWRITES, URLRewriterInterceptor, URLRewriterInterceptorProvider,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  REWRITES = [];

  URLRewriterInterceptor = (function() {
    function URLRewriterInterceptor(rewrites) {
      this.rewrites = rewrites;
      this.request = bind(this.request, this);
    }

    URLRewriterInterceptor.prototype.request = function(config) {
      var i, len, ref, ref1, regex, result, url;
      ref = this.rewrites;
      for (i = 0, len = ref.length; i < len; i++) {
        ref1 = ref[i], regex = ref1[0], result = ref1[1];
        url = config.url;
        if (regex.test(url)) {
          config.url = url.replace(regex, result);
          return config;
        }
      }
      return config;
    };

    return URLRewriterInterceptor;

  })();

  URLRewriterInterceptorProvider = (function() {
    function URLRewriterInterceptorProvider() {}

    URLRewriterInterceptorProvider.prototype.addRule = function(regex, result) {
      if (!_.isRegExp(regex)) {
        throw new Error("`regex` argument should be a regular expression");
      }
      if (!_.isString(result)) {
        throw new Error("`result` argument should be a string");
      }
      return REWRITES.push([regex, result]);
    };

    URLRewriterInterceptorProvider.prototype.$get = function() {
      return new URLRewriterInterceptor(REWRITES);
    };

    return URLRewriterInterceptorProvider;

  })();

  URLRewriterInterceptorProvider;

  (angular.module('rbs-angular-http')).provider('URLRewriterInterceptor', URLRewriterInterceptorProvider);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  (angular.module('rbs-angular-http')).factory('CacheInterceptor', [
    '$log', '$q', function($log, $q) {
      var CacheInterceptor;
      CacheInterceptor = (function() {
        function CacheInterceptor() {
          var cache1;
          cache1 = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          this.cache = cache1;
          this.responseError = bind(this.responseError, this);
          this.response = bind(this.response, this);
          this.$flush = bind(this.$flush, this);
        }

        CacheInterceptor.prototype.$flush = function() {
          var cache, i, len, ref, results;
          ref = this.cache || [];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            cache = ref[i];
            $log.debug('Flushing cache: ', cache.info().id);
            results.push(cache.removeAll());
          }
          return results;
        };

        CacheInterceptor.prototype.response = function(response) {
          this.$flush();
          return response.resource;
        };

        CacheInterceptor.prototype.responseError = function(error) {
          this.$flush();
          return $q.reject(error);
        };

        return CacheInterceptor;

      })();
      return function() {
        var caches;
        caches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(CacheInterceptor, caches, function(){});
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=rbs-angular-http.js.map
