// Debug start
var max = 999;
var mLen = (max+"").length;
for (var i = 0; i <= max; i++) debug( "      ".substr(1, mLen - (i+"").length) + i + ": " + toWords(i) + "." );
// Debug end

function toWords(num) {
	
	// Return zero right away 
	if (num === 0) return "ноль";
	
	var _this = this;
	
	// Clear non numbers
	this.numString = (num+"").match(/\d/ig).join("");
	
	if ( !(this.numString.length > 0) ) return NaN;

	var len = this.numString.length;

	var groupCount = Math.floor( (len - 1) / 3 );

	var numArray = [];
			
	for (var i = 0 ; i <= groupCount ; i++ ){
	
		var groupLength = 3;
	
		if ( ( len - ( 3 * i ) ) < 3 ) { groupLength = len - ( i * 3 ); }
	
		var groupString = numString.substr( - ( i * 3 + groupLength), groupLength );
	
		numArray[i] = ("00" + groupString).substr(-3);

	}
	
	var units       = [, "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять",
						 "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать" ];

	var tens        = [,, "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто" ];

	var hundreds    = [, "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот" ];

 	var thousands = [ [ "тысяча",   "тысячи",    "тысяч"      ], 
 				 	  [  "миллион",  "миллиона",  "миллионов"  ], 
 					  [ "миллиард", "миллиарда", "миллиардов" ],
 					  [ "триллион", "триллиона", "триллионов" ] ];

	
	function processGroupOfThree( group, groupNo ){
		
		var groupWords = [];
		
		groupWords.push( hundreds[ Number(group.substr(-3,1)) ] );
		
		groupWords.push( tens[ Number(group.substr(-2,1)) ] );
		
		groupWords.push( units[ Number(group.substr(-2)) ] );
		
		if (Number(group.substr(-2))>20) groupWords.push( units[ Number(group.substr(-1)) ] );
		return groupWords;
		
	}
	
	var words = [];
	
	for (var i = 0 ; i <= groupCount ; i++){
		
		words.unshift(processGroupOfThree( numArray[i], i).join(" "));
	}
	
	return words.join(" ").replace(/\s+/g, " ").trim();
} 