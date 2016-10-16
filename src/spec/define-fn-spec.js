describe('define.fn', function() {
  beforeEach(function() {
    AppState.reset()
  })

  it('adds the function to AppState.definitions.fn', function() {
    var theFunc = function() {}
    define.fn('fribbity').as(theFunc)
    expect(AppState.definitions.fn.fribbity).toBe(theFunc)
  })
})
