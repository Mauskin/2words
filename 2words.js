var BETWEEN_TEN_AND_TWENTY, HUNDREDS, KILOS, TENS, UNITS, breakByThree, convertGroup, initialCheck, isNumber, printHundredFrom, printTenFrom, toWords, tooLarge;

isNumber = function(number) {
  return typeof +number === 'number' || initNumber.constructor === Number;
};

tooLarge = function(number) {
  return number > 9007199254740992;
};

initialCheck = function(number) {
  if (number == null) {
    return true;
  }
  if (!isNumber(number)) {
    return true;
  }
  if (isNaN(number)) {
    return true;
  }
  if (tooLarge(number)) {
    return true;
  }
};

HUNDREDS = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

TENS = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];

UNITS = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];

BETWEEN_TEN_AND_TWENTY = ['', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];

KILOS = [['', '', ''], ['тысяча', 'тысячи', 'тысяч'], ['миллион', 'миллиона', 'миллионов'], ['миллиард', 'миллиарда', 'миллиардов'], ['триллион', 'триллиона', 'триллионов'], ['квадриллион', 'квадриллиона', 'квадриллионов']];

breakByThree = function(number) {
  var remaining;
  remaining = 0;
  return [1, 2, 3, 4, 5, 6].map(function(num) {
    var res;
    res = Math.floor(((number - remaining) % Math.pow(1000, num)) / (Math.pow(1000, num - 1)));
    remaining += res;
    return res;
  });
};

printHundredFrom = function(number) {
  return HUNDREDS[Math.floor(number / 100)];
};

printTenFrom = function(number, variant) {
  var decimal, leftPart, res, rightPart, unit;
  if (variant == null) {
    variant = false;
  }
  decimal = number % 100;
  if ((10 < decimal && decimal < 20)) {
    return " " + BETWEEN_TEN_AND_TWENTY[decimal % 10];
  }
  rightPart = decimal % 10;
  if (variant === true && (0 < rightPart && rightPart < 3)) {
    unit = ['', 'одна', 'две'][rightPart];
  } else {
    unit = UNITS[rightPart];
  }
  leftPart = Math.floor((decimal - rightPart) / 10);
  res = (TENS[leftPart] + " " + unit).trim();
  if (res.length > 0) {
    return " " + res;
  } else {
    return '';
  }
};

convertGroup = function(group, index) {
  var form, last;
  if (group === 0) {
    return '';
  }
  last = group % 10;
  form = (function() {
    var ref;
    switch (false) {
      case !(last === 0 || last > 4):
        return 2;
      case !((10 < (ref = group % 100) && ref < 20)):
        return 2;
      case !((1 < last && last < 5)):
        return 1;
      default:
        return 0;
    }
  })();
  return ("" + (printHundredFrom(group)) + (printTenFrom(group, index === 1)) + " " + KILOS[index][form]).trim();
};

toWords = function(input) {
  var number;
  if (initialCheck(input)) {
    return null;
  }
  number = +input;
  if (number === 0) {
    return 'ноль';
  }
  return breakByThree(number).map(convertGroup).reverse().join(' ').trim();
};

module.exports = toWords;
