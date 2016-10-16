test.fn = function(fname) {
  if (!fname) {
    throw 'You must pass a function name to test.fn'
  }

  var funcUnderTest = AppState.definitions.fn[fname]

  if (!funcUnderTest) {
    throw 'You must pass a function name to test.fn. There is no function named `' + fname + '`.'
  }
  var currentTest = null
  var args

  var testBuilder = {
    that: function(requirement) {
      currentTest = new Internal.FnTest(fname, funcUnderTest, requirement)
      AppState.definitions.tests.push(currentTest)
      return testBuilder
    },
    given: function() {
      currentTest.args = Internal.toArray(arguments)
      return testBuilder
    },
    returnValue: function(matcher, expected) {
      if (!currentTest) {
        throw "test.fn('" + fname + "').returnValue was called with no test in progress. You must call `that` first."
      }

      currentTest.expectations.push({
        matcher: matcher,
        expected: expected
      })
    }
  }

  return testBuilder;
}
