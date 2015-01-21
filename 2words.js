function toWords(number) {
	this.number = Number(number);
	if (this.number === NaN) {return NaN};
	
  // Return zero right away 
  if (this.number === 0) return "ноль";
  
  this.numString = this.number+"";
  this.len = this.numString.length;

  // Make a string and an array
  this.groupCount = Math.floor((len - 1) / 3);
  this.numString = "00".substring(0, Math.abs(this.len-(this.groupCount+1)*3)) + this.numString;
  this.numArray = this.numString.match(/\d{3}/g);
  
  // Process all groups
  for (var i = 0; i <= this.groupCount; i++){
    var groupNum = this.numArray[i];
    this.numArray[i] = [];
    this.numArray[i][0] = Number(groupNum.match(/^\d/));
    if (groupNum.match(/\d{2}$/)[0].match(/^1[1-9]$/) !== null) {
      this.numArray[i][1] = 0;
      this.numArray[i][2] = Number(groupNum.match(/\d{2}$/));
    } else {
      this.numArray[i][1] = Number(groupNum.match(/\d/g)[1]);
      this.numArray[i][2] = Number(groupNum.match(/\d$/));
    }
  }
  this.numArray = this.numArray.reverse()

  // Words
  var hundreds = [, "сто", "двести", "триста", "четыреста", "пятьсот",
                    "шестьсот", "семьсот", "восемьсот", "девятьсот" ];
  
  var tens = [, "десять", "двадцать", "тридцать", "сорок", "пятьдесят",
                "шестьдесят", "семьдесят", "восемьдесят", "девяносто" ];
  
  var units = [, "один", "два", "три", "четыре", "пять", "шесть",
                 "семь", "восемь", "девять",, "одиннадцать", "двенадцать",
                 "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать",
                 "семнадцать", "восемнадцать", "девятнадцать" ];

   var thousands = [, [ "тысяча", "тысячи", "тысяч" ], 
                      [ "миллион", "миллиона", "миллионов" ], 
                      [ "миллиард", "миллиарда", "миллиардов" ],
                      [ "триллион", "триллиона", "триллионов" ] ];
  
  // Convert numbers to words
  function processGroupOfThree(group, groupNo){
    var groupWords = [ "", "", "", "" ];
    var declNum = Number(group[2]);
    var decl = 0;
    switch (true) {
      case declNum === 0:
        decl = 2; break;
      case Math.floor(1 / declNum) > 0:
        decl = 0; break;
      case Math.floor(4 / declNum) > 0:
        decl = 1; break;
      default:
        decl = 2;
    }
    groupWords[0] = hundreds[ group[0] ];
    groupWords[1] = tens[ group[1] ];
    groupWords[2] = units[ group[2] ];
    if (groupNo > 0) {
      groupWords[3] = thousands[groupNo][decl];
      if (groupNo == 1 && group[2] < 3) groupWords[2] = [,"одна", "две"][group[2]];
    }
    return groupWords.join(" ");
  }
  
//   Join groups
  this.words = [];
  for (var i = 0; i <= this.groupCount; i++){
    words.unshift( processGroupOfThree(this.numArray[i], i));
  }
  
//   Clear spaces and return final string
  return words
           .join(" ")
           .replace(/\s+/g, " ")
           .trim();
}