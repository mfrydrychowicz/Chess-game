import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Piece } from './Piece';

class Knight extends Piece {
    name = PieceNames.KNIGHT;

    getPossibleMoves(): Square[] {
        let possibleRowMoves = [2, 1, -1, -2, -2, -1, 1, 2];
        let possibleColumnMoves = [1, 2, 2, 1, -1, -2, -2, -1];

        let destination: Square[] = [];
        const { row, column } = this.position;

        for (let i = 0; i < possibleRowMoves.length; i++) {
            destination.push(new Square(row + possibleRowMoves[i], column + possibleColumnMoves[i]));
        }

        const knightPossibleMoves = destination.filter((d) => d.row >= 0 && d.row < 8 && d.column >= 0 && d.column < 8);
        return knightPossibleMoves;
    }
}

export { Knight };
