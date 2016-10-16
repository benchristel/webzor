Internal.FnTest = function(subjectName, subject, requirement) {
  var self = this
  this.expectations = []
  this.args = []

  this.failures = function() {
    var actual = subject.apply(null, self.args)

    var failures = this.expectations.map(function(expectation) {
      var failure = null
      if (!expectation.matcher(actual, expectation.expected)) {
        failure = {}
        failure.type = 'fn'
        failure.args = self.args
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
