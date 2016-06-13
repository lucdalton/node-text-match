/*
	--------------------------------------------------
	-- Simple text matching query language for node --
	--------------------------------------------------
*/

var typeOptions = ["AND", "OR", "WITHIN", "NOT", "EXACT", "MATCH"];
var uniaryOptions = ["NOT", "EXACT", "MATCH"];

Array.prototype.indexOf = function(value) {
    for(var i = 0; i < this.length; i++) {
      if (this[i] === value) {
        return i;
      }
    }

    return -1;
}

function withinCheck(query){
	if((query.type == "WITHIN") && (typeof query.arg1 == "string") && (typeof query.arg2 == "string") && (typeof query.within == "number")){
		return true;
	}
		
	throw new Error('query type error');
	

}

function checkQuery(query){

	if((query.type == "WITHIN") && (withinCheck(query))){
		return;
	}

	if(query.type && query.arg1 && !query.arg2){
		if((uniaryOptions.indexOf(query.type) != -1) && (typeof query.arg1 == "string")){
			return;
		}
	}

	
	if(typeof query !== "object"){
		throw new Error('query type error');
	};


	if(!(query.arg1 && query.type)){
		throw new Error('query type error');	
	};

	if(typeOptions.indexOf(query.type) == -1){
		throw new Error('query type error');	
	};

	if(query.arg2){
		checkQuery(query.arg2);
	}

	checkQuery(query.arg1);

}


function within(text, query){
	// returns true or false
	tokens = text.split(' ');
	for(var i=0 ; i<tokens.length; i++){
		if(tokens[i] == ''){
			tokens.splice(i, 1);
			i--;
		}
	}

	for(var i=0; i<tokens.length; i++){
		if(tokens[i] == query.arg1){
			for(var j=0; j<tokens.length; j++){
				if(tokens[j] == query.arg2){
					var diff = j-i;
					if(diff < 0){
						diff *= -1;
					};

					if(diff <= query.within){
						return true;
					}

				}
			}
		}
	}
	return false;
}

function exact(text, word){
	// returns true or false depending on if it's an exact match
	var re = new RegExp(word);
	return re.test(text);
}

function looseMatch(text, word){
	// returns true or false depending on if it is a loose match
	var re = new RegExp(word.toLowerCase());
	return re.test(text.toLowerCase());

}

function notMatch(text, word){
	// returns true or false depending on if it does not match
	var re = new RegExp(word.toLowerCase());
	return !re.test(text.toLowerCase());
}




function parseQuery(text, query){

	checkQuery(query);

	if(query.type == "WITHIN"){
		return within(text, query);
	};

	if(query.arg2){

		// it is a binary operator
		if(query.type == "AND"){
			return (parseQuery(text, query.arg1) && parseQuery(text, query.arg2));
		};

		if(query.type == "OR"){
			return (parseQuery(text, query.arg1) || parseQuery(text, query.arg2));
		};

	}
		
	// else it is a uniary operator
	if(query.type == "EXACT"){
		return exact(text, query.arg1);
	};

	if(query.type == "MATCH"){
		return looseMatch(text, query.arg1);
	};

	if(query.type == "NOT"){
		return notMatch(text, query.arg1);
	}

}




module.exports.parseQuery = parseQuery;
module.exports.within = within;
module.exports.exact = exact;
module.exports.looseMatch = looseMatch;
module.exports.notMatch = notMatch;
module.exports.checkQuery = checkQuery;
module.exports.withinCheck = withinCheck;