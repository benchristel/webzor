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
