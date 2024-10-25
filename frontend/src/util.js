const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

export function calculateWinnder(squares) {

	console.log(`calculateWinnder - ${squares}`);
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] 
			&& squares[a]!=='0' && squares[b]!=='0' && squares[c]!=='0') {
			return squares[a];
		}
	}
	return null;
}

// export function calculateGameWinner(boardWinners){
// 	console.log('calculateGameWinner', boardWinners);
// 	for(let i = 0; i < lines.length; i++) {
// 		const [a,b,c] = lines[i];
// 		if(boardWinners[a] && boardWinners[b] && boardWinners[c]
// 			&& boardWinners[a] === boardWinners[b] && boardWinners[c]) {
// 				return boardWinners[a];
// 			}
// 		)
// 	}
// }

// eslint-disable-next-line no-extend-native
String.prototype.sector = function (index) {
	return this.slice(index * 9, index * 9 + 9);
}

export function ReplaceAt(value, index, replacement){
	return value.substring(0,index) + replacement + value.substring(index + replacement.length);
}

// eslint-disable-next-line no-extend-native
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}