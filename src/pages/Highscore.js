import { Lightning, Colors, Router } from "@lightningjs/sdk";
import Button from "../components/Button";
import fontStyles from "../lib/fontStyles";
import styles from "../lib/styles";
import { clearHighscores, getHighscores } from "../utils";

class Highscore extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      color: Colors("black").get(),
      rect: true,

      Highscores: {
        w: 1920,
        h: 540,
        y: 0,

        Title: {
          y: styles.spacing.large + styles.spacing.medium,
          x: 960,
          mountX: 0.5,

          text: {
            text: "| Highscores |",
            ...fontStyles.title,
            textColor: Colors("green").get(),
          },
        },

        HighscoreItems: {
          y: styles.spacing.large * 3 + styles.spacing.medium,
          x: 960,
          mountX: 0.5,
          shader: null,
          flex: {
            direction: "column",
            alignItems: "center",
          },
        },
      },

      Buttons: {
        w: 1920,
        h: 540,
        y: 1080 - 540 - styles.spacing.medium,
        x: 0,

        flex: {
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },

        PlayAgain: {
          type: Button,
          title: "Play Again",
          shader: null,
          signals: {
            _buttonPressed: "_buttonPressedHandler",
          },
        },

        GoBackHome: {
          type: Button,
          flexItem: {
            marginTop: styles.spacing.medium,
          },
          title: "Home",
          shader: null,
          signals: {
            _buttonPressed: "_buttonPressedHandler",
          },
        },

        ClearHighscores: {
          type: Button,
          flexItem: {
            marginTop: styles.spacing.medium,
          },
          title: "Clear Highscores",
          shader: null,
          signals: {
            _buttonPressed: "_buttonPressedHandler",
          },
        },
      },
    };
  }

  _index = 0;

  _buttonPressedHandler() {
    if (this._index === 2) {
      this.clearScores();

      return;
    }
    const route = this._index === 0 ? "game" : "mainMenu";
    Router.navigate(route);
  }

  _handleDown() {
    this._index++;

    if (this._index >= this.tag("Buttons").children.length) {
      this._index = this.tag("Buttons").children.length - 1;
    }
  }

  _handleUp() {
    this._index--;

    if (this._index < 0) {
      this._index = 0;
      Router.focusWidget("NavBar");
    }
  }

  _getFocused() {
    return this.tag("Buttons").children[this._index];
  }

  _active() {
    this._renderHighscores();
  }

  _renderHighscores() {
    const highscores = getHighscores();

    this.tag("HighscoreItems").children = highscores.map(
      (highscore, _index) => {
        return {
          text: {
            text: `${_index + 1}. ${highscore.date} - ${highscore.score}`,
            ...fontStyles.menuItem,
            textColor: Colors("white").get(),
          },
        };
      }
    );
  }

  clearScores() {
    clearHighscores();
    this._renderHighscores();
  }
}

export default Highscore;
