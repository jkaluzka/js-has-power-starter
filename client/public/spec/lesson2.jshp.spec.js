/*global affix, selector*/

describe('JavaScriptHasPower - Lesson 2', function() {
  'use strict';
  beforeEach(function() {
    affix('.element #id-element input[class="awesome"] input[type="coolName"] button[name="btn"]');
  });

  afterEach(function() {
    $('.element').remove();
  });

  it('should set css property on an element', function() {
    var selector = '.element';
    var expected = $.makeArray($(selector))

    var element = jshp.get(selector)[0];
    jshp.css(element, 'width', '100px');
    jshp.css(element, 'height', '10px');
    jshp.css(element, 'border-radius', '50%');

    expect($(element).css('width')).toBe('100px');
    expect($(element).css('height')).toBe('10px');
    expect($(element).css('border-radius')).toBe('50%');
  });

  it('should set multiple css properties on an element', function() {
    var selector = '.element';
    var expected = $.makeArray($(selector))

    var element = jshp.get(selector)[0];
    jshp.css(element, {
      'width':'100px',
      'height':'10px',
      'border-radius': '50%'
    });

    expect($(element).css('width')).toBe('100px');
    expect($(element).css('height')).toBe('10px');
    expect($(element).css('border-radius')).toBe('50%');
  });

  it('should return css property of an element', function() {
    var selector = '.element';
    var expected = $(selector)
    var element = jshp.get(selector)[0];

    expected.css('display', 'none');

    expect(jshp.css(element, 'display')).toBe('none');
  });
});

