'use strict';

const _ = require('lodash');

/**
 * The input options
 *
 * @class InputOptions
 */

/**
* The Low attribute. 
*
* @default Low
* @property {string} Low
*/

/**
* The Mid attribute. 
*
* @default Mid
* @property {string} Mid
*/

/**
* The High attribute. 
*
* @default High
* @property {string} High
*/

/**
* The Off attribute. 
*
* @default Off
* @property {string} Off
*/

/**
* The Status attribute.
*
* @default ?
* @property {string} Status
*/

/**
* The Base attribute.
*
* @default SI
* @private
* @property {string} Base
*/

const DisplayDimOptions = {
    Low: ' DAR',
    Mid: ' DIM',
    High: ' BRI',
    Off: ' OFF',
    Status: ' ?',
    Base: 'SSDIM'
};

module.exports = DisplayDimOptions;
