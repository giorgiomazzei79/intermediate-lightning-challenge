import Game from "./pages/Game"
import Highscore from "./pages/Highscore"
import MainMenu from "./pages/MainMenu"

export default{
    root: "mainMenu",
    routes: [
        {
            path: "mainMenu",
            component: MainMenu
        },
        {
            path: "highScore",
            component: Highscore
        },
        {
            path: "game",
            component: Game
        },
    ]
}