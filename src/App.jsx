import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');
  const [editingPlayer, setEditingPlayer] = useState(null); 
  const [tile, settile] = useState(["","","","","","","","","",])
  const [currentPlayer, setCurrentPlayer] = useState('✖️');
  const [moveHistory, setMoveHistory] = useState([]);
  const [winner, setwinnername] = useState(null);
  

  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  const handleNameChange = (e, player) => {
    const newName = e.target.value;
    if (player === 'player1') {
        setPlayer1(newName);
    }
    else {
    setPlayer2(newName);
    }
  };

  const handleBlur = () => {
    setEditingPlayer(null); 
  };

  const handleValueChange = (index) => {
      const updatedTiles = [...tile];
      if(updatedTiles[index] == "✖️" || updatedTiles[index] == '⚫') {
        alert("You cannot Place Here");
        return;
      }
      updatedTiles[index] = currentPlayer;
  
      const updatedHistory = [...moveHistory, index];
  
      if (updatedHistory.length > 6) {
        const toRemove = updatedHistory[0];
        updatedTiles[toRemove] = ""; // Clear the oldest one
        updatedHistory.shift();
      }
  
      settile(updatedTiles);
      setMoveHistory(updatedHistory);
      setCurrentPlayer(currentPlayer === '✖️' ? '⚫' : '✖️');
  }
  useEffect(() => {
    const board = [...tile];
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
  
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winnerName = board[a] === '✖️' ? player1 : player2;
        setTimeout(() => {
          setwinnername(winnerName);
        }, 100); 
        break;
      }
    }
  }, [tile]);

  const resetGame = () => {
    settile(["", "", "", "", "", "", "", "", ""]);
    setMoveHistory([]);
    setCurrentPlayer('✖️');
    setwinnername(null);
  }
  const handleRestart= () => {
    settile(["", "", "", "", "", "", "", "", ""]);
    setMoveHistory([]);
    setCurrentPlayer('✖️');
    setwinnername(null);

    
  }

  
  return (
    <>

      {winner ? (
        <div className="winner-banner">
          <div className="winnername"> {winner} Wins</div>
          <button onClick={resetGame} className="restart-btn">Restart Game</button>
          </div>
      ):(
      <div className="outerbox">
        <div className="title">Tic Tac Toe 2</div>

        <button className="restart" onClick={()=>handleRestart()}>Restart</button>

        <div className="playernames">

          <div className="player1">
            <div className="namesymbol">{player1} ✖️</div>
          <div className="ButtonInput">
          {editingPlayer === 'player1' ? (
          <input type="text" placeholder='Enter Player1 Name' onChange={(e) => handleNameChange(e, 'player1')} onBlur={handleBlur} autoFocus/>
          ) : (
           <button onClick={() => handleEdit('player1')}>Edit Name</button>
        )}
        </div>
          </div>
          <div className="player2">
            <div className="namesymbol">{player2} ⚫</div>
          <div className="ButtonInput">
          {editingPlayer === 'player2' ? (
          <input type="text" placeholder='Enter Player2 Name'  onChange={(e) => handleNameChange(e, 'player2')} onBlur={handleBlur} autoFocus />
          ) : (
           <button onClick={() => handleEdit('player2')}>Edit Name</button>
        )}
        </div>
          </div>
        </div>
        <div className="currentplay">
          Current Turn :  {currentPlayer === '✖️' ? player1 : player2} {currentPlayer}
        </div> <br />
        <div className="layout">
          <div className="row1 rows">
            <div className={`box ${moveHistory[0] === 0 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(0)}> {tile[0]}</div>
            <div  className={`box ${moveHistory[0] === 1 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(1)}> {tile[1]}</div>
            <div  className={`box ${moveHistory[0] === 2 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(2)}> {tile[2]}</div>
          </div>
          <div className="row2 rows">
            <div  className={`box ${moveHistory[0] === 3 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(3)}> {tile[3]}</div>
            <div  className={`box ${moveHistory[0] === 4 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(4)}> {tile[4]}</div>
            <div  className={`box ${moveHistory[0] === 5 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(5)}> {tile[5]}</div>
          </div>
           <div className="row3 rows">
            <div  className={`box ${moveHistory[0] === 6 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(6)}> {tile[6]}</div>
            <div  className={`box ${moveHistory[0] === 7 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(7)}> {tile[7]}</div>
            <div  className={`box ${moveHistory[0] === 8 && moveHistory.length === 6 ? 'blurred' : ''}`} onClick={()=>handleValueChange(8)}> {tile[8]}</div>
          </div>
          
        </div>
      </div>
        )}
    </>
  )
}

export default App
