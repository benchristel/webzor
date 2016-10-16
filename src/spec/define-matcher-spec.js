describe('define.matcher', function() {
  beforeEach(function() {
    AppState.reset()
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
