

function getSplitName(name){
	var splitName = name.split(",").reverse();
	var orderedName="";
	splitName.forEach(function(item){orderedName=orderedName+item+" ";});
	splitOrderedName = orderedName.split(/[. ]/).filter(function(item){ return item!=""; });
	return splitOrderedName;
}

function getArticleName(siteName){
	return "PR"+siteName.split(" ")[2].substr(0,1);
}

console.log(location.href);
var rePhysicalReview = new RegExp("^http.?://journals.aps.org/pr./abstract/[0-9]+\\.[0-9]+/PhysRev.*$","g");

// Physical Review
if(rePhysicalReview.test(location.href)){
	console.log("this is Physical Review article page");

	var allMetaElements = document.getElementsByTagName("meta");
	var article,url,title,year;
	for(i=0;i<allMetaElements.length;i=i+1){
		var item = allMetaElements[i];
		if(item.getAttribute("property") == "og:site_name"){
			article = getArticleName(item.content);
		}else if(item.getAttribute("property") == "og:url"){
			url = item.content.replace("abstract","pdf")+".pdf";
		}else if(item.getAttribute("property") == "og:title"){
			title = item.content;
		}else if(item.getAttribute("property") == "article:published_time"){
			year =  item.content.substr(0,4);
		}
	}
	var authors = document.getElementsByClassName("authors")[0].innerText;
	var splitAuthors = authors.split(/, and|,|and/);
	var firstAuthorFull =  splitAuthors[0];
	var lastAuthorFull =  splitAuthors[splitAuthors.length-1];
	var firstAuthorSplit = getSplitName(firstAuthorFull);
	var lastAuthorSplit = getSplitName(lastAuthorFull);
	var firstAuthor = firstAuthorSplit[firstAuthorSplit.length-1];
	var lastAuthor = lastAuthorSplit[lastAuthorSplit.length-1];

	var fileName = article+"_"+year+"_"+lastAuthor+"_"+title+".pdf";
	console.log(url);
	console.log(fileName);
	
	var downloadLink = document.createElement("a");
	downloadLink.href=url;
	downloadLink.download = fileName;
	downloadLink.innerHTML = "Renamed PDF";
	downloadLink.className = "small button";
	
	var downloadButton = document.createElement("li");
	downloadButton.appendChild(downloadLink);

	var buttonGroup = document.getElementsByClassName("button-group radius")[0];
	buttonGroup.insertBefore(downloadButton,buttonGroup.firstElementChild.nextElementSibling);
}
