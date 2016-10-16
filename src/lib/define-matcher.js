define.matcher = function(name) {
  return {
    as: function(definition) {
      definition.matcherName = name
      AppState.definitions.matchers[name] = definition
    }
  }
}
