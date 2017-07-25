var canonical = '';
var links = document.getElementsByTagName("link");
for(i=0; i<links.length; i++) {
	var link = links[i];
	if(link.hasAttribute("rel")) {
		attr_name = link.getAttribute("rel");
		if (attr_name != "") {
			if (attr_name == "canonical") {
				canonical = link.getAttribute("href");
			}
		}
	}
}

// create the response/request obj
var cmd = new Object();
var meta = new Object();
meta.canonical = canonical;
cmd.command = "attr";
cmd.meta = meta;
chrome.extension.sendRequest(cmd, function(response) {
});