function toWords(input) {

  // Initial checks
  var inputNumber = Number(input);
  var noNumber = isNaN(inputNumber);
  var toLarge = inputNumber > 8999999999999999;
  if (noNumber || toLarge) return null;
  if (inputNumber === 0) return 'ноль';

  // set string
  var inputString = '' + inputNumber;
  var inputLength = inputString.length;

  // set an array of 3-digit groups
  var groupCount = Math.ceil(inputLength/3);
  var someMagicMath = Math.abs(inputLength - groupCount * 3);
  var numString = '00'.substring(0, someMagicMath) + inputString;
  var inputArray = numString.match(/\d{3}/g);

  // process before converting
  var processedArray = [];
  inputArray.forEach(function(entry) {
    var groupElement = [];
    groupElement[0] = Number(entry.match(/^\d/));
    var inTeens = entry.match(/1[1-9]$/) !== null;
    if (inTeens) {
      groupElement[1] = 0;
      groupElement[2] = Number(entry.match(/\d{2}$/));
    } else {
      groupElement[1] = Number(entry.match(/\d/g)[1]);
      groupElement[2] = Number(entry.match(/\d$/));
    }
    processedArray.unshift(groupElement);
  });

  // Words storage
  var hundreds = [, 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
                    'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

  var tens = [, 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
                'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];

  var units = [, 'один', 'два', 'три', 'четыре', 'пять', 'шесть',
                 'семь', 'восемь', 'девять',, 'одиннадцать', 'двенадцать',
                 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать',
                 'семнадцать', 'восемнадцать', 'девятнадцать'];

  // TODO: Rewrite to use root large numbers. Example: 'миллион' + ending[i]
  var thousands = [,
    ['тысяча', 'тысячи', 'тысяч'],
    ['миллион', 'миллиона', 'миллионов'],
    ['миллиард', 'миллиарда', 'миллиардов'],
    ['триллион', 'триллиона', 'триллионов'],
    ['квадриллион', 'квадриллиона', 'квадриллионов'],
    ['квинтиллион', 'квинтиллиона', 'квинтиллионов']
  ];

  // Convert numbers to words
  var words = [];
  processedArray.forEach(function (entry, index) {
    var wordsForThisEntry = [];
    var decimal = Number(entry[2]);

    // find out decimal group for the ending
    var decimalGroup = 2;
    switch (true) {
      case decimal === 0:
        decimalGroup = 2; break;
      case Math.floor(1 / decimal) > 0:
        decimalGroup = 0; break;
      case Math.floor(4 / decimal) > 0:
        decimalGroup = 1; break;
      default:
        decimalGroup = 2;
    }

    // lookup words
    wordsForThisEntry[0] = hundreds[entry[0]];
    wordsForThisEntry[1] = tens[entry[1]];
    wordsForThisEntry[2] = units[decimal];

    // add names of large numbers
    var isLargeNumber = index > 0 && Number(entry.join('')) > 0;
    if (isLargeNumber) {
      wordsForThisEntry[3] = thousands[index][decimalGroup];

      // Check if the first of second thousand (hate it)
      if (index == 1 && decimal < 3) {
        wordsForThisEntry[2] = [,'одна', 'две'][decimal];
      }
    }
    words.unshift(wordsForThisEntry.join(' '));
  });

  // Clear unnecessary spaces and return final string
  var cleanString = words
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleanString;
};
