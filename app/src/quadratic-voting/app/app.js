QuadraticVoting.directive('qvApp', function () {
	var component = QuadraticVoting.App;
	return {
		templateUrl: '/src/quadratic-voting/app/app.html',
		controller: component.controller,
		scope: {}
	};
});
QuadraticVoting.App = {};
QuadraticVoting.App.controller = function ($scope, $element) {
	var _ = $scope;
	_.component = QuadraticVoting.App;
	
	_.ballotItems = [
		{
			question: 'Drinks',
			options: [
				{name:'Water'},
				{name:'Milk'},
				{name:'Tequila'}
			]
		},
		{
			question: 'Appetizer',
			options: [
				{name:'Nuts'},
				{name:'Cheese'},
				{name:'Oysters'}
			]
		},
		{
			question: 'Salad',
			options: [
				{name:'Greens'},
				{name:'Potato Salad'},
				{name:'Egg salad'}
			]
		},
		{
			question: 'Entree',
			options: [
				{name:'Fish'},
				{name:'Pizza'},
				{name:'Ratatouille'}
			]
		},
		{
			question: 'Dessert',
			options: [
				{name:'Cake'},
				{name:'Ice cream'},
				{name:'Tequila'}
			]
		}
	];
	
	_.votes = []; // Hash of Options : Vote count integer
	$(_.ballotItems).each(function(i, ballotItem) {
		$(ballotItem.options).each(function(i, option) {
			_.votes.push({
				option: option,
				votes: 0
			});
		});
	});

	function getVoteOption(option) {
		for(var i=0; i<_.votes.length; i++) {
			var voteOption = _.votes[i];
			if (voteOption.option == option) {
				return voteOption;
			}
		}
		console.error('Not found');
	}
	
	_.votesPerPerson = _.ballotItems.length * 10;
	_.getVotesRemaining = function() {
		var numVotesUsed = 0;
		$(_.votes).each(function(i, voteOption) {
			for (var i=1; i<=voteOption.votes; i++) {
				var voteCost = _.getVoteCost(i);
				numVotesUsed += voteCost;
			}
		});
		var value = _.votesPerPerson - numVotesUsed;
		return value;
	}
	
	_.getVoteCount = function (option) {
		var count = 0;
		var voteOption = getVoteOption(option);
		count += voteOption.votes;
		return count;
	}
	
	_.addVote = function (option) {
		if (_.getVotesRemaining() <= 0) return;
		var voteOption = getVoteOption(option);
		var voteNumber = voteOption.votes + 1;
		var voteCost = _.getVoteCost(voteNumber);
		voteOption.votes++;
	}
	
	_.removeVote = function (option) {
		var voteOption = getVoteOption(option);
		var voteNumber = voteOption.votes - 1;
		var voteCost = _.getVoteCost(voteNumber);
		voteOption.votes--;
	}
	
	_.doShowAddVoteButton = function (option) {
		var voteOption = getVoteOption(option);
		var voteNumber = voteOption.votes + 1;
		var voteCost = _.getVoteCost(voteNumber);
		var votesRemaining = _.getVotesRemaining();
		var canAffordVote = (votesRemaining >= voteCost);
		return canAffordVote;
	}

	_.doShowRemoveVoteButton = function (option) {
		var voteOption = getVoteOption(option);
		return (voteOption.votes > 0);
	}
	
	_.getVoteCost = function(numVotes) {
		var value = quadraticEquation(numVotes);
		return value;
	}
	
	function quadraticEquation (numVotes) {
		// TODO: This is not a quadratic equation. Is it logarithmic?
		var cost = numVotes * numVotes;
		return cost;
	}

}
