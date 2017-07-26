/*
* QnQ Canonical Inspector App
*/


/**
* register on creation
*/
chrome.tabs.onCreated.addListener(function(tab) {
	if (tab.url.substr(0,7) == "http://" || tab.url.substr(0,8) == "https://" ) {
		// fixme: check http
	chrome.tabs.executeScript(tab.id, {file:'overlay.js'});
	}
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
	chrome.tabs.get(tabId,function(tab) {
		if (tab.url.substr(0,7) == "http://" || tab.url.substr(0,8) == "https://" ) {
			// fixme: check http
			chrome.tabs.executeScript(tab.id, {file:'overlay.js'});
		}
	});
});

chrome.tabs.onUpdated.addListener(function( tabId, changeInfo, tab) {
	if (tab.url.substr(0,7) == "http://" || tab.url.substr(0,8) == "https://" ) {
		// fixme: check http
		chrome.tabs.executeScript(tabId, {file:'overlay.js'});
	}
});

function showPageAction(tab_id, canonical_url, tab_url) {
	if (canonical_url != "") {
		if (canonical_url != tab_url) {
			// set the title
			chrome.pageAction.setTitle({
				tabId : tab_id,
				title: canonical_url
			});
			chrome.pageAction.setIcon({
				tabId: tab_id,
				path: 'red.png'
			});
			chrome.pageAction.onClicked.addListener(function(tab) {
				chrome.tabs.update(tab.id, {
					url : canonical_url
				});
			});
		} else {
			// set the title
			chrome.pageAction.setTitle({
				tabId : tab_id,
				title: 'Canonical URL matches URL'
			});
			chrome.pageAction.setIcon({
				tabId: tab_id,
				path: 'green.png'
			});
		}
		chrome.pageAction.show(tab_id);
	}
}

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.command == "attr") {
			console.log("TabId: " + sender.tab.id);
			console.log("Canonical: "+ request.meta.canonical);
			showPageAction(sender.tab.id, request.meta.canonical, sender.tab.url);
		}
	}
);
