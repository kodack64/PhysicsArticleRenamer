
function nameSplit(string){
	var splits = string.split(",");
	splits.reverse();
	string="";
	for(str in splits){
		string += str + " ";
	}
	splits = string.split(/[. ]/);
	splits = splits.filter(function(item){ return item!=""; });
	return splits;
}