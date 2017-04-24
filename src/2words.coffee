isNumber = (number) ->
  typeof +number is 'number' or initNumber.constructor is Number

tooLarge = (number) -> number > 9007199254740992

initialCheck = (number) ->
  return true if not number?
  return true if not isNumber number
  return true if isNaN number
  return true if tooLarge number

HUNDREDS = [''
  'сто',       'двести',    'триста'
  'четыреста', 'пятьсот',   'шестьсот'
  'семьсот',   'восемьсот', 'девятьсот']
TENS = [''
  'десять',    'двадцать',    'тридцать'
  'сорок',     'пятьдесят',   'шестьдесят'
  'семьдесят', 'восемьдесят', 'девяносто']
UNITS = [''
  'один',   'два',    'три'
  'четыре', 'пять',   'шесть'
  'семь',   'восемь', 'девять']
MORE_THEN_TEN_LESS_THEN_TWENTY = [''
  'одиннадцать',  'двенадцать',   'тринадцать'
  'четырнадцать', 'пятнадцать',   'шестнадцать'
  'семнадцать',   'восемнадцать', 'девятнадцать']
KILOS = [['', '', '']
  ['тысяча',      'тысячи',       'тысяч']
  ['миллион',     'миллиона',     'миллионов']
  ['миллиард',    'миллиарда',    'миллиардов']
  ['триллион',    'триллиона',    'триллионов']
  ['квадриллион', 'квадриллиона', 'квадриллионов']
]

# break the number to groups of three digits
breakByThree = (number) ->
  remaining = 0
  [1..6].map (num) ->
    res = ((number - remaining) % 1000 ** num) // 1000 ** (num - 1)
    remaining += res
    res

printHundredFrom = (number) -> HUNDREDS[number // 100]

printTenFrom = (number, variant = false) ->
  decimal = number % 100
  moreThenTenLessThenTwenty = 10 < decimal < 20
  return " #{MORE_THEN_TEN_LESS_THEN_TWENTY[decimal % 10]}" if moreThenTenLessThenTwenty
  rightPart = decimal % 10

  # thousands are feminine in Russian
  unless variant is on and 0 < rightPart < 3
    unit = UNITS[rightPart]
  else
    unit = ['', 'одна', 'две'][rightPart]

  leftPart = (decimal - rightPart) // 10
  res = "#{TENS[leftPart]} #{unit}".trim()
  if res.length > 0 then " #{res}" else ''

stringify = (number, index) ->
  return '' if number is 0
  last = number % 10
  group = switch
    when last is 0 then 2
    when last > 4 then 2
    when 10 < (number % 100) < 20 then 2
    when 1 < last < 5 then 1
    else 0
  "#{printHundredFrom number}#{printTenFrom number, index is 1} #{KILOS[index][group]}"
    .trim()

toWords = (input) ->
  return null if initialCheck input
  number = +input
  return 'ноль' if number is 0
  breakByThree number # get array of groups of three digits
    .map stringify    # stringify each group
    .reverse()        # fix order
    .join ' '         # add space between them
    .trim()           # remove excess

module.exports = toWords
