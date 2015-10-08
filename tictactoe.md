### Task

Implement the logic of the [Tic Tac Toe](http://en.wikipedia.org/wiki/Tic-tac-toe) game.

Your solution must contain a class called ```TicTacToe``` with the following methods:

- ```placeMarker(/* String */symbol, /* Number */row, /* Number */column)```: Positions player's marker in a cell of the grid. Params:
    +  ```symbol``` can be  ```"x"``` or ```"o"```, 
    +  ```row``` and ```column``` can be an integer from 0 to 2.
- ```on(/* String */eventName, /* function */callback)```: To attach a listener to a specific event. Your implementation must support the following event:
    + ```finished```: Triggered when the game is finished. The callback function will be invoked passing a string parameter that specifies the reason why the game is finished: ```draw```, ```o``` or ```x```. The last two indicate the winner of the game.

#### Example of use
```
var ttt = new TicTacToe();
ttt.on('finished', function(reason) {
  console.log('Game ended. Reason: ' + reason);
});
ttt.placerMarker('x', 0, 0);
ttt.placerMarker('o', 1, 0);
ttt.placerMarker('x', 0, 1);
ttt.placerMarker('o', 2, 0);
ttt.placerMarker('x', 0, 2); // "finished" event is trigger passing 'x'
```

### Bonus task

Imagine an implementation of Tic Tac Toe that allows 2 players to play remotely. How would you assign each player's marker automatically without using the server?

(No need to code anything, just explain the idea)
