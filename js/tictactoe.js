/**
 * Runs our game
 */
var gameRunner = {
		player1:"X",
		player2:"O",
		currentPlayer:null,
		players:null,
		
		/*
		 * Start the game
		 */
		"init":function(){
			
			var _self = this;
			this.currentPlayer = this.player1;
			this.players = [this.player1,this.player2];
			
			//Set up event listeners
			$('td').on("click",function(){
				$(this).off('click');
				$(this).html(_self.currentPlayer);
				_self.takeTurn();
			});
		},
		/**
		 * Take each turn
		 */
		"takeTurn":function() {
			
			if(this.hasPlayerWon()){
				console.log("player has won");
				this.gameOver();
				return;
			}
			/**
			 * Swap current player
			 */
			if(this.currentPlayer === this.player1){
				this.currentPlayer = this.player2;
			} else {
				this.currentPlayer = this.player1;
			}
			
		},
		/**
		 * Checks to see if any of our players have won
		 * or if it's a draw
		 */
		"gameOver":function() {
			console.log("runng game over");
			$('td').off('click');
			$('#gameOver').html(this.currentPlayer+" has won");
		},
		
		/**
		 * Check for win
		 */
		"hasPlayerWon":function() {
			if(this.isDiagonalWin() || this.isHorizontalWin() || this.isVerticalWin() ) {	
				console.log("a player has won");
				return true;
			}
			return false;
		},
		/**
		 * Check to see if we've won diagonally
		 * @returns {Boolean}
		 */
		"isDiagonalWin":function() {
			var response = false;
			for(var i=0;i<this.players.length;i++) {
				
				var tableColumns = [$("table tr:first td:first-child"),
				                    $("table tr:last td:last-child"),
				                    $("table tr:nth-child("+2+") td:nth-child("+2+")"),
				                    ];
				
				if(this.countOccurrences(tableColumns,this.players[i]) === 3) {
					console.log("3 in a diagonal line have been found");
					response = true;
				}
				
				var tableColumns = [$("table tr:first td:last-child"),
				                    $("table tr:last td:first-child"),
				                    $("table tr:nth-child("+2+") td:nth-child("+2+")"),
				                    ];
				if(this.countOccurrences(tableColumns,this.players[i]) === 3) {
					console.log("3 in a diagonal line have been found");
					response = true;
				}
			}
			
			return response;
		},
		/**
		 * Check to see if we've won horizontally
		 * @returns {Boolean}
		 */
		"isHorizontalWin":function() {
			var _self = this;
			var response = false;
			//For each player
			for(var i=0;i<_self.players.length;i++) {
				//Loop through every table row
				$("table tr").each(function() {
					if(_self.countOccurrences(this.children,_self.players[i]) === 3) {
						console.log("3 in a row have been found");
						response = true;
					}
				});
			}
			return response;
		},
		/**
		 * Check to see if we've won vertically
		 * @returns {Boolean}
		 */
		"isVerticalWin":function() {
			
			var _self = this;
			var response = false;
			
			for(var i=0;i<this.players.length;i++) {
				for(var j=1;j<=3;j++){
					var tableColumn = $("table tr td:nth-child("+j+")");
					if(_self.countOccurrences(tableColumn,this.players[i]) === 3){
						console.log("3 in a vertical line have been found");
						response = true;
					}
				}
			}
			return response;
		},
		/*
		 * Count the amount of occurences
		 */
		"countOccurrences":function(array,player){
			//Count how many occurrences there are
			var count = $.grep(array, function (elem) {return $(elem).html() === player;}).length;
			console.log(count);
			return count;
		}
};


$(document).ready(function(){
	gameRunner.init();
});