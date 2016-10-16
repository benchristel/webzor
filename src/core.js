var AppState = {}
var Internal = {matchers: {}}
var define = {}
var test = {}
var should

define.matcher = function(name) {
  return {
    as: function(definition) {
      definition.matcherName = name
      AppState.definitions.matchers[name] = definition
    }
  }
}

// todo move to Internal
AppState.runTests = function() {
  AppState.definitions.tests.forEach(function(test) {
    var failures = test.failures()
    if (failures.length) {
      failures.forEach(function(failure) {
        AppState.testFailures.push(failure)
      })
    }
  })
}

AppState.setup = function() {
  AppState.definitions = {}
  AppState.definitions.fn = {}
  AppState.definitions.matchers = Object.create(Internal.matchers)
  should = Object.create(AppState.definitions.matchers)
  AppState.definitions.tests = []
  Object.seal(AppState.definitions)

  AppState.testFailures = []

  Object.seal(AppState)
}

AppState.setup()
