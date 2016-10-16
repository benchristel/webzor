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

Internal.runTests = function() {
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
define.fn = function(name) {
  var builder = {
    as: function(definition) {
      AppState.definitions.fn[name] = definition
      return builder
    }
  }
  return builder
}
Internal.FnTest = function(subjectName, subject, requirement) {
  this.expectations = []

  this.failures = function() {
    var actual = subject()

    var failures = this.expectations.map(function(expectation) {
      var failure = null
      if (!expectation.matcher(actual, expectation.expected)) {
        failure = {}
        failure.type = 'fn'
        failure.subjectName = subjectName
        failure.requirement = requirement
        failure.matcherName = expectation.matcher.matcherName
        failure.actual = actual
        failure.expected = expectation.expected
      }
      return failure
    }).filter(Internal.truthy)

    return failures
  }
}
Internal.truthy = function(thing) {
  return !!thing
}
Internal.matchers.equal = function(a, b) {
  return a === b
}
Internal.matchers.equal.matcherName = 'equal'
test.fn = function(fname) {
  var funcUnderTest = AppState.definitions.fn[fname]
  var currentTest = null

  var testBuilder = {
    that: function(requirement) {
      currentTest = new Internal.FnTest(fname, funcUnderTest, requirement)
      AppState.definitions.tests.push(currentTest)
      return testBuilder
    },
    returnValue: function(matcher, expected) {
      currentTest.expectations.push({
        matcher: matcher,
        expected: expected
      })
    }
  }

  return testBuilder;
}
