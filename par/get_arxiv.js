
function nameSplit(name){
	var splitName = name.split(",").reverse();
	var orderedName="";
	splitName.forEach(function(item){orderedName=orderedName+item+" ";});
	splitOrderedName = orderedName.split(/[. ]/).filter(function(item){ return item!=""; });
	return splitOrderedName;
}

console.log(location.href);
var reArxiv = new RegExp("^http://arxiv.org/abs/[0-9]{4}\\.[0-9]{4}$","g");

// arxiv
if(reArxiv.test(location.href)){
	console.log("this is arxiv article page");

	var article = "arXiv";
	var title = document.getElementsByName("citation_title")[0].content;
	var year =  document.getElementsByName("citation_date")[0].content.substr(0,4);
	var url =  document.getElementsByName("citation_pdf_url")[0].content;
	var authors = document.getElementsByName("citation_author");
	var firstAuthorFull =  authors[0].content;
	var lastAuthorFull =  authors[authors.length-1].content;

	var firstAuthorSplit = nameSplit(firstAuthorFull);
	var lastAuthorSplit = nameSplit(lastAuthorFull);
	var firstAuthor = firstAuthorSplit[firstAuthorSplit.length-1];
	var lastAuthor = lastAuthorSplit[lastAuthorSplit.length-1];
	var fileName = article+"_"+year+"_"+lastAuthor+"_"+title+".pdf";
	console.log(fileName);

	var downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.download = fileName;
	downloadLink.innerHTML="Renamed PDF";

	var downloadColumn = document.createElement("li");
	downloadColumn.appendChild(downloadLink);

	var link = document.getElementById("abs");
	var group = link.getElementsByClassName("full-text");
	var ul = group[0].getElementsByTagName("ul")[0];
	ul.insertBefore(downloadColumn,ul.firstElementChild.nextElementSibling);
}
