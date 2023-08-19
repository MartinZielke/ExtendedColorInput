/**
 * Custom HTMLInputElement that allows for easy copying of color values to clipboard.
 * @extends HTMLInputElement
 */
declare class ColorCopy extends HTMLInputElement {
    /** Hidden input element used to store the color value. */
    hiddenValueInput: HTMLInputElement;
    /** Notification element used to display copy messages. */
    notification: HTMLSpanElement;
    /** Whether to automatically copy the color value to clipboard on input. */
    autocopy: boolean;
    /** Whether to display a copy message when the color value is copied. */
    copymsg: boolean;
    /** The time in seconds for which to display the copy message. */
    copymsgtime: string | undefined;
    /**
     * Returns an array of attribute names to observe for changes.
     * @returns {string[]} An array of attribute names.
     */
    static get observedAttributes(): string[];
    /**
     * Creates a new instance of ColorCopy.
     */
    constructor();
    /**
     * Throws an error if the input type is not "color".
     * @param {string} type - The input type to check.
     */
    throwErrorOnWrongType(type: string): void;
    /**
     * Called when an observed attribute changes.
     * @param {string} name - The name of the attribute that changed.
     * @param {string} oldValue - The old value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
