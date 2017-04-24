var altDecatext, deca, decatext, hecto, hectotext, initialCheck, isNumber, kilotext, processInput, stringify, toWords, tooLarge, unitstext;

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

hectotext = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

decatext = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];

unitstext = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];

altDecatext = ['', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];

kilotext = [['', '', ''], ['тысяча', 'тысячи', 'тысяч'], ['миллион', 'миллиона', 'миллионов'], ['миллиард', 'миллиарда', 'миллиардов'], ['триллион', 'триллиона', 'триллионов'], ['квадриллион', 'квадриллиона', 'квадриллионов']];

processInput = function(number) {
  var remain;
  remain = 0;
  return [1, 2, 3, 4, 5, 6, 7].map(function(num) {
    var res;
    res = Math.floor(((number - remain) % Math.pow(1000, num)) / Math.pow(1000, num - 1));
    remain += res;
    return res;
  });
};

deca = function(number, variant) {
  var decimal, left, res, right, unit;
  if (variant == null) {
    variant = false;
  }
  decimal = number % 100;
  if ((10 < decimal && decimal < 20)) {
    return " " + altDecatext[decimal % 10];
  }
  right = decimal % 10;
  left = (decimal - right) / 10;
  if (!(variant === true && (0 < right && right < 3))) {
    unit = unitstext[right];
  } else {
    unit = ['', 'одна', 'две'][right];
  }
  res = (decatext[left] + " " + unit).trim();
  if (res.length > 0) {
    return " " + res;
  } else {
    return '';
  }
};

hecto = function(number) {
  return hectotext[Math.floor(number / 100)];
};

stringify = function(number, index) {
  var group, last;
  if (number === 0) {
    return '';
  }
  last = number % 10;
  group = (function() {
    var ref;
    switch (false) {
      case last !== 0:
        return 2;
      case !(last > 4):
        return 2;
      case !((10 < (ref = number % 100) && ref < 20)):
        return 2;
      case !((1 < last && last < 5)):
        return 1;
      default:
        return 0;
    }
  })();
  return ("" + (hecto(number)) + (deca(number, index === 1)) + " " + kilotext[index][group]).trim();
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
  return processInput(number).map(stringify).reverse().join(' ').trim();
};

module.exports = toWords;
