chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "Showmax"){
		waitTillPageLoadesAndScaleSubtitles();
	}
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
        init();
});

init();

var subtitleSettings = [];

function init(){
	getSettingsAndScaleSubtitles();	
}

function getSettingsAndScaleSubtitles(){
	chrome.storage.sync.get("subtitleSettings", function (obj) {
		if(obj !== null && obj.hasOwnProperty('subtitleSettings')){
			console.log("ShowmaxSubtitleResizer: Setting downloaded");
			console.log("ShowmaxSubtitleResizer" + obj['subtitleSettings']);
			var subtitleSettingsJSON = obj['subtitleSettings'];
			subtitleSettings = JSON.parse(subtitleSettingsJSON);
			waitTillPageLoadesAndScaleSubtitles();
		} else {
			console.log("ShowmaxSubtitleResizer: Settings not available");
		}
	});
}
 
function waitTillPageLoadesAndScaleSubtitles(){
	window.setTimeout(resizeSubtitles, 1000);	
}

function resizeSubtitles(){	

	if(subtitleSettings != null){
		
		if($(".flowplayer .fp-subtitle").length>0){
			console.log("ShowmaxSubtitleResizer: Settings loaded - processing with resizing");
			if(subtitleSettings.hasOwnProperty("fontSize")){
				console.log("ShowmaxSubtitleResizer: Resizing font-size to: " + subtitleSettings.fontSize);
				$(".flowplayer .fp-subtitle").css("font-size", subtitleSettings.fontSize + "%");
			} 
		
			if(subtitleSettings.hasOwnProperty("lineHeight")){
				console.log("ShowmaxSubtitleResizer: Resizing line-height to: " + subtitleSettings.lineHeight);
				$(".flowplayer .fp-subtitle").css("line-height", subtitleSettings.lineHeight);
			}
		} else {
			console.log("Player not yet fully loaded - scheduling next try");
			waitTillPageLoadesAndScaleSubtitles();
		}
		
	} else {
		console.log("ShowmaxSubtitleResizer: No settings - no resizing");
	}
}

