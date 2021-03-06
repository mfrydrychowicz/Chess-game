import { Square } from '../models/Square';
import { Piece } from '../services/game-logic/pieces/Piece';
import { PieceMapper } from '../utils/PieceMapper';

class SquareView {
    element: HTMLDivElement;

    constructor(public row: number, public column: number, handleBoardClick: (square: Square) => void) {
        const color = row % 2 === column % 2 ? 'light' : 'dark';

        this.element = document.createElement('div');
        this.element.classList.add('square');
        this.element.classList.add(color);
        this.element.dataset.row = String(row);
        this.element.dataset.column = String(column);

        this.element.addEventListener('click', () => {
            handleBoardClick(new Square(this.row, this.column));
        });
    }

    update(piece: Piece | null): void {
        this.clearSquare();
        if (piece) this.addPiece(piece);
    }

    addPiece(piece: Piece): void {
        const wrapper = document.createElement('span');
        const color = piece.color.toLowerCase();
        wrapper.classList.add(color);
        wrapper.innerHTML = PieceMapper.getIcon(piece.name);
        this.element.appendChild(wrapper);
    }

    clearSquare(): void {
        this.element.innerHTML = '';
    }

    select(): void {
        this.element.classList.add('highlighted');
    }

    deselect(): void {
        this.element.classList.remove('highlighted');
    }
}

export { SquareView };
