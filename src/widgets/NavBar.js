import { Lightning, Router } from "@lightningjs/sdk";
import styles from "../styles";

export default class Navbar extends Lightning.Component {
  static selectedTextHighlightStyles = {
    highlight: true,
    highlightOffset: 2,
    highlightColor: 0xffc09d7b,
  };

  static _template() {
    return {
      w: 1920,
      h: Navbar.height,
      rect: true,
      color: 0xfffafafa,
      flex: {
        alignItems: "center",
        paddingTop: styles.spacing.small,
        paddingRight: styles.spacing.large,
        paddingBottom: styles.spacing.small,
        paddingLeft: styles.spacing.large,
      },
      NegativeToggler: {
        flexItem: {
          marginLeft: styles.spacing.small,
        },
        text: {
          textColor: 0xff333333,
          text: "☀️",
          fontSize: styles.fontSizes.large.size,
          lineHeight: styles.fontSizes.large.lineHeight,
          ...Navbar.selectedTextHighlightStyles,
          highlight: false,
        },
      },
    };
  }

  static height = 60;
  static totalHeight = Navbar.height + styles.spacing.small * 2;

  focusedChild = "NegativeToggler";

  _handleChildFocus() {
    this.patch({
      NegativeToggler: {
        text: {
          highlight: this.focusedChild === "NegativeToggler",
        },
      },
    });
  }

  _focus() {
    this._handleChildFocus();
  }

  _unfocus() {
    this.patch({
      NegativeToggler: {
        text: {
          highlight: false,
        },
      },
    });
  }

  _handleEnter() {
      const negativeToggler = this.tag("NegativeToggler");

      negativeToggler.patch({
        text: {
          text: negativeToggler.text.text === "☀️" ? "🌙" : "☀️",
        },
      });
      this.fireAncestors("$toggleDarkMode");
  }

  _handleDown() {
    Router.focusPage();
  }
}
