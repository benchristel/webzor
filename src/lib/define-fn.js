define.fn = function(name) {
  return {
    as: function(definition) {
      if (AppState.definitions.fn[name]) {
        throw 'define.fn: There is already a defined function named `' + name + '`.'
      }
      AppState.definitions.fn[name] = definition
    }
  }
}
