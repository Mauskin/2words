<<<<<<< Updated upstream
var toWords = function(input) {

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
  var groupCount = Math.floor((inputLength - 1) / 3);
  var someMagicMath = Math.abs(inputLength - (groupCount + 1) * 3);
  var numString = '00'.substring(0, someMagicMath) + inputString;
  var inputArray = numString.match(/\d{3}/g);

  // process before converting
  var processedArray = [];
  inputArray.forEach(function(entry) {
    var groupElement = [];
    groupElement[0] = Number(entry.match(/^\d/));
    var inTeens = entry.match(/\d{2}$/)[0].match(/^1[1-9]$/) !== null;
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
=======
var toWords = function (input) {
	
  // Initial checks
  var inputNumber = Number(input);
	if (inputNumber === NaN) return NaN;
	if (inputNumber === 0) return 'ноль';
	
	var inputString = '' + inputNumber;
  var inputLength = inputString.length;

  // Make a string and an array
  this.groupCount = Math.floor((inputLength - 1) / 3);
  var someMagicMath = Math.abs(inputLength - (this.groupCount + 1) * 3);
  this.numString = '00'.substring(0, someMagicMath) + inputString;
  this.numArray = this.numString.match(/\d{3}/g);
  
  // Process all groups
  for (var i = 0; i <= this.groupCount; i++) {
    var groupNum = this.numArray[i];
    this.numArray[i] = [];
    this.numArray[i][0] = Number(groupNum.match(/^\d/));
    
    groupNum.match(/\d{2}$/)[0].match(/^1[1-9]$/) !== null ? (
      this.numArray[i][1] = 0,
      this.numArray[i][2] = Number(groupNum.match(/\d{2}$/))
    ) : (
      this.numArray[i][1] = Number(groupNum.match(/\d/g)[1]),
      this.numArray[i][2] = Number(groupNum.match(/\d$/))
    );
  }
  
  this.numArray = this.numArray.reverse();

  // Words
	var hundreds = [, 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
                    'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
  
	var tens = [, 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
                'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  
	var units = [, 'один', 'два', 'три', 'четыре', 'пять', 'шесть',
>>>>>>> Stashed changes
                 'семь', 'восемь', 'девять',, 'одиннадцать', 'двенадцать',
                 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать',
                 'семнадцать', 'восемнадцать', 'девятнадцать'];

<<<<<<< Updated upstream
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
=======
	var thousands = [, ['тысяча', 'тысячи', 'тысяч'],
                     ['миллион', 'миллиона', 'миллионов'],
                     ['миллиард', 'миллиарда', 'миллиардов'],
                     ['триллион', 'триллиона', 'триллионов'],
                     ['квадриллион', 'квадриллиона', 'квадриллионов'],
                     ['квинтиллион', 'квинтиллиона', 'квинтиллионов']];
  
  // Convert numbers to words
  function processGroupOfThree(group, groupNo) {
    var groupWords = ['', '', '', ''];
    var declNum = Number(group[2]);
    var decl = 0;
    
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

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
=======
    
    groupWords[0] = hundreds[group[0]];
    groupWords[1] = tens[group[1]];
    groupWords[2] = units[group[2]];
    if (groupNo > 0 && Number(group.join('')) > 0) {
      groupWords[3] = thousands[groupNo][decl];
      if (groupNo == 1 && group[2] < 3) {
      	groupWords[2] = [,'одна', 'две'][group[2]];
      }
    }
    return groupWords.join(' ');
  }
  
  // Join groups
  this.words = [];
  for (var i = 0; i <= this.groupCount; i++) {
    this.words.unshift(processGroupOfThree(this.numArray[i], i));
  }
  
  // Clear spaces and return final string
  return this.words
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
>>>>>>> Stashed changes
};

module.exports = toWords;
