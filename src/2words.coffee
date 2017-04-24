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
  'семьсот',   'восемьсот', 'девятьсот'
]

TENS = [''
  'десять',    'двадцать',    'тридцать'
  'сорок',     'пятьдесят',   'шестьдесят'
  'семьдесят', 'восемьдесят', 'девяносто'
]

UNITS = [''
  'один',   'два',    'три'
  'четыре', 'пять',   'шесть'
  'семь',   'восемь', 'девять'
]

BETWEEN_TEN_AND_TWENTY = [''
  'одиннадцать',  'двенадцать',   'тринадцать'
  'четырнадцать', 'пятнадцать',   'шестнадцать'
  'семнадцать',   'восемнадцать', 'девятнадцать'
]

KILOS = [
  ['', '', '']
  ['тысяча',      'тысячи',       'тысяч']
  ['миллион',     'миллиона',     'миллионов']
  ['миллиард',    'миллиарда',    'миллиардов']
  ['триллион',    'триллиона',    'триллионов']
  ['квадриллион', 'квадриллиона', 'квадриллионов']
]

breakByThree = (number) ->
  remaining = 0
  [1..6].map (num) ->
    res = ((number - remaining) % 1000 ** num) // 1000 ** (num - 1)
    remaining += res
    res

printHundredFrom = (number) -> HUNDREDS[number // 100]

printTenFrom = (number, variant = false) ->
  decimal = number % 100
  return " #{BETWEEN_TEN_AND_TWENTY[decimal % 10]}" if 10 < decimal < 20

  rightPart = decimal % 10

  if variant is on and 0 < rightPart < 3
    unit = ['', 'одна', 'две'][rightPart] # thousands are feminine in Russian
  else
    unit = UNITS[rightPart]

  leftPart = (decimal - rightPart) // 10
  res = "#{TENS[leftPart]} #{unit}".trim()
  if res.length > 0 then " #{res}" else ''

convertGroup = (group, index) ->
  return '' if group is 0
  last = group % 10

  # there are two forms of plurals
  form = switch
    when last is 0 or last > 4 then 2
    when 10 < (group % 100) < 20 then 2
    when 1 < last < 5 then 1
    else 0
  "#{printHundredFrom group}#{printTenFrom group, index is 1} #{KILOS[index][form]}"
    .trim()

toWords = (input) ->
  return null if initialCheck input
  number = +input
  return 'ноль' if number is 0
  breakByThree number
    .map convertGroup
    .reverse()
    .join ' '
    .trim()

module.exports = toWords
