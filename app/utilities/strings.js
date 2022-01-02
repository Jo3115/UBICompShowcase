/**
 * @fileoverview this file contains functions to manipulate strings during render.
 */

/**
 * CapitalizeWords, function to convert string to "Capital Case"
 * @param {string} str - string to convert
 * @returns {string} - converted string
 */
export function CapitalizeWords(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }