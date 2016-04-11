'use strict';

const _ = require('lodash');

class DenonRegex {

  _getValueKeys(options) {

    const result = _(options).omit(['Status', 'Base', 'regex']);
    return result;
  }

  _constructSearchRegex(options) {

    const keys = this._getValueKeys(options);
    let inputs = '';

    _(keys).each((input) => {
      inputs += `${input}|`;
    });

    return inputs.substr(0, inputs.length - 1);
  }

  constructStatusChangedRegex(options) {

    const searchString = this._constructSearchRegex(options);
    const regex = new RegExp(`(?:(${options.Base}))(?:(${searchString}))\r`);

    return regex;
  }
}

module.exports = new DenonRegex();
