describe('define.fn', function() {
  beforeEach(function() {
    AppState.reset()
  })

  it('adds the function to AppState.definitions.fn', function() {
    var theFunc = function() {}
    define.fn('fribbity').as(theFunc)
    expect(AppState.definitions.fn.fribbity).toBe(theFunc)
  })

  it('throws an error if the function already exists', function() {
    var theFunc = function() {}
    define.fn('fribbity').as(theFunc)

    expect(function() {
      define.fn('fribbity').as(theFunc)
    }).toThrow('define.fn: There is already a defined function named `fribbity`.')
  })
})
