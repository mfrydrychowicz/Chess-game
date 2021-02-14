import { Colors } from '../enums';
import { Square } from '../models/Square';
import { GameEngine } from '../services/game-logic/GameEngine';
import { Piece } from '../services/game-logic/pieces/Piece';
import { BoardView } from '../views/BoardView';
import { SettingsControls } from '../views/SettingsControls';
import { OpeningView } from '../views/OpeningView';
import { Sound } from '../services/game-logic/Sound';

class GameController {
    boardView: BoardView;
    settingsView: SettingsControls;
    gameEngine: GameEngine;
    activeSquare: Square | null;
    currentPlayer: Colors;
    openingView: OpeningView;
    sound: Sound;

    constructor() {
        this.activeSquare = null;
        this.gameEngine = new GameEngine();
        this.boardView = new BoardView(this.handleUserClick);
        this.settingsView = new SettingsControls();
        this.openingView = new OpeningView();
        this.currentPlayer = Colors.WHITE;
        this.sound = new Sound();
        this.updateBoard();
    }

    handleUserClick = (square: Square): void => {
        const selectedPiece = this.gameEngine.board.getPiece(square);

        if (this.activeSquare) {
            const legalMoves = this.gameEngine.getLegalMoves(this.activeSquare);
            const isLegalMove = legalMoves.some((move) => square?.row === move.row && square?.column === move.column);

            if (isLegalMove) {
                this.playSound(this.activeSquare, square);
                this.gameEngine.movePiece(this.activeSquare, square, false);
                this.boardView.render(this.gameEngine.board);
                this.changePlayer();
            }
            this.activeSquare = null;
            this.boardView.deselectSquares();
        } else if (this.isCurrentPlayer(selectedPiece)) {
            const legalMoves = this.gameEngine.getLegalMoves(square);
            this.boardView.selectSquares(legalMoves);
            this.activeSquare = square;
        }
    };

    private playSound(location: Square, destination: Square): void {
        const locationPiece = this.gameEngine.board.getPiece(location);
        const destinationPiece = this.gameEngine.board.getPiece(destination);

        if (locationPiece && destinationPiece) {
            this.sound.playCapturingMoveSound();
        } else {
            this.sound.playNormalMoveSound();
        }
    }

    private isCurrentPlayer(selectedPiece: Piece | null): boolean {
        return this.currentPlayer === selectedPiece?.color;
    }

    private changePlayer(): void {
        this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
    }

    updateBoard(): void {
        this.boardView.render(this.gameEngine.board);
    }
}

export { GameController };
