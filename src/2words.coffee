initialCheck = (number) ->
  return true if not number?
  return true if not isNumber number
  return true if isNaN number
  return true if tooLarge number

isNumber = (number) ->
  initNumber = +number
  typeof initNumber is 'number' or initNumber.constructor is Number

tooLarge = (number) ->
  number > 8999999999999999
hundreds = [''
  'сто',       'двести',    'триста'
  'четыреста', 'пятьсот',   'шестьсот'
  'семьсот',   'восемьсот', 'девятьсот']
tens = [''
  'десять',    'двадцать',    'тридцать'
  'сорок',     'пятьдесят',   'шестьдесят'
  'семьдесят', 'восемьдесят', 'девяносто']
units = [''
  'один',   'два',    'три'
  'четыре', 'пять',   'шесть'
  'семь',   'восемь', 'девять']
decimals = [''
  'одиннадцать',  'двенадцать',   'тринадцать'
  'четырнадцать', 'пятнадцать',   'шестнадцать'
  'семнадцать',   'восемнадцать', 'девятнадцать']
thousands = [['','','']
  ['тысяча',      'тысячи',       'тысяч']
  ['миллион',     'миллиона',     'миллионов']
  ['миллиард',    'миллиарда',    'миллиардов']
  ['триллион',    'триллиона',    'триллионов']
  ['квадриллион', 'квадриллиона', 'квадриллионов']
  ['квинтиллион', 'квинтиллиона', 'квинтиллионов']
]
getDecimals = (number, variant = false) ->
  decimal = number % 100
  return "#{decimals[decimal % 10]}" if 10 < decimal < 20
  right = decimal % 10
  left = (decimal - right) / 10
  unit = units[right]
  unit = ['', 'одна', 'две'][right] if variant and 0 < right < 3
  "#{tens[left]} #{unit}".trim()

getHundreds = (number) ->
  hundreds[Math.floor number / 100]

processInput = (number) ->
  remain = 0
  for num in [1..7]
    res = Math.floor ((number - remain) % 1000 ** num) / 1000 ** (num - 1)
    remain += res
    res

convertToText = (number, i) ->
  return '' if number is 0
  last = number % 10
  j = 0 # надо куда-то запихнуть «одна» и «две»
  j = 1 if 1 < last < 5
  j = 2 if last is 0 or last > 4 or 10 < (number % 100) < 20
  variant = i is 1
  "#{getHundreds number} #{getDecimals number, variant} #{thousands[i][j]}".trim()

toWords = (numberString) ->
  return null if initialCheck numberString
  number = +numberString
  return 'ноль' if number is 0
  numArray = processInput number
  result = (convertToText group, i for group, i in numArray)
    .reverse()
    .join ' '
    .trim()

module.exports = toWords
