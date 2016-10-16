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
