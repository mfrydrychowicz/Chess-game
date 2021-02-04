import { PieceNames } from '../../../enums';
import { Piece } from '../pieces/Piece';
import { Colors } from '../../../enums/Colors';
import { Square } from '../../../models/Square';

/**
 * This class implements Pawn behavoiur in chess.
 */
class Pawn extends Piece {
    name = PieceNames.PAWN;

    /**
     * Returs possible moves of Pawn.
     */
    getPossibleMoves(): Square[] {
        const moves: Square[] = [];
        let specialMove: Square | null = null;

        // Assume that white plays on bottom
        // row = 0, column = 0 means left upper corner
        const moveDirection = this.color === Colors.WHITE ? -1 : 1;
        const move = this.prepareMove(moveDirection);

        if (!this.hasMoved) {
            specialMove = this.prepareMove(moveDirection * 2);
        }

        if (move) moves.push(move);
        if (specialMove) moves.push(specialMove);

        return moves;
    }

    /**
     * Prepares target Square or returns null in case if move would be outside board.
     */
    private prepareMove(step: number): Square | null {
        const move = new Square(this.position.row + step, this.position.column);

        // Check if out of boundaries
        if ((this.color === Colors.WHITE && move.row === -1) || (this.color === Colors.BLACK && move.row === 8)) {
            return null;
        }
        return move;
    }
}

export { Pawn };
