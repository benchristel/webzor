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
describe('define.matcher', function() {
  beforeEach(function() {
    AppState.setup()
  })

  it('adds the new matcher to the `should` object', function() {
    var matcher = function() {}
    define.matcher('beAwesome').as(matcher)
    expect(should.beAwesome).toBe(matcher)
  })

  it('adds the name of the matcher as a matcherName property of the function', function() {
    var matcher = function() {}
    define.matcher('beAwesome').as(matcher)
    expect(should.beAwesome.matcherName).toBe('beAwesome')
  })
})
describe('Internal.FnTest', function() {
  it('has a list of failures, which is empty when the expectations pass', function() {
    function sayHello() {
      return 'hello'
    }

    var test = new Internal.FnTest('sayHello', sayHello, 'it returns "hello"')
    test.expectations.push({
      matcher: AppState.definitions.matchers.equal,
      expected: 'hello'
    })

    expect(test.failures()).toEqual([])
  })

  it('has a failure when an expectation fails', function() {
    function sayHello() {
      return 'hyuk'
    }

    var test = new Internal.FnTest('sayHello', sayHello, 'it returns "hello"')
    test.expectations.push({
      matcher: AppState.definitions.matchers.equal,
      expected: 'hello'
    })

    expect(test.failures()).toEqual([{
      type: 'fn',
      subjectName: 'sayHello',
      requirement: 'it returns "hello"',
      matcherName: 'equal',
      actual: 'hyuk',
      expected: 'hello'
    }])
  })
})
describe('test.fn', function() {
  beforeEach(function() {
    AppState.setup()
  })

  it('records a test failure', function() {
    define.fn('sayHello').as(function() {
      return 'hyuk'
    })

    test.fn('sayHello')
      .that('it returns "hello"')
      .returnValue(AppState.definitions.matchers.equal, 'hello')

    expect(AppState.testFailures.length).toBe(0)

    Internal.runTests()
    var failures = AppState.testFailures

    expect(failures.length).toBe(1)
    expect(failures[0].type).toBe('fn')
    expect(failures[0].subjectName).toBe('sayHello')
    expect(failures[0].expected).toBe('hello')
    expect(failures[0].actual).toBe('hyuk')
    expect(failures[0].matcherName).toBe('equal')
  })
})
