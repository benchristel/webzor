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
