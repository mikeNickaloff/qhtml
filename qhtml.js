/* created by mike nickaloff
https://www.github.com/mikeNickaloff/qhtml
*/
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

 
    const preprocessedInput = qhtml;
    const adjustedInput = addClosingBraces(preprocessedInput);

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
        	    parentElement.appendChild(newElement);
	            const childSegments = extractPropertiesAndChildren(segment.content);
	            childSegments.forEach(childSegment => processSegment(childSegment, newElement));
		}
        }
    }

    const root = document.createElement('div');
    const segments = extractPropertiesAndChildren(adjustedInput); // Use the adjusted input
    segments.forEach(segment => processSegment(segment, root));

    return root.innerHTML;
}

/*preprocessqhtml(input) {
    const w3TagPattern = /(w3-[\w-]+\s+)+(?=\{)/g; // Pattern to match multiple w3-* tags followed by {

	 let modifiedOpening = '';
        let modifiedClosing = '';
    return input.replace(w3TagPattern, (match) => {
        const tags = match.trim().split(/\s+/); // Split the matched tags
        modifiedOpening = '';
        modifiedClosing = '';

        tags.forEach(function(tag) {
            modifiedOpening += ' ' + tag + ' { '; // Add an opening brace for each tag
            modifiedClosing += '}'; // Add a closing brace for each tag
        });

        return modifiedOpening; // Return the modified opening part
    }).replace(/\{/g, (match, offset, fullString) => {
        // For each opening brace, find the corresponding closing brace and add the modifiedClosing before it
        let nestedLevel = 1;
        for (let i = offset + 1; i < fullString.length; i++) {
            if (fullString[i] === '{') nestedLevel++;
            if (fullString[i] === '}') nestedLevel--;

            if (nestedLevel === 0) {
                // Insert the modifiedClosing before the corresponding closing brace
                return '{' + fullString.substring(offset + 1, i) + modifiedClosing + fullString.substring(i);
            }
        }

        return match; // Return the original match if no modification is needed
    });
}  */


 
}

// Define the new element
customElements.define('q-html', QHtmlElement);


window.addEventListener("DOMContentLoaded", function() {
	var elems = document.querySelectorAll("q-html")
	elems.forEach(function(elem) { 
		elem.render();
	})
	var qhtmlEvent = new CustomEvent('QHTMLContentLoaded', { });
	document.dispatchEvent(qhtmlEvent);

 })



