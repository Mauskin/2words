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
getDecimals = (number) ->
  decimal = number % 100
  return "#{decimals[decimal % 10]}" if 10 < decimal < 20
  right = decimal % 10
  left = (decimal - right) / 10
  "#{tens[left]} #{units[right]}".trim()

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
  j = 2 #TODO: добавить склонения
  "#{getHundreds number} #{getDecimals number} #{thousands[i][j]}".trim()

toWords = (numberString) ->
  return null if initialCheck numberString
  number = +numberString
  return 'ноль' if number is 0
  numArray = processInput number
  result = []
  result.push convertToText group, i for group, i in numArray
  return result
    .reverse()
    .join ' '
    .trim()

module.exports = toWords
