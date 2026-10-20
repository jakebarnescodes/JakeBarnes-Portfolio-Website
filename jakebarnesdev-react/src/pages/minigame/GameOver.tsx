import './GameOver.css';

export function GameOver({ score }: { score: React.RefObject<number> }) {
    return (
        <div className="game-over-container">
            <p className="game-over-text">GAME OVER</p>
            <p className="final-score-text">Score: {score.current}</p>
            <div className="game-over-button-container">
                <button className="menu-button" onClick={() => window.location.reload()}>
                    Retry
                </button>
                <button className="menu-button" onClick={() => window.location.href = '/'}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}