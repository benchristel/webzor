"use strict";

/**
 * define provides an API for defining functions, matchers,
 * and other application-level entities.
 */
var define = {
  fn: null,
  matcher: null
}
Object.seal(define)

/**
 * test provides an API for testing application entities.
 */
var test = {
  fn: null
}
Object.seal(test)

/**
 * AppState holds the definitions of application entities
 * and other application state. API subject to change, but
 * may assist in debugging.
 */
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

/**
 * properties on the Internal object are subject to change,
 * but may assist application developers in debugging.
 */
var Internal = {
  matchers: {}
}

/**
 * should is the stable API for accessing matchers.
 * Currently an alias for AppState.definitions.matchers.
 */
var should = null

AppState.reset = function() {
  AppState.definitions.fn = {}
  AppState.definitions.matchers = Object.create(Internal.matchers)
  AppState.definitions.tests = []

  should = Object.create(AppState.definitions.matchers)

  AppState.testFailures = []
}

AppState.reset()
