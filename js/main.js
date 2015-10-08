
$(document).ready(function(){
	startTicTacToe();	
	reloadGame();
});

//start a Tick Tack Toe game
function startTicTacToe(){
	var tickTackToeGame = new TicTacToe();
	$('.tickTackToeCell').click(function(){
		$(this).hide();
		var whosTurn = $('#whosTurn').attr('player');
		var rowNum = $(this).attr('rowNum');
		var colNum = $(this).attr('colNum');
		
		$(this).siblings('span').text(whosTurn);
		$(this).siblings('span').show('slow');
		
		if(whosTurn == 'x'){
			this.parentNode.style.background='lightgreen';
			$('#whosTurn').attr('player', 'o');
			$('#whosTurn').html("<b>Player two's turn</b>");
		}
		else if(whosTurn == 'o'){
			this.parentNode.style.background='#E0F0FF';
			$('#whosTurn').attr('player', 'x');	
			$('#whosTurn').html("<b>Player one's turn</b>");
		}
		tickTackToeGame.placeMarker(whosTurn, rowNum, colNum);
	});

}

//reload the game
function reloadGame(){
	$('#reloadTicTacToe').click(function(){
		location.reload(true);
	});
}

