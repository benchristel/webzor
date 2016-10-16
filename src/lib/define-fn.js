define.fn = function(name) {
  var builder = {
    as: function(definition) {
      AppState.definitions.fn[name] = definition
      return builder
    }
  }
  return builder
}
