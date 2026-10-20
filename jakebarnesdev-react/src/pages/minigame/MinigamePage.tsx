import { useRef, useState } from "react";
import { Gameplay } from "./Gameplay";
import { GameOver } from "./GameOver";

export function MinigamePage() {
    const [scene, setScene] = useState("gameplay");
    const score = useRef(0);

    return (
        <div>
            {scene === "gameplay" && (
                <Gameplay
                    score={score}
                    setScene={setScene}
                />
            )}
            {scene === "gameover" && (
                <GameOver
                    score={score}
                />
            )}
        </div>
    );
}