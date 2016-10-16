describe('test.fn', function() {
  beforeEach(function() {
    AppState.reset()
  })

  it('requires a function name', function() {
    expect(function() {
      test.fn()
    }).toThrow('You must pass a function name to test.fn')
  })

  it('requires the function name to refer to an existing function', function() {
    expect(function() {
      test.fn('noExisto')
    }).toThrow('You must pass a function name to test.fn. There is no function named `noExisto`.')
  })

  it('requires `that` to be called before making assertions', function() {
    define.fn('sayHello').as(function() {})

    expect(function() {
      test.fn('sayHello').returnValue(should.equal, 'hello')
    }).toThrow("test.fn('sayHello').returnValue was called with no test in progress. You must call `that` first.")
  })

  it('records a test failure', function() {
    define.fn('sayHello').as(function() {
      return 'hyuk'
    })

    test.fn('sayHello')
      .that('it returns "hello"')
      .returnValue(should.equal, 'hello')

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

  it('tests a function with arguments', function() {
    define.fn('greet').as(function(name, punctuation) {
      return 'Hello, ' + name + punctuation
    })

    test.fn('greet')
      .that('it greets Bob')
      .given('Bob', '!')
      .returnValue(should.equal, 'Hello, Bob!')

    Internal.runTests()

    expect(AppState.testFailures.length).toBe(0)
  })

  it('records a test failure for a function with arguments', function() {
    define.fn('greet').as(function(name) {
      return 'bzzt'
    })

    test.fn('greet')
      .that('it greets Bob')
      .given('Bob')
      .returnValue(should.equal, 'Hello, Bob')

    var failures = AppState.testFailures
    expect(failures.length).toBe(0)

    Internal.runTests()

    expect(failures.length).toBe(1)
    expect(failures[0].type).toBe('fn')
    expect(failures[0].subjectName).toBe('greet')
    expect(failures[0].args).toEqual(['Bob'])
    expect(failures[0].expected).toBe('Hello, Bob')
    expect(failures[0].actual).toBe('bzzt')
    expect(failures[0].matcherName).toBe('equal')
  })
})
