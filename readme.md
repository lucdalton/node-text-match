#Simple string query language Node.js module

[![Build Status](https://travis-ci.org/lucdalton/node-text-match.svg?branch=master)](https://travis-ci.org/lucdalton/node-text-match)
[![Coverage](https://codecov.io/gh/lucdalton/node-text-match/branch/master/graph/badge.svg)](https://codecov.io/gh/lucdalton/node-text-match)


##Overview

Query a string by creating a query object, instead of having to contruct a regex or parse anything.

Every query object has a 'type' field, one of:
```javascript
['AND', 'OR', 'NOT', 'WITHIN', 'MATCH', 'EXACT']
```

As well as a type field, a query object will contain either 1 or 2 'arg' fields.

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

// This query matches if the string does not contain both 'FILM' (uppercase) and 'amazing' (any case)

var query3 = {
	type:"NOT",
	query2
}


// More complex queries can be made by nesting query objects
var query4 = {
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



AND & OR are binary operators and are of the following form:

```javascript
{
	type:"AND",
	arg1:{
		//another query object
	},
	arg2:{
		//another query object
	}
};

{
	type:"OR",
	arg1:{
		//another query object
	},
	arg2:{
		//another query object
	}
};

```

WITHIN is also a binary operator, but requires an extra parameter:
```javascript

// matches strings containing the word 'film' within 3 words of 'good'
{
	type:"WITHIN",
	arg1:"film",
	arg2:"good",
	within:3
};
```

EXACT and MATCH are uniary operators:

```javascript
// loose match
{
	type:"MATCH",
	arg1:"amazing!!"
}

// exact match
{
	type:"EXACT",
	arg1:"AMAzing"
}
```