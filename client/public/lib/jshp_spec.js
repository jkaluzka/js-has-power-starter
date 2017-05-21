/*global affix, jshp*/

// Tests
describe("JavaScriptHasPower", function() {
  beforeEach(function() {
    affix(".element $element");
  });

  it("should not return element", function() {
    var selector = '.no-item';
    var el = jshp.get(selector);

    expect(el.length).toBe(0);
  });

  it("should return element", function() {
    var selector = '.element';
    var expected = $.makeArray($(selector));
    var el = jshp.get(selector);
    expect(el.length).toBe(1);
    expect(el[0] instanceof HTMLElement).toBe(true);
    expect(el[0]).toBe(expected[0]);
  })

});
