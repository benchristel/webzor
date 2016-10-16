test.fn = function(fname) {
  if (!fname) {
    throw 'You must pass a function name to test.fn'
  }

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
