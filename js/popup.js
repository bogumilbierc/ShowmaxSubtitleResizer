var FONT_SIZE_INPUT = "#font-size";
var LINE_HEIGHT_INPUT = "#line-height";

var subtitleSettings = {};

$(document).ready(function(){
	$("#save-settings").click(function(){
		saveSettings();
	});
	
	$(FONT_SIZE_INPUT).keyup(function(event){
		if(event.keyCode == 13){
			saveSettings();
		}
	});
	
	$(LINE_HEIGHT_INPUT).keyup(function(event){
		if(event.keyCode == 13){
			saveSettings();
		}
	});
	
	chrome.storage.sync.get("subtitleSettings", function (obj) {
		if(obj !== null && obj.hasOwnProperty('subtitleSettings')){
			var hatedKeywordsJSON = obj['subtitleSettings'];
			subtitleSettings = JSON.parse(hatedKeywordsJSON);
			showCurrentSettings();
		}
	});

});

function showCurrentSettings(){
	if(subtitleSettings != null){
		if(subtitleSettings.hasOwnProperty("fontSize")){
			$(FONT_SIZE_INPUT).val(subtitleSettings.fontSize);
		} else {
			$(FONT_SIZE_INPUT).val(4);
		}
		
		if(subtitleSettings.hasOwnProperty("lineHeight")){
			$(LINE_HEIGHT_INPUT).val(subtitleSettings.lineHeight);
		} else {
			$(LINE_HEIGHT_INPUT).val(1.5);
		}
	}

}

function saveSettings(){
	var fontSize = $(FONT_SIZE_INPUT).val();
	var lineHeight = $(LINE_HEIGHT_INPUT).val();
	
	subtitleSettings.fontSize = fontSize;
	subtitleSettings.lineHeight = lineHeight;
	
	saveChanges();
	
}


function saveChanges() {
		// stringify all keywords that we want to hate
		var valueToSave = JSON.stringify(subtitleSettings);

        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'subtitleSettings': valueToSave}, function() {
            // Notify that we saved.
			console.log('ShowmaxSubtitleResizer: Settings saved');
        });
}
