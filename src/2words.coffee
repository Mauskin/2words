isNumber = (number) ->
  typeof +number is 'number' or initNumber.constructor is Number

tooLarge = (number) -> number > 9007199254740992

initialCheck = (number) ->
  return true if not number?
  return true if not isNumber number
  return true if isNaN number
  return true if tooLarge number

hectotext = [''
  'сто',       'двести',    'триста'
  'четыреста', 'пятьсот',   'шестьсот'
  'семьсот',   'восемьсот', 'девятьсот']
decatext = [''
  'десять',    'двадцать',    'тридцать'
  'сорок',     'пятьдесят',   'шестьдесят'
  'семьдесят', 'восемьдесят', 'девяносто']
unitstext = [''
  'один',   'два',    'три'
  'четыре', 'пять',   'шесть'
  'семь',   'восемь', 'девять']
altDecatext = [''
  'одиннадцать',  'двенадцать',   'тринадцать'
  'четырнадцать', 'пятнадцать',   'шестнадцать'
  'семнадцать',   'восемнадцать', 'девятнадцать']
kilotext = [['', '', '']
  ['тысяча',      'тысячи',       'тысяч']
  ['миллион',     'миллиона',     'миллионов']
  ['миллиард',    'миллиарда',    'миллиардов']
  ['триллион',    'триллиона',    'триллионов']
  ['квадриллион', 'квадриллиона', 'квадриллионов']
]

processInput = (number) ->
  remain = 0
  [1..7].map (num) ->
    res = ((number - remain) % 1000 ** num) // 1000 ** (num - 1)
    remain += res
    res

deca = (number, variant = false) ->
  decimal = number % 100
  return " #{altDecatext[decimal % 10]}" if 10 < decimal < 20
  right = decimal % 10
  left = (decimal - right) / 10
  unless variant is on and 0 < right < 3
    unit = unitstext[right]
  else
    unit = ['', 'одна', 'две'][right]
  res = "#{decatext[left]} #{unit}".trim()
  if res.length > 0 then " #{res}" else ''

hecto = (number) -> hectotext[number // 100]

stringify = (number, index) ->
  return '' if number is 0
  last = number % 10
  group = switch
    when last is 0 then 2
    when last > 4 then 2
    when 10 < (number % 100) < 20 then 2
    when 1 < last < 5 then 1
    else 0
  "#{hecto number}#{deca number, index is 1} #{kilotext[index][group]}"
    .trim()

toWords = (input) ->
  return null if initialCheck input
  number = +input
  return 'ноль' if number is 0
  processInput number
    .map stringify
    .reverse()
    .join ' '
    .trim()

module.exports = toWords
