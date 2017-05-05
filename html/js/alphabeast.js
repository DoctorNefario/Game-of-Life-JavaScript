var alphabet = "abcdefghijklmnopqrstuvwxyz"
var timesToIterate = 6;

var alphabeastCurrentData = [];

function transformRandom(strToTransform) {
	chosenLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	chosenPosition = Math.floor(Math.random() * strToTransform.length);
	sliceOne = strToTransform.slice(0, chosenPosition);
	sliceTwo = strToTransform.slice(chosenPosition + 1, strToTransform.length);
	return {
		returnString: sliceOne + chosenLetter + sliceTwo,
		changedPosition: chosenPosition,
		chosenLetter: chosenLetter
	};
}

function underlineLetter(strToUnderline, underlinePoint) {
	sliceOne = strToUnderline.slice(0, underlinePoint);
	sliceTwo = strToUnderline.slice(underlinePoint, underlinePoint + 1);
	sliceThree = strToUnderline.slice(underlinePoint + 1, strToUnderline.length);
	return sliceOne + "<a class='alphaChanged'>" + sliceTwo + "</a>" + sliceThree;
}

function generateStringsFor(value) {
	genReturnArray = [];
	for(i = 0; i < timesToIterate; i++) {
		randomTransform = transformRandom(value);
		genReturnArray.push(randomTransform);
	}
	return genReturnArray;
}

function startFunction() {
	currentInputVal = $("#alphaGet").val();
	if(currentInputVal.length > 0) {
		$("#alphaStart").hide();
		$("#alphaStart").empty().append("Regenerate");
		$("#alphaDownload").show();
		generatedStrings = generateStringsFor(currentInputVal);
		for(e = 0; e < generatedStrings.length; e++) {
			$("#alpha" + e).empty();
			$("#alpha" + e).append(underlineLetter(generatedStrings[e].returnString, generatedStrings[e].changedPosition));
		}
    alphabeastCurrentData.push({
			startWord: currentInputVal,
			generatedStrings: generatedStrings
		});
	}
}

//Stole this from the internet
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function generateDownloadData(arrayToDownload) {
	generatedText = "Alphabeast program";
	for(i = 0; i < arrayToDownload.length; i++) {
		curArrPos = arrayToDownload[i];
		generatedText += "\n\n[Iteration " + (i + 1) + "]";
		generatedText += "\nStarting word: " + curArrPos.startWord;
		generatedText += "\nGenerated words:"
		for(e = 0; e < curArrPos.generatedStrings.length; e++) {
			genStringsPos = curArrPos.generatedStrings[e];
			generatedText += "\n----"
			generatedText += "\n> Resulting word " + (e + 1) + ": " + genStringsPos.returnString;
			generatedText += "\n  > Changed position: " + (genStringsPos.changedPosition + 1);
			generatedText += "\n  > Letter changed to: " + genStringsPos.chosenLetter;
		}
		if(curArrPos.chosen !== undefined) {
			generatedText += "\nChosen word: " + curArrPos.chosen;
		}
	}
	download("alphabeast.txt", generatedText);
}

$(document).ready(function() {
	$("#alphaDownload").hide();
	$("#alphaDownload").removeClass("hideAtStart");
	for(alphaAppend = 0; alphaAppend < timesToIterate; alphaAppend++) {
		$("#alphabeast").append("<p class='alphaAppendContainer'><a class='alphaAppend' id='alpha" + alphaAppend + "' href='#'></a></p>");
	}
	$("#alphaStart").click(function() {
		alphabeastCurrentData = [];
		startFunction();
	});
	$(".alphaAppend").click(function() {
		thisJQuery = $(this);
		thisVal = thisJQuery.text();
    
    currentPos = alphabeastCurrentData.length - 1;
    
    alphabeastCurrentData[currentPos].chosen = thisVal;
    
		$("#alphaGet").val(thisVal);
		startFunction();
	});
	
	$("#alphaDownload").click(function() {
		generateDownloadData(alphabeastCurrentData);
	});
	
	$("#alphaGet").on("input", function() {
		if(alphabeastCurrentData.length > 0) {
			$("#alphaStart").show();
		}
	});
});