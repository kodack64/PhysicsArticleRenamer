

function getSplitName(name) {
    var splitName = name.split(",").reverse();
    var orderedName = "";
    splitName.forEach(function (item) { orderedName = orderedName + item + " "; });
    splitOrderedName = orderedName.split(/[. ]/).filter(function (item) { return item != ""; });
    return splitOrderedName;
}

function articleName(name){
	if(name.indexOf("nphys")!=-1){
		return "NaturePhysics";
	}else if(name.indexOf("nphoton")!=-1){
		return "NaturePhotonics";
	} else if (name.indexOf("ncomms") != -1) {
	    return "NatureCommunications";
	} else {
	    return "Nature";
	}
}

console.log(location.href);
var reNature = new RegExp("^http://www.nature.com/(nature|nphys|nphoton|ncomms)/journal/v.*/n.*/full/n.*\\.html$", "g");

// Nature family
if(reNature.test(location.href)){
	console.log("this is Nature article page");
	var article = articleName(location.href);
	var title = document.getElementsByName("DC.title")[0].content;
	var year = document.getElementsByName("DC.date")[0].content.substr(0,4);
	var authors = document.getElementsByName("DC.creator");
	var lastAuthorSplit = getSplitName(authors[authors.length - 1].content);
	var lastAuthor = lastAuthorSplit[lastAuthorSplit.length - 1];
	var url = document.getElementsByClassName("download-option articlepdf")[0].firstElementChild.href;
	var fileName = article+"_"+year+"_"+lastAuthor+"_"+title+".pdf";
	console.log(url);
	console.log(fileName);
	
	var downloadLink = document.createElement("a");
	downloadLink.innerHTML = "Renamed PDF";
	downloadLink.href = url;
	downloadLink.download = fileName;
	var h3 = document.getElementById("toggle-download-links");
	console.log(h3);
	h3.insertBefore(downloadLink,h3.firstElementChild.nextElementSibling);
}
