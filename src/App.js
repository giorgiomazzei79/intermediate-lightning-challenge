/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Utils, Router, Lightning } from "@lightningjs/sdk";
import routes from "./routes";
import colors from "./lib/colors";
import NavBar from "./widgets/Navbar";

export default class App extends Router.App {
  _setup() {
    Router.startRouter(routes);
  }

  static _template() {
    return {
      ...super._template(),
      w: 1920,
      h: 1080,

      color: 0xff333333,
      rect: true,
      Widgets: {
        NavBar: {
          type: NavBar,
        },
      },
    };
  }

  _negative = false;

  set negative(value) {
    this._negative = value;

    if (value) {
      this.patch({
        shader: {
          type: Lightning.shaders.Inversion,
        },
      });
    } else {
      this.patch({
        shader: null,
      });
    }
  }

  get negative() {
    return this._negative;
  }

  $toggleDarkMode() {
    this.negative = !this.negative;
  }

  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }

  static colors() {
    return colors;
  }

}
