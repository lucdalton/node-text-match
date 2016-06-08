#Node Module defining a simple query language for string matching.

Query a string by creating a query object, instead of having to contruct a regex or parse a query string.  Complex queries can be contructed by nesting query objects.

The type options are:
```javascript
['AND', 'OR', 'NOT', 'WITHIN', 'MATCH', 'EXACT']
```




###Basic example Usage:
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