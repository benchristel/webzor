var AppState = {}
var Internal = {matchers: {}}
var define = {}
var test = {}
var should

AppState.reset = function() {
  AppState.definitions = {}
  AppState.definitions.fn = {}
  AppState.definitions.matchers = Object.create(Internal.matchers)
  should = Object.create(AppState.definitions.matchers)
  AppState.definitions.tests = []
  Object.seal(AppState.definitions)

  AppState.testFailures = []

  Object.seal(AppState)
}

AppState.reset()
