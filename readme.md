#Node Module defining a simple query language for matching strings.

##Example Usage:
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