/**
 * @module
 * @export {Function} getDelta
 * @dependencies [ getOriginalEvent ]
 */

import { getOriginalEvent } from './get_original_event';

const DELTA_SCALE = {
    STANDARD: 1,
    OTHERS: -3
};

const DELTA_MODE = [1.0, 28.0, 500.0];

let getDeltaMode = (mode) => DELTA_MODE[mode] || DELTA_MODE[0];

/**
 * Normalizing wheel delta
 *
 * @param {Object} evt: event object
 */
export let getDelta = (evt) => {
    // get original DOM event
    evt = getOriginalEvent(evt);

    if ('deltaX' in evt) {
        const mode = getDeltaMode(evt.deltaMode);

        return {
            x: evt.deltaX / DELTA_SCALE.STANDARD * mode,
            y: evt.deltaY / DELTA_SCALE.STANDARD * mode
        };
    }

    if ('wheelDeltaX' in evt) {
        return {
            x: evt.wheelDeltaX / DELTA_SCALE.OTHERS,
            y: evt.wheelDeltaY / DELTA_SCALE.OTHERS
        };
    }

    // ie with touchpad
    return {
        x: 0,
        y: evt.wheelDelta / DELTA_SCALE.OTHERS
    };
};
