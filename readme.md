#Node Module defining a simple query language for matching strings.

Query a string by creating a query object, instead of having to contruct a complex regex.
The type options are:
```javascript
['AND', 'OR', 'NOT', 'WITHIN', 'MATCH', 'EXACT']
```

###Example Usage:
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

{
	type:"AND",
	arg1:{

	}
}