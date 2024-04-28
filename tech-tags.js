class TechPanel extends HTMLElement {
    constructor() {
        super();
        this.observeAttributes();
    }

    // Function to observe attribute changes
    observeAttributes() {
        const observer = new MutationObserver(() => {
            this.updateStyle();
        });
        observer.observe(this, {
            attributes: true // Listen to attribute changes
        });
    }

    connectedCallback() {
        this.updateStyle();
    }

    // Function to update the style of child div elements
    updateStyle() {
        const children = this.querySelectorAll(':scope > *');
        children.forEach(child => {
            
            Array.from(child.attributes).forEach(attr => {
                const name = attr.name;
                const value = attr.value;
                if (name.startsWith('tech-')) {
                    // Convert attribute name to CSS property format
                    const cssVarName = '--' + name;
                    child.style.setProperty(cssVarName, value);
                }
            });
            child.style.backgroundImage = 'paint(tech-panel)';
        });
    }
}

// Define the custom element
customElements.define('tech-panel', TechPanel);


