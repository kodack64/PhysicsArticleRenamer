
function nameSplit(name){
	var splitName = name.split(",").reverse();
	var orderedName="";
	splitName.forEach(function(item){orderedName=orderedName+item+" ";});
	splitOrderedName = orderedName.split(/[. ]/).filter(function(item){ return item!=""; });
	return splitOrderedName;
}
