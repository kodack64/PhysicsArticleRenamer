

function getSplitName(name) {
    var splitName = name.split(",").reverse();
    var orderedName = "";
    splitName.forEach(function (item) { orderedName = orderedName + item + " "; });
    splitOrderedName = orderedName.split(/[. ]/).filter(function (item) { return item != ""; });
    return splitOrderedName;
}

console.log(location.href);
var reScience = new RegExp("^http://www.sciencemag.org/content/(early/)?[0-9]+/[0-9]+/.*.(full|abstract|short)$", "g");

// Science
if(reScience.test(location.href)){
	console.log("this is Science article page");
	var article = "Science";
	var title = document.getElementsByName("DC.Title")[0].content;
	var year = document.getElementsByName("DC.Date")[0].content.substr(0,4);
	var authors = document.getElementsByName("DC.Contributor");
	var lastAuthorSplit = getSplitName(authors[authors.length - 1].content);
	var lastAuthor = lastAuthorSplit[lastAuthorSplit.length - 1];
	var url = document.getElementsByClassName("notice")[0].firstElementChild.href+".pdf";
	var fileName = article+"_"+year+"_"+lastAuthor+"_"+title+".pdf";
	console.log(url);
	console.log(fileName);
	
	var downloadColumn = document.createElement("li");
	var downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.download = fileName;
	downloadLink.rel = "view-full-text.pdf";
	downloadLink.innerHTML = "Renamed PDF";
	downloadColumn.appendChild(downloadLink);
	downloadColumn.className = "notice";

	var ol = document.getElementsByClassName("cb-section")[0].firstElementChild;
	console.log(ol);
	ol.insertBefore(downloadColumn,ol.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling);
}
