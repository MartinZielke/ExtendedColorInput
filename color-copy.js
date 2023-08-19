"use strict";
/**
 * Custom HTMLInputElement that allows for easy copying of color values to clipboard.
 * @extends HTMLInputElement
 */
class ColorCopy extends HTMLInputElement {
    /**
     * Returns an array of attribute names to observe for changes.
     * @returns {string[]} An array of attribute names.
     */
    static get observedAttributes() {
        return ["type", "data-autocopy", "data-nocopymsg", "data-copymsgtime"];
    }
    /**
     * Creates a new instance of ColorCopy.
     */
    constructor() {
        var _a, _b;
        super();
        // Ensure that the input type is "color"
        this.throwErrorOnWrongType(this.type);
        // Create a hidden input element to store the color value
        this.hiddenValueInput = document.createElement("input");
        this.hiddenValueInput.readOnly = true;
        // Position the hidden input element off-screen and set its value to black
        this.hiddenValueInput.style.position = "fixed";
        this.hiddenValueInput.style.left = "0";
        this.hiddenValueInput.style.top = "0";
        this.hiddenValueInput.style.transform = "translate(-100%)";
        this.hiddenValueInput.style.opacity = "0";
        this.hiddenValueInput.value = "#000000";
        // Insert the hidden input element before the ColorCopy element
        (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.hiddenValueInput, this.nextSibling);
        // Create a notification element to display copy messages
        this.notification = document.createElement("span");
        this.notification.classList.add("color-copy-notification");
        // Position the notification element off-screen and style it
        this.notification.style.position = "fixed";
        this.notification.style.backgroundColor = "#efefef";
        this.notification.style.borderRadius = "5px";
        this.notification.style.display = "none";
        this.notification.style.padding = "5px";
        this.notification.style.fontSize = "10px";
        this.notification.style.outline = "1px solid lightgrey";
        // Insert the notification element before the ColorCopy element
        (_b = this.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(this.notification, this.nextSibling);
        // Set the autocopy, copymsg, and copymsgtime properties based on data attributes
        this.autocopy = this.dataset.autocopy === "" || this.dataset.autocopy === "true";
        this.copymsg = !(this.dataset.nocopymsg === "" || this.dataset.nocopymsg === "true");
        this.copymsgtime = this.dataset.copymsgtime;
        // Add a "copy" event listener to the hidden input element to display copy messages
        this.hiddenValueInput.addEventListener("copy", () => {
            if (this.copymsg) {
                showCopiedColorNotification();
                hideNotification();
            }
        });
        // Add an "input" event listener to the ColorCopy element to handle color value changes
        this.addEventListener("input", () => {
            if (this.autocopy) {
                // Send this.value to clipboard
                navigator.clipboard.writeText(this.value);
                if (this.copymsg) {
                    showCopiedColorNotification();
                }
                return;
            }
            this.hiddenValueInput.value = this.value;
        });
        // Add a "blur" event listener to the ColorCopy element to handle blur events
        this.addEventListener("blur", () => {
            if (this.autocopy) {
                hideNotification();
                return;
            }
            selectText();
        });
        // Function to display a copy message notification
        const showCopiedColorNotification = () => {
            let colorValue = this.hiddenValueInput.value;
            if (this.autocopy) {
                colorValue = this.value;
            }
            showNotification("Copied color: " + colorValue);
        };
        // Function to select the text in the hidden input element
        const selectText = () => {
            if (this.copymsg) {
                showNotification("Ctrl + C to copy the hex color");
            }
            this.hiddenValueInput.focus();
            this.hiddenValueInput.select();
            hideNotification();
        };
        // Function to display a notification message
        const showNotification = (text) => {
            this.notification.style.display = "inline";
            this.notification.textContent = text;
        };
        // Function to hide the notification message after a delay
        const hideNotification = () => {
            setTimeout(() => {
                this.notification.style.display = "none";
            }, Number(this.copymsgtime || 2) * 1000);
        };
    }
    /**
     * Throws an error if the input type is not "color".
     * @param {string} type - The input type to check.
     */
    throwErrorOnWrongType(type) {
        if (type !== "color") {
            this.type = type;
            throw new Error("Input type must be color. It is now set back to color");
        }
    }
    /**
     * Called when an observed attribute changes.
     * @param {string} name - The name of the attribute that changed.
     * @param {string} oldValue - The old value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "type") {
            this.throwErrorOnWrongType(newValue);
        }
        if (name === "data-autocopy") {
            this.autocopy = newValue === "" || newValue === "true";
        }
        if (name === "data-nocopymsg") {
            this.copymsg = !(newValue === "" || newValue === "true");
        }
        if (name === "data-copymsgtime") {
            this.copymsgtime = newValue;
        }
    }
}
customElements.define("color-copy", ColorCopy, { extends: "input" });
//# sourceMappingURL=color-copy.js.map