# `CacheInterceptor`

Czyści przekazane `$cacheFactory`.`Cache` po zakończenu żądania.

    (angular.module '<%= package.name %>').factory 'CacheInterceptor', [
      '$log'
      '$q'
      ($log, $q) ->

        class CacheInterceptor

          constructor: (@cache...) ->

          $flush: () =>
            for cache in (@cache or [])
              $log.debug 'Flushing cache: ', cache.info().id
              cache.removeAll()

          response: (response) =>
            @$flush()
            response.resource

          responseError: (error) =>
            @$flush()
            $q.reject error

        (caches...) -> new CacheInterceptor(caches...)
    ]
