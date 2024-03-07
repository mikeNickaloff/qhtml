/* created by mike nickaloff
https://www.github.com/mikeNickaloff/qhtml
 */
class QHtmlElement extends HTMLElement {
    constructor() {
        super();
        this.initMutationObserver();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const qhtmlContent = this.preprocess(this.textContent.trim());

        const htmlContent = this.parseQHtml(qhtmlContent);
		
			const regex = /"{1}([^\"]*)"{1}/mg;
        this.innerHTML = htmlContent.replace(regex, (match, p1) => `"${decodeURIComponent(p1)}"`); // Modify this line
    }

    preprocess(i_qhtml) {
        function addSemicolonToProperties(input) {
            const regex = /(\w+)\s*:\s*("[^"]*")(?!;)/g;
            return input.replace(regex, "$1: $2;");
        }
        let preprocessedInput = addSemicolonToProperties(i_qhtml);
        let preprocessedInput2 = this.transformComponentDefinitions(preprocessedInput);

        return preprocessedInput2;
    }


	// unused for now
    transformComponentDefinitions(input) {
        const componentDefRegex = /component\s+(\w+)\s*\{/g;
        return input.replace(componentDefRegex, (match, componentName, properties) => {
            // Preserve the properties as they are, just change the component declaration format
            return `q-component { id: "${componentName}"`;
        });
    }
	
	//parse all text and convert this element's contents into HTML
    parseQHtml(qhtml) {

        // Function to find the matching closing brace for each opening brace and add closing braces accordingly
        function addClosingBraces(input) {
            let depth = 0;
            let result = '';

            for (let i = 0; i < input.length; i++) {
                if (input[i] === '{') {
                    depth++;
                } else if (input[i] === '}') {
                    depth--;
                    if (depth < 0) {
                        result += '} '.repeat(-depth); // Add extra closing braces as needed
                        depth = 0;
                    }
                }
                result += input[i];
            }

            return result + '} '.repeat(depth); // Add any remaining closing braces at the end
        }
		
		function preprocess(i_qhtml) {
			const regex = /"{1}([^\"]*)"{1}/mg;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('[^\\:]+:[^\\"]+"{1}(1:[^\\"]*)"{1}', 'mg')


let m;
var new_qhtml = i_qhtml.replace(regex, (match, p1) => `"${encodeURIComponent(p1)}"`);
while ((m = regex.exec(i_qhtml)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
	//console.log(m);
    m.forEach((match, groupIndex) => {
			
				console.log(`Found	 match, group ${groupIndex}: ${match}`);
		
		
    });
	
}

	return new_qhtml;
		}
        const preprocessedInput = preprocess(qhtml);
        const adjustedInput = addClosingBraces(preprocessedInput);

        function extractPropertiesAndChildren(input) {
            const segments = [];
            let nestedLevel = 0;
            let segmentStart = 0;
            let currentProperty = null;

            for (let i = 0; i < input.length; i++) {
                if (input[i] === "{") {
                    nestedLevel++;
                    if (nestedLevel === 1) {
                        segmentStart = i + 1; // Start after the opening brace
                        const tag = input.substring(0, i).trim();
                        currentProperty = {
                            type: 'element',
                            tag,
                            content: ''
                        };
                    }
                } else if (input[i] === "}") {
                    nestedLevel--;
                    if (nestedLevel === 0 && currentProperty !== null) {
                        // When closing an element, add its content and reset currentProperty
                        currentProperty.content = input.substring(segmentStart, i).trim();
                        segments.push(currentProperty);
                        currentProperty = null;

                        // Reset input to process remaining elements/properties
                        input = input.substring(i + 1).trim();
                        i = -1; // Reset loop index
                    }
                } else if (nestedLevel === 0 && input[i] === ":") {
                    // Handle properties only at the root level (nestedLevel === 0)
                    let propEnd = input.indexOf(";", i);
                    if (propEnd !== -1) {
                        let propertySegment = input.substring(0, propEnd + 1);
                        let [name, value] = propertySegment.split(":").map(s => s.trim());
                        value = value.replace(/";$/, "").replace(/^"/, "");
                        segments.push({
                            type: 'property',
                            name,
                            value
                        });

                        // Adjust the remaining input and restart the loop
                        input = input.substring(propEnd + 1).trim();
                        i = -1;
                    }
                }
            }
			
            return segments;
        }
		



        function processSegment(segment, parentElement) {
            if (segment.type === 'property') {
                if (segment.name === 'content' || segment.name === 'contents' || segment.name === 'text' || segment.name === 'textcontent' || segment.name === 'textcontents' || segment.name === 'innertext') {
                    parentElement.innerHTML = decodeURIComponent(segment.value);
                } else {
                    if (segment.name === 'style' || segment.name === 'script') {
                        parentElement.setAttribute(segment.name, segment.value);

                    } else {
                        parentElement.setAttribute(segment.name, segment.value);
                    }
                }
            } else if (segment.type === 'element') {
                if (segment.tag.includes(',')) {
                    // Split the tag by comma and trim each tag name
                    const tags = segment.tag.split(',').map(tag => tag.trim());
                    // Recursively create nested elements for each tag
                    let currentParent = parentElement;
                    tags.forEach(tag => {
                        const newElement = document.createElement(tag);
                        currentParent.appendChild(newElement);
                        currentParent = newElement; // Update the current parent to the newly created element

                    });
                    const childSegments = extractPropertiesAndChildren(segment.content);
                    childSegments.forEach(childSegment => processSegment(childSegment, currentParent));
                } else {

                    const newElement = document.createElement(segment.tag);

                    if (segment.tag === 'script') {

                        storeAndExecuteScriptLater(segment.content)
                        newElement.text = segment.content;
                        parentElement.appendChild(newElement);

                    } else {
                        if (segment.tag === 'asdf-component') {}
                        else {

                            const childSegments = extractPropertiesAndChildren(segment.content);
                            childSegments.forEach(childSegment => processSegment(childSegment, newElement));
                            parentElement.appendChild(newElement);
                        }
                    }
                }
            }
        }
	
        const root = document.createElement('div');
        const segments = extractPropertiesAndChildren(adjustedInput); // Use the adjusted input
        segments.forEach(segment => processSegment(segment, root));

        return root.innerHTML;
    }
    


//unusd for now
 convertComponents(inputText) {
    const regex = /q-component\s*{\s*id:\s*"([^"]+)"\s*([^}]*)}/g;
    let match;
    
    while((match = regex.exec(inputText)) !== null) {
        const id = match[1];
        const content = match[2].trim();

        class CustomComponent extends HTMLElement {
            connectedCallback() {
                this.innerHTML = content;
            }
        }
        
        customElements.define(id, CustomComponent);

        const elements = document.getElementsByTagName(id);
        for(let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = content;
        }
    }
}

    initMutationObserver() {
        // Create an observer instance linked to a callback function
        const observer = new MutationObserver((mutationsList, observer) => {
            // For each mutation, check if the type is 'childList', indicating added or removed nodes
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // Emit a custom event signaling the innerHTML change
                    this.dispatchEvent(new CustomEvent('contentChanged', {
                            detail: {
                                message: 'Content has changed'
                            }
                        }));
                }
            }
        });

        // Start observing the target node for configured mutations
        observer.observe(this, {
            childList: true,
            subtree: true
        });
    }

}

// Define the new element
customElements.define('q-html', QHtmlElement);




// for script blocks in qhtml code
function storeAndExecuteScriptLater(scriptContent) {
    // Store the script content in a closure
    function deferredExecution() {
        try {
            var scriptFunction = new Function(scriptContent);
            var newElement = document.createElement("script");
            newElement.text = scriptContent;
            document.body.appendChild(newElement);
        } catch (error) {
            console.error('script execution error:', error);
        }
    }

    // Use setTimeout to defer execution
    setTimeout(deferredExecution, 0);
}


// unused for now
const componentRegistry = {};

class QComponent extends HTMLElement {
    constructor() {
        super();
		this.defined = false
		
         this.observer = new MutationObserver(() => this.updateInstances());
        this.observer.observe(this, { childList: true, subtree: true }); 
    }

    connectedCallback() {

        //  this.updateDefinition();
    }
    render() {
		if (this.defined == false) { 
		const id = this.getAttribute('id');
		customElements.define(`${id}`, createQComponentClass());
		 document.querySelectorAll(`${id}`).forEach(function (item) {
            item.innerHTML = this.innerHTML
        })
		this.defined = true;
		}
        this.updateDefinition();
        const id = this.getAttribute('id');

       

    }
    disconnectedCallback() {
        this.observer.disconnect();
        this.invalidateInstances();
    }

    static get observedAttributes() {
        return ['id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'id') {
              this.updateDefinition(oldValue, newValue);
            this.invalidateInstances(oldValue);
        }
    }

    updateDefinition(oldId, newId) {
        const id = newId || this.getAttribute('id');
        if (!id)
            return;

        if (oldId && componentRegistry[oldId]) {
            delete componentRegistry[oldId];
        }

        const templateContent = this.innerHTML;
        componentRegistry[id] = {
            content: templateContent,
            instances: []
        };

        
    }

    updateInstances() {
        const id = this.getAttribute('id');
        if (!id || !componentRegistry[id])
            return;

        componentRegistry[id].content = this.innerHTML;
        componentRegistry[id].instances.forEach(instance => {
            instance.innerHTML = this.innerHTML;
        });
    }

    invalidateInstances(oldId) {
        const id = oldId || this.getAttribute('id');
        if (!id || !componentRegistry[id])
            return;

        componentRegistry[id].instances.forEach(instance => {
            instance.innerHTML = "<div>Invalid component</div>";
        });

        if (!oldId)
            delete componentRegistry[id];
    }
}

customElements.define('q-component', QComponent);


//unused
function createQComponentClass() {
    return class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.applyClassesRecursively(this, []);
        }

        applyClassesRecursively(element, classes) {
            // Add the current element's classes to the array
            if (element.tagName.startsWith('q-')) {
                const classToAdd = element.tagName.toLowerCase().replace('q-', 'q-');
                classes.push(classToAdd);
            }

            // Iterate over each child
            Array.from(element.children).forEach((child) => {
                if (child.tagName.startsWith('q-')) {
                    // If child is a W3 element, recursively apply classes
                    this.applyClassesRecursively(child, [...classes]);
                } else {
                    // Apply all collected classes to the final non-W3 element
                    child.classList.add(...classes);
                }
            });

            // If the element is a W3 element, remove it after processing its children
            if (element.tagName.startsWith('W3-') && element.parentNode) {
                Array.from(element.children).forEach((child) => {
                    element.parentNode.insertBefore(child, element);
                });
                element.parentNode.removeChild(element);
            }
        }
    };
}
// renders all HTML in-place of any q-html  then dispatch event when qhtml conversion is complete 
window.addEventListener("DOMContentLoaded", function () {

    var elems = document.querySelectorAll("q-html")
        elems.forEach(function (elem) {

            elem.render();

        })
        var qhtmlEvent = new CustomEvent('QHTMLContentLoaded', {});
    document.dispatchEvent(qhtmlEvent);
})


