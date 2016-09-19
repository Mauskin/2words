toWords = require '../2words'
checkRow = (row) ->
  for number, text of row
    expect toWords number
      .toBe(text)

describe 'initial checks', ->

  it 'should null if given null', ->
    iNull = toWords null
    expect iNull
      .toBeNull()

  it 'should null if given undefined', ->
    iUnd = toWords undefined
    expect iUnd
      .toBeNull()

  it 'should null if not a number', ->
    text = toWords 'hello'
    expect text
      .toBeNull()

  it 'should null if too large', ->
    hugeNumber = toWords 9999999999999999
    expect hugeNumber
      .toBeNull()

describe 'Convertion tests', ->
  it 'should return correct text on numbers for 1 to 20', ->
    checkRow
      0: 'ноль'
      1: 'один'
      2: 'два'
      3: 'три'
      4: 'четыре'
      5: 'пять'
      6: 'шесть'
      7: 'семь'
      8: 'восемь'
      9: 'девять'
      10: 'десять'
      11: 'одиннадцать'
      12: 'двенадцать'
      13: 'тринадцать'
      14: 'четырнадцать'
      15: 'пятнадцать'
      16: 'шестнадцать'
      17: 'семнадцать'
      18: 'восемнадцать'
      19: 'девятнадцать'
      20: 'двадцать'
  it 'should return just names of hundreds', ->
    checkRow
      100: 'сто'
      200: 'двести'
      300: 'триста'
      400: 'четыреста'
      500: 'пятьсот'
      600: 'шестьсот'
      700: 'семьсот'
      800: 'восемьсот'
      900: 'девятьсот'
  it 'should return correct text for different numbers from 100 to 999', ->
    checkRow
      111: 'сто одиннадцать'
      205: 'двести пять'
      325: 'триста двадцать пять'
      563: 'пятьсот шестьдесят три'
      999: 'девятьсот девяносто девять'
  it 'should return correct text for different numbers from 1000 to 9999999', ->
    checkRow
      222001: 'двести двадцать две тысячи один'
      410000: 'четыреста десять тысяч'
