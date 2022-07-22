import Game from "./pages/Game"
import Highscore from "./pages/Highscore"
import MainMenu from "./pages/MainMenu"

export default{
    root: "mainMenu",
    routes: [
        {
            path: "mainMenu",
            component: MainMenu,
            widgets: ["Navbar"],
        },
        {
            path: "highScore",
            component: Highscore,
            widgets: ["Navbar"],
        },
        {
            path: "game",
            component: Game
        },
    ]
}