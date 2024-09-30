# `URLRewriterInterceptor`

Zmienia `url` żądania zgodnie ze skonfigurowanymi wyrażeniami regularnymi.

    REWRITES = []

    class URLRewriterInterceptor

      constructor: (@rewrites) ->

      request: (config) =>
        for [regex, result] in @rewrites
          url = config.url
          if regex.test url
            config.url = url.replace regex, result
            return config
        return config

    class URLRewriterInterceptorProvider

      addRule: (regex, result) ->
        unless _.isRegExp(regex)
          throw new Error("`regex` argument should be a regular expression")
        unless _.isString(result)
          throw new Error("`result` argument should be a string")
        REWRITES.push [regex, result]

      $get: ->
        new URLRewriterInterceptor(REWRITES)

    URLRewriterInterceptorProvider

    (angular.module '<%= package.name %>').provider 'URLRewriterInterceptor', URLRewriterInterceptorProvider
