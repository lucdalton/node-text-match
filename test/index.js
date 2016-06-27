var assert = require('chai').assert;
var expect = require('chai').expect;

var parser = require('../index');


var queryExample1 = {
	type:"AND",
	arg1:{
		type:"OR",
		arg1:{
			type:"MATCH",
			arg1:"compare"
		},
		arg2:{
			type:"MATCH",
			arg1:"market"
		}
	},


	arg2:{
		type:"MATCH",
		arg1:"meerkat"
	}

};

var withinExample1 = {
	type:"WITHIN",
	arg1:"compare",
	arg2:"market",
	within: 5
}

var withinExample2 = {
	type:"WITHIN",
	arg1:"compare",
	arg2:"market",
	within: 1
};

var exactExample = {
	type:"EXACT",
	arg1:"CoMparE"

};

var exampleString1 = "hello";
var exampleString2 = "world";
var exampleString3 = "this,sucks";

var t1 = "Compare the market is SHIT";
var t2 = "compare the market is SHIT";

var q1 = {
	type:"WITHIN",
	arg1:"compare",
	arg2:"market",
	within:3
};

var q2 = {
	type:"EXACT",
	arg1:"Compare",
};

var q3 = {
	type:"MATCH",
	arg1:"COMPARE"
};

var q4 = {
	type:"MATCH",
	arg1: "market"
};

var q5 = {
	type:"AND",
	arg1:q2,
	arg2:q4
};

var q6 = {
	type:"AND",
	arg1:{
		type:"MATCH",
		arg1:"compare"
	},
	arg2:{
		type:"MATCH",
		arg1:"MARKET"
	}
};

var q7 = {
	type:"NOT",
	arg1:q2
};

var q8 = {
	type:"WITHIN",
	arg1:"Compare",
	arg2:"market",
	within:2
};


var q10 = {
	type:"MATCH",
	arg1:"shit"
};

var q11 = {
	type:"NOT",
	arg1:q10
}

var q12 = {
	type: "OR",
	arg1:q5,
	arg2:{
		type:"EXACT",
		arg1:"GARBAGE"
	}
}


describe('within query function', function(){
	
	it('should return true', function(){
		var testText = "the was compare ass teo fun market";
		assert.equal(true, parser.within(testText, withinExample1));
	});

	it('should return false', function(){
		var testText = "the was compare ass teo fun times shitty market";
		assert.equal(false, parser.within(testText, withinExample1));
	});


	it('should return true', function(){
		var testText = "the was market ass teo fun the compare";
		assert.equal(true, parser.within(testText, withinExample1));
	});

	it('should return true', function(){
		var testText = "market teo fun times shitty compare ass ";
		assert.equal(true, parser.within(testText, withinExample1));
	});


	it('should return true', function(){
		var testText = "the was compare market";
		assert.equal(true, parser.within(testText, withinExample2));
	});	

	it('should return false', function(){
		var testText = "the was compare a market";
		assert.equal(false, parser.within(testText, withinExample2));
	});	
});


describe('exact query function', function(){

	it('should return false', function(){
		var testText = "the was compare market";
		assert.equal(false, parser.exact(testText, exactExample.arg1));
	});
	
	it('should return true', function(){
		var testText = "the was CoMparE market";
		assert.equal(true, parser.exact(testText, exactExample.arg1));
	});

	it('should be true', function(){
		assert.equal(true, parser.exact("Compare the market is SHIT", "Compare"));
	});

});


describe('match function', function(){

	it('should return true', function(){
		var testText = "the was CoMparE market";
		assert.equal(true, parser.looseMatch(testText, exactExample.arg1));
	})

	it('should return true', function(){
		var testText = "the was compare market";
		assert.equal(true, parser.looseMatch(testText, exactExample.arg1));
	})

	it('should return true', function(){
		var testText = "thewascomparemarket";
		assert.equal(true, parser.looseMatch(testText, exactExample.arg1));
	})
});

describe('checkQuery function', function(){


	it('should return error', function(){
		expect(function(){	
			parser.checkQuery('alksjdbflakswdjf');
		}).to.throw('query type error');		
	});


	it('shouldn\'t return an error', function(){
		expect(function(){	
			parser.checkQuery({type:"EXACT",arg1:"film" });
		}).to.not.throw('query type error');		
	});

	it('should return an error', function(){
		expect(function(){	
			parser.checkQuery({type:"EXACTA",arg1:"film" });
		}).to.throw('query type error');
	});

	it('should return an error', function(){
		expect(function(){	
			parser.checkQuery({type:"EXACT"});
		}).to.throw('query type error');
	});


	it('should not return an error', function(){
		expect(function(){	
			parser.checkQuery({type:"AND", arg1:{type:"EXACT", arg1:"film"}, arg2:{type:"EXACT", arg1:"media"}});
		}).to.not.throw('query type error');
	});



	it('should not return an error', function(){
		expect(function(){	
			parser.checkQuery({type:"OR", arg1:{type:"MATCH", arg1:"film"}, arg2:{type:"MATCH", arg1:"media"}});
		}).to.not.throw('query type error');
	});



	it('should not return an error', function(){
		expect(function(){	
			parser.checkQuery({type:"WITHIN", arg1:"film", arg2:"media", within:2});
		}).to.not.throw('query type error');
	});


});

describe('withinCheck function', function(){
	it('should not return error', function(){
		
		assert.equal(true, parser.withinCheck({type:"WITHIN", arg1:"film", arg2:"media", within:2}));
		
	});


	it('should return error', function(){
		expect(function(){	
			parser.withinCheck({type:"WITHIN", arg1:"film", arg2:"media", within:"aasd"});
		}).to.throw('query type error');
	});


	it('should return error', function(){
		expect(function(){	
			parser.withinCheck({type:"WITHI", arg1:"film", arg2:"media", within:10});
		}).to.throw('query type error');
	});


	it('should return error', function(){
		expect(function(){	
			parser.withinCheck({arg1:"film", arg2:"media", within:"aasd"});
		}).to.throw('query type error');
	});

	it('should return error', function(){
		expect(function(){	
			parser.withinCheck(1);
		}).to.throw('query type error');
	});



});


describe('catStrings test', function(){
	it('should return true', function(){
		assert.equal('hello,world', parser.catStrings(exampleString1, exampleString2));
	});


	it('should return false', function(){
		assert.equal('hello,world,this,sucks', parser.catStrings(parser.catStrings(exampleString1, exampleString2), exampleString3));
	});

});

describe('queryTostring function', function(){
	it('within test 1', function(){
		assert.equal('compare,market', parser.queryToString(withinExample1));
	});

	it('exact test 2', function(){
		assert.equal('CoMparE', parser.queryToString(exactExample));
	});

	it('nested query test', function(){
		assert.equal('Compare,market', parser.queryToString(q5));
	});

	it('nested query test 2', function(){
		assert.equal('Compare,market,GARBAGE', parser.queryToString(q12));
	});



})

// <!--  INTEGRATION TESTS -->
describe('integration tests', function(){

	describe('parse multiple query', function(){



		it('parse test 1', function(){
			assert.equal(true, parser.parseQuery(t1, q2));
		});

		it('parse test 2', function(){
			assert.equal(true, parser.parseQuery(t1, q3));
		});

		it('parse test 3', function(){
			assert.equal(true, parser.parseQuery(t2, q3));
		});


		it('AND should be true', function(){
			assert.equal(true, parser.parseQuery(t1, q6));
		});


		it('AND should be true', function(){
			assert.equal(true, parser.parseQuery(t1, q5));
		});


		it('MUTLI should be false', function(){
			assert.equal(false, parser.parseQuery(t1, q7));
		});


		it('should return true', function(){
			assert.equal(true, parser.parseQuery(t1, q8));
		});
		
		it('should return true', function(){
			var q = {
				type:"AND",
				arg1: q8,
				arg2: q10
			};
			assert.equal(true, parser.parseQuery(t1, q));
		});


		it('NOT operator should just work on objects', function(){
			console.log(parser.parseQuery(t1, q11));
		})


	});




})

