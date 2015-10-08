
//TicTacToe Class
function TicTacToe(){

	//private attributes
	var ticTacToeDataTracker = new Array(3);
	var eventSupported = ['finished'];
	var finishedTriggered = false;
	var gameEndReason = "Unknown";
	//end private attributes
	
	//private method call, to setup private attribute ticTacToeDataTracker, upon creation of TicTacToe class object
	setTicTacToeDataTracker();
	
	//public functions
	this.placeMarker = placeMarker;
	this.on = on;
	
	//place marker function
	function placeMarker(symbol, rowNumber, columnNumber){
		if(symbol != 'x' && symbol != 'o'){
			console.log("Symbol can only be x or o");
			return;
		}
		if(!(rowNumber == 0 || rowNumber == 1 || rowNumber == 2)){
			console.log("rowNumber can only be 0 or 1 or 2");
			return;
		}
		if(!(columnNumber == 0 || columnNumber == 1 || columnNumber == 2)){
			console.log("columnNumber can only be 0 or 1 or 2");
			return;
		}
		ticTacToeDataTracker[rowNumber][columnNumber] = symbol;
		checkWinLoss(symbol);
	}
	
	//event handler function, currently supporting only 'finished' event
	function on(eventName, callBack){
		if(eventSupported.indexOf(eventName) == -1){
			console.log("Event: " + eventName + " currently not supported.");
			return;
		}
		if(typeof callBack == "function" && gameEndReason != "Unknown"){
			callBack(gameEndReason);
		}
	}
	//end public functions
	
	//private function to check win or loss or draw
	function checkWinLoss(symbol){
	
		if(gameEndReason == "Unknown")
			checkVertical(symbol);
			
		if(gameEndReason == "Unknown")
			checkHorizontal(symbol);
		
		if(gameEndReason == "Unknown")
			checkDiagonal(symbol);
		
		if(gameEndReason == "Unknown")
			checkForDraw();
		
		//nested function to check if a player has won the game vertically 
		function checkVertical(symbol){
			var j = 0;
			var firstColumn = new Array();
			var secondColumn = new Array();
			var thirdColumn = new Array();
			for(var i = 0; i<ticTacToeDataTracker.length; i++){
				firstColumn[i] = ticTacToeDataTracker[i][j];
				secondColumn[i] = ticTacToeDataTracker[i][j+1];
				thirdColumn[i] = ticTacToeDataTracker[i][j+2];
			}
			var allColumns = [firstColumn, secondColumn, thirdColumn];
			for(var i=0;i<allColumns.length;i++){
				var currentColumn = allColumns[i];
				var breakOuter = false;
				for(var j=0;j<currentColumn.length;j++){
					if(currentColumn == "-"){
						break;
					}else if(currentColumn[0] == symbol && currentColumn[1] == symbol && currentColumn[2] == symbol){
						breakOuter = true;
						gameEndReason = symbol; 
						on('finished', function(symbol) {
							updateHtml(gameEndReason);
							console.log('Game ended. Reason: ' + gameEndReason);
						});
						break;
					}
				}
				if(breakOuter)break;
			}
		}
		
		//nested function to check if a player has won the game horizontally 
		function checkHorizontal(symbol){
			var horizontalOneMatch = false;
			var horizontalTwoMatch = false;
			var horizontalThreeMatch = false;
			for(var i=0;i<ticTacToeDataTracker.length;i++){
				if(i == 0 && ticTacToeDataTracker[i][0] == symbol){
					horizontalOneMatch = true;
				}else if(i == 1 && ticTacToeDataTracker[i][0] == symbol){
					horizontalTwoMatch = true;
				}
				else if(i == 2 && ticTacToeDataTracker[i][0] == symbol){
					horizontalThreeMatch = true;
				}
				
				if(horizontalOneMatch && horizontalTwoMatch && horizontalThreeMatch){
					gameEndReason = symbol; 
					on('finished', function(gameEndReason) {
						updateHtml(gameEndReason);
						console.log('Game ended. Reason: ' + gameEndReason);
					});
					break;
				}
			}
		}
		
		//nested function to check if a player has won the game diagonally 
		function checkDiagonal(symbol){
			var j = 0;
			var diagonalMatchCounter = 0;
			var diagonalOneMatchLftToRght = false;
			var diagonalTwoMatchLftToRght = false;
			var diagonalThreeMatchLftToRght = false;
			for(var i=0; i<3; i++){
				if(ticTacToeDataTracker[i][j] == symbol && diagonalMatchCounter == 0){
					diagonalOneMatchLftToRght = true;
				}
				else if(ticTacToeDataTracker[i][j] == symbol && diagonalMatchCounter == 1){
					diagonalTwoMatchLftToRght = true;
				}
				else if(ticTacToeDataTracker[i][j] == symbol && diagonalMatchCounter == 2){
					diagonalThreeMatchLftToRght = true;
				}
				j++;
				diagonalMatchCounter++;
			}
			
			if(diagonalOneMatchLftToRght && diagonalTwoMatchLftToRght && diagonalThreeMatchLftToRght){
				gameEndReason = symbol; 
				on('finished', function(gameEndReason) {
					updateHtml(gameEndReason);
					console.log('Game ended. Reason: ' + gameEndReason);
				});
				return;
			}
			
			var j = 0;
			var diagonalMatchCounter = 0;
			var diagonalOneMatchRghtToLft = false;
			var diagonalTwoMatchRghtToLft = false;
			var diagonalThreeMatchRghtToLft = false;
			for(var i=2; i>-1; i--){
				if(ticTacToeDataTracker[i][j] == symbol && diagonalMatchCounter == 0){
					diagonalOneMatchRghtToLft = true;
				}
				else if(ticTacToeDataTracker[i][j] == symbol && diagonalMatchCounter == 1){
					diagonalTwoMatchRghtToLft = true;
				}
				else if(ticTacToeDataTracker[i][j] == symbol && diagonalMatchCounter == 2){
					diagonalThreeMatchRghtToLft = true;
				}
				j++;
				diagonalMatchCounter++;	
			}
			if(diagonalOneMatchRghtToLft && diagonalTwoMatchRghtToLft && diagonalThreeMatchRghtToLft){
				gameEndReason = symbol; 
				on('finished', function(gameEndReason) {
					updateHtml(gameEndReason);
					console.log('Game ended. Reason: ' + gameEndReason);
				});
				return;
			}
		}
		
		
	}
	
	//check if game result is draw
	function checkForDraw(){
		var foundDefaultVal = false;
		for(var i=0;i<ticTacToeDataTracker.length; i++){
			var breakOuter = false;
			for(var j=0; j<ticTacToeDataTracker[i].length;j++){
				if(ticTacToeDataTracker[i][j] == "-"){
					foundDefaultVal = true;
					breakOuter = true;
					break;
				}
			}
			if(breakOuter)break;
		}
		
		if(!foundDefaultVal){
			gameEndReason = 'draw'; 
			on('finished', function(gameEndReason) {
				updateHtml(gameEndReason);
				console.log('Game ended. Reason: ' + gameEndReason);
			});
		}
	}
	
	
	function updateHtml(gameEndReason){
		$('#whosTurn').html("<b>Game ended. Reason: " + gameEndReason + "</b>");
		$('.tickTackToeCell').each(function(){
			$(this).attr('disabled', 'disabled');
			$(this).hide('slow');
		});
	}
	
	//private function to setup data grid
	function setTicTacToeDataTracker(){
		for(var counter = 0; counter < ticTacToeDataTracker.length; counter++){
			ticTacToeDataTracker[counter] = new Array(3); 
		}
		for(var i=0;i<ticTacToeDataTracker.length; i++){
			for(var j=0; j<ticTacToeDataTracker[i].length;j++){
				ticTacToeDataTracker[i][j] = "-";
			}
		}		
	}
	
}


