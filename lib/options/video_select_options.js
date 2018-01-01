'use strict';

/**
 * The video select options
 *
 * @class VideoSelectOptions
 */

/**
* The DVD attribute.
*
* @default DVD
* @property {string} DVD
*/

/**
* The BD attribute.
*
* @default BD
* @property {string} BD
*/

/**
* The CD attribute.
*
* @default CD
* @property {string} CD
*/

/**
* The TV attribute.
*
* @default TV
* @property {string} TV
*/

/**
* The Sattalite attribute.
*
* @default SAT/CBL
* @property {string} Sattalite
*/

/**
* The Cable attribute.
*
* @default SAT/CBL
* @property {string} Cable
*/

/**
* The Game attribute.
*
* @default GAME
* @property {string} Game
*/

/**
* The Aux1 attribute.
*
* @default AUX1
* @property {string} Aux1
*/

/**
 * The Aux2 attribute.
 *
 * @default AUX2
 * @property {string} Aux2
 */

/**
 * The MPlay attribute.
 *
 * @default MPLAY
 * @property {string} MPlay
 */

/**
  * The Video Select mode cancel
  *
  * @default SOURCE
  * @property {string} Cancel
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
* @default SV
* @private
* @property {string} Base
*/

const VideoSelectOptions = {
    CD: 'CD',
    DVD: 'DVD',
    BD: 'BD',
    TV: 'TV',
    Sattalite: 'SAT/CBL',
    Cable: 'SAT/CBL',
    Game: 'GAME',
    Aux1: 'AUX1',
    Aux2: 'AUX2',
    MPlay: 'MPLAY',
    Cancel: 'SOURCE',
    Status: '?',
    Base: 'SV'
};

module.exports = VideoSelectOptions;
