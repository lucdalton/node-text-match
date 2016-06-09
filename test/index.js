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

describe('notMatch function', function(){
	
	it('should return false', function(){
		var testText = "the was compare market";
		assert.equal(false, parser.notMatch(testText, exactExample.arg1));
	})

	it('should return true', function(){
		var testText = "the was market";
		assert.equal(true, parser.notMatch(testText, exactExample.arg1));
	})
});

describe('checkQuery function', function(){

});




// <!--  INTEGRATION TESTS -->
describe('integration tests', function(){

	describe('parse multiple query', function(){

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
			arg1:"market"
		}


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
		})


		it('AND should be true', function(){
			assert.equal(true, parser.parseQuery(t1, q5));
		})


		it('MUTLI should be false', function(){
			assert.equal(false, parser.parseQuery(t1, q7));
		})



	});




})

