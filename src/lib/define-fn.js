define.fn = function(name) {
  return {
    as: function(definition) {
      AppState.definitions.fn[name] = definition
    }
  }
}
