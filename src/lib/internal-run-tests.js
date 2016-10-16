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
