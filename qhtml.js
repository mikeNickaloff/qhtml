class QHtmlElement extends HTMLElement {
     constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const qhtmlContent = this.textContent.trim();
        const htmlContent = this.parseQHtml(qhtmlContent);
        this.innerHTML = htmlContent;  // Modify this line
    }

    parseQHtml(qhtml) {

    function extractPropertiesAndChildren(input) {
        const segments = [];
        let nestedLevel = 0;
        let segmentStart = 0;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === "{") {
                if (nestedLevel === 0) segmentStart = i;
                nestedLevel++;
            } else if (input[i] === "}") {
                nestedLevel--;
                if (nestedLevel === 0) {
                    segments.push({
                        type: 'element',
                        tag: input.substring(0, segmentStart).trim(),
                        content: input.substring(segmentStart + 1, i)
                    });
                    input = input.substr(i + 1).trim(); // Adjust the remaining input
                    i = -1;  // Restart the loop
                }
            } else if (nestedLevel === 0 && input[i] === ":") {
                let propEnd = input.indexOf(";", i);
                if (propEnd !== -1) {
                    let propertySegment = input.substring(0, propEnd + 1);
                    let [name, value] = propertySegment.split(":").map(s => s.trim());
                    value = value.replace(/";$/, "").replace(/^"/, "");
                    segments.push({
                        type: 'property',
                        name: name,
                        value: value
                    });
                    input = input.substr(propEnd + 1).trim(); // Adjust the remaining input
                    i = -1;  // Restart the loop
                }
            }
        }

        return segments;
    }

    function processSegment(segment, parentElement) {
        if (segment.type === 'property') {
            if (segment.name === 'content' || segment.name === 'contents') {
                parentElement.innerHTML = segment.value;
            } else {
                parentElement.setAttribute(segment.name, segment.value);
            }
        } else if (segment.type === 'element') {
            const newElement = document.createElement(segment.tag);
            parentElement.appendChild(newElement);
            const childSegments = extractPropertiesAndChildren(segment.content);
            childSegments.forEach(childSegment => processSegment(childSegment, newElement));
        }
    }

    const root = document.createElement('div');
    const segments = extractPropertiesAndChildren(qhtml);
    segments.forEach(segment => processSegment(segment, root));

    return root.innerHTML;
}

 
}

// Define the new element
customElements.define('q-html', QHtmlElement);


window.addEventListener("DOMContentLoaded", function() {
	var elems = document.querySelectorAll("q-html")
elems.forEach(function(elem) { 
	elem.render();
})
var qhtmlEvent = new CustomEvent('QHTMLContentLoaded', {
    });
document.dispatchEvent(qhtmlEvent);

 })