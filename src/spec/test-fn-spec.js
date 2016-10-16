describe('test.fn', function() {
  beforeEach(function() {
    AppState.reset()
  })

  it('requires a function name', function() {
    expect(function() {
      test.fn()
    }).toThrow('You must pass a function name to test.fn')
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
})
