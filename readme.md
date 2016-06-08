#Node Module defining a simple query language for string matching.

Query a string by creating a query object, instead of having to contruct a regex or parse anything.

Every query object has a 'type' field, one of:
```javascript
['AND', 'OR', 'NOT', 'WITHIN', 'MATCH', 'EXACT']
```

As well as a type field, a query object will contain either 1 or to 'arg' fields, and no other fields.

Some examples of query objects:
```javascript
// Match a string if it contains 'FILM' (only in uppercase!)
var query1 = {
	type:"EXACT",
	arg1:"FILM"
};

// This query matches a string if it contains both 'FILM' (uppercase) and 'amazing' (any case)
var query2 = {
	type:"AND",
	arg1:{
		type:"EXACT",
		arg1:"FILM"
	},
	arg2:{
		type:"MATCH",
		arg1:"amazing"
	}
}


var query4 = {
	type:"NOT",
	arg1:"bad"
}


// More complex queries can be made by nesting query objects
var query5 = {
	type:"OR",
	arg1:query2,
	arg2:query4
}
```

---------------------

###Usage:
```javascript

var query = require('node-text-match');

var exampleQuery = {
	type:"EXACT",
	arg1:"AMAZING"
};

var testString = "That film was AMAZING";

query.parseQuery(testString, exampleQuery);
--> true


```



AND, OR AND WITHIN are binary operators and are of the following form:

```javascript
{
	type:"AND",
	arg1:{
		//another query object
	},
	arg2:{
		//another query object
	}
}
```

EXACT and MATCH are uniary operators:

```javascript
{
	type:"MATCH",
	arg1:"amazing!!"
}
```


These operations can be combined to perform complex queries against strings.