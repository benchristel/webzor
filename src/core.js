"use strict";

var define = {
  fn: null,
  matcher: null
}
Object.seal(define)

var test = {
  fn: null
}
Object.seal(test)

var AppState = {
  definitions: {
    fn: null,
    matchers: null,
    tests: null
  },
  reset: null,
  testFailures: null
}
Object.seal(AppState)
Object.seal(AppState.definitions)

var Internal = {
  matchers: {}
}

var should = null

AppState.reset = function() {
  AppState.definitions.fn = {}
  AppState.definitions.matchers = Object.create(Internal.matchers)
  AppState.definitions.tests = []

  should = Object.create(AppState.definitions.matchers)

  AppState.testFailures = []
}

AppState.reset()
