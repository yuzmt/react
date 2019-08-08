import React, { Component } from 'react';
import Square from './Square'
// import '../App.css'

// 渲染一个单独的 <button>

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true, //棋子没移动一步,取反
        };
    }

    // 处理点击事件

    handleClick(i) {
        // 调用 .slice() 方法创建了 squares 数组的一个副本,而不是在现有的数组上进行修改
        const squares = this.state.squares.slice();
        // 当有玩家胜出,或者某个格子被填充了之后, 直接返回,不做任何处理
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares:squares,
            xIsNext: ! this.state.xIsNext,
        })
    }

    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} 
            />
        )
    }



    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = 'winner: ' + winner;
        }else {
            // 动态给出下一步的玩家是谁
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

// 计算出赢家
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; //把胜利的玩家返回出去
        }
    }
    return null;
}

export default Board