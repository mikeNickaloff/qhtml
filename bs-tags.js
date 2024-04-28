function createBSCustomElementClass() {
    return class extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.applyClassesRecursively(this, []);
        }

        applyClassesRecursively(element, classes) {
            // Add the current element's classes to the array
            if (element.tagName.startsWith('BS-')) {
                const classToAdd = element.tagName.toLowerCase().replace('bs-', '');
                classes.push(classToAdd);
            }

            // Iterate over each child
            Array.from(element.children).forEach((child) => {
                if (child.tagName.startsWith('BS-') || child.tagName.startsWith('W3-')) {
                    // If child is a W3 element, recursively apply classes
                    this.applyClassesRecursively(child, [...classes]);
                } else {
                    // Apply all collected classes to the final non-W3 element
                    child.classList.add(...classes);
                }
            });

            // If the element is a W3 element, remove it after processing its children
            if ((element.tagName.startsWith('BS-') && element.parentNode) || (element.tagName.startsWith('W3-') && element.parentNode)) {
                Array.from(element.children).forEach((child) => {
                    element.parentNode.insertBefore(child, element);
                });
                element.parentNode.removeChild(element);
            }
        }
    };
}


customElements.define("bs-accordion", createBSCustomElementClass());

 

customElements.define("bs-bg-body", createBSCustomElementClass());
customElements.define("bs-bg-danger", createBSCustomElementClass());
customElements.define("bs-bg-dark", createBSCustomElementClass());
customElements.define("bs-bg-gradient", createBSCustomElementClass());
customElements.define("bs-bg-info", createBSCustomElementClass());
customElements.define("bs-bg-light", createBSCustomElementClass());
customElements.define("bs-bg-primary", createBSCustomElementClass());
customElements.define("bs-bg-secondary", createBSCustomElementClass());
customElements.define("bs-bg-success", createBSCustomElementClass());
customElements.define("bs-bg-transparent", createBSCustomElementClass());
customElements.define("bs-bg-warning", createBSCustomElementClass());
customElements.define("bs-bg-white", createBSCustomElementClass());
customElements.define("bs-link-danger", createBSCustomElementClass());
customElements.define("bs-link-dark", createBSCustomElementClass());
customElements.define("bs-link-info", createBSCustomElementClass());
customElements.define("bs-link-light", createBSCustomElementClass());
customElements.define("bs-link-primary", createBSCustomElementClass());
customElements.define("bs-link-secondary", createBSCustomElementClass());
customElements.define("bs-link-success", createBSCustomElementClass());
customElements.define("bs-link-warning", createBSCustomElementClass());
customElements.define("bs-text-danger", createBSCustomElementClass());
customElements.define("bs-text-dark", createBSCustomElementClass());
customElements.define("bs-text-info", createBSCustomElementClass());
customElements.define("bs-text-light", createBSCustomElementClass());
customElements.define("bs-text-primary", createBSCustomElementClass());
customElements.define("bs-text-secondary", createBSCustomElementClass());
customElements.define("bs-text-success", createBSCustomElementClass());
customElements.define("bs-text-warning", createBSCustomElementClass());
customElements.define("bs-text-white", createBSCustomElementClass());
 

customElements.define("bs-custom-checkbox", createBSCustomElementClass());
customElements.define("bs-custom-file", createBSCustomElementClass());
customElements.define("bs-custom-radio", createBSCustomElementClass());
customElements.define("bs-custom-range", createBSCustomElementClass());
customElements.define("bs-custom-select", createBSCustomElementClass());
customElements.define("bs-custom-switch", createBSCustomElementClass());
 

//customElements.define("bs-d-*-block", createBSCustomElementClass());
//customElements.define("bs-d-*-flex", createBSCustomElementClass());
//customElements.define("bs-d-*-inline", createBSCustomElementClass());
//customElements.define("bs-d-*-inline-block", createBSCustomElementClass());
//customElements.define("bs-d-*-inline-flex", createBSCustomElementClass());
//cus//tomElements.define("bs-d-*-none", createBSCustomElementClass());
//cust//omElements.define("bs-d-*-table", createBSCustomElementClass());
//custo//mElements.define("bs-d-*-table-cell", createBSCustomElementClass());
customElements.define("bs-d-grid", createBSCustomElementClass());
customElements.define("bs-d-lg-grid", createBSCustomElementClass());
customElements.define("bs-d-lg-table-row", createBSCustomElementClass());
customElements.define("bs-d-md-grid", createBSCustomElementClass());
customElements.define("bs-d-md-table-row", createBSCustomElementClass());
customElements.define("bs-d-print-...", createBSCustomElementClass());
customElements.define("bs-d-print-flex", createBSCustomElementClass());
customElements.define("bs-d-print-grid", createBSCustomElementClass());
customElements.define("bs-d-print-inline-flex", createBSCustomElementClass());
customElements.define("bs-d-print-table", createBSCustomElementClass());
customElements.define("bs-d-print-table-cell", createBSCustomElementClass());
customElements.define("bs-d-print-table-row", createBSCustomElementClass());
customElements.define("bs-d-sm-grid", createBSCustomElementClass());
customElements.define("bs-d-sm-table-row", createBSCustomElementClass());
customElements.define("bs-d-table-row", createBSCustomElementClass());
customElements.define("bs-d-xl-grid", createBSCustomElementClass());
customElements.define("bs-d-xl-table-row", createBSCustomElementClass());
customElements.define("bs-d-xxl-block", createBSCustomElementClass());
customElements.define("bs-d-xxl-flex", createBSCustomElementClass());
customElements.define("bs-d-xxl-grid", createBSCustomElementClass());
customElements.define("bs-d-xxl-inline", createBSCustomElementClass());
customElements.define("bs-d-xxl-inline-block", createBSCustomElementClass());
customElements.define("bs-d-xxl-inline-flex", createBSCustomElementClass());
customElements.define("bs-d-xxl-none", createBSCustomElementClass());
customElements.define("bs-d-xxl-table", createBSCustomElementClass());
customElements.define("bs-d-xxl-table-cell", createBSCustomElementClass());
customElements.define("bs-d-xxl-table-row", createBSCustomElementClass());
 

customElements.define("bs-dropdown", createBSCustomElementClass());

customElements.define("bs-dropdown-divider", createBSCustomElementClass());
customElements.define("bs-dropdown-header", createBSCustomElementClass());
customElements.define("bs-dropdown-item", createBSCustomElementClass());
customElements.define("bs-dropdown-item-text", createBSCustomElementClass());
customElements.define("bs-dropdown-menu", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-dark", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-end", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-lg-end", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-lg-start", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-md-end", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-md-start", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-right", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-sm-end", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-sm-start", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-start", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-xl-end", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-xl-start", createBSCustomElementClass());
customElements.define("bs-dropdown-toggle", createBSCustomElementClass());
customElements.define("bs-dropdown-toggle-split", createBSCustomElementClass());
customElements.define("bs-dropleft", createBSCustomElementClass());
customElements.define("bs-dropright", createBSCustomElementClass());
customElements.define("bs-dropup", createBSCustomElementClass());

 

customElements.define("bs-figure", createBSCustomElementClass());
customElements.define("bs-figure-caption", createBSCustomElementClass());
customElements.define("bs-figure-img", createBSCustomElementClass());
 

//customElements.define("bs-align-content-*-around", createBSCustomElementClass());
//customElements.define("bs-align-content-*-center", createBSCustomElementClass());
//customElements.define("bs-align-content-*-end", createBSCustomElementClass());
//customElements.define("bs-align-content-*-start", createBSCustomElementClass());
//customElements.define("bs-align-content-*-stretch", createBSCustomElementClass());
//customElements.define("bs-align-items-*-baseline", createBSCustomElementClass());
//customElements.define("bs-align-items-*-center", createBSCustomElementClass());
//customElements.define("bs-align-items-*-end", createBSCustomElementClass());
//customElements.define("bs-align-items-*-start", createBSCustomElementClass());
//customElements.define("bs-align-items-*-stretch", createBSCustomElementClass());
//customElements.define("bs-align-self-*-baseline", createBSCustomElementClass());
//customElements.define("bs-align-self-*-center", createBSCustomElementClass());
//customElements.define("bs-align-self-*-end", createBSCustomElementClass());
//customElements.define("bs-align-self-*-start", createBSCustomElementClass());
//customElements.define("bs-align-self-*-stretch", createBSCustomElementClass());
//customElements.define("bs-flex-*-column", createBSCustomElementClass());
//customElements.define("bs-flex-*-column-reverse", createBSCustomElementClass());
//customElements.define("bs-flex-*-grow-0", createBSCustomElementClass());
//customElements.define("bs-flex-*-grow-1", createBSCustomElementClass());
//customElements.define("bs-flex-*-nowrap", createBSCustomElementClass());
//customElements.define("bs-flex-*-row", createBSCustomElementClass());
//customElements.define("bs-flex-*-row-reverse", createBSCustomElementClass());
//customElements.define("bs-flex-*-shrink-0", createBSCustomElementClass());
//customElements.define("bs-flex-*-shrink-1", createBSCustomElementClass());
//customElements.define("bs-flex-*-wrap", createBSCustomElementClass());
//customElements.define("bs-flex-*-wrap-reverse", createBSCustomElementClass());
customElements.define("bs-flex-fill", createBSCustomElementClass());
customElements.define("bs-flex-lg-fill", createBSCustomElementClass());
customElements.define("bs-flex-md-fill", createBSCustomElementClass());
customElements.define("bs-flex-sm-fill", createBSCustomElementClass());
customElements.define("bs-flex-xl-fill", createBSCustomElementClass());
customElements.define("bs-flex-xxl-column", createBSCustomElementClass());
customElements.define("bs-flex-xxl-column-reverse", createBSCustomElementClass());
customElements.define("bs-flex-xxl-fill", createBSCustomElementClass());
customElements.define("bs-flex-xxl-grow-0", createBSCustomElementClass());
customElements.define("bs-flex-xxl-grow-1", createBSCustomElementClass());
customElements.define("bs-flex-xxl-nowrap", createBSCustomElementClass());
customElements.define("bs-flex-xxl-row", createBSCustomElementClass());
customElements.define("bs-flex-xxl-row-reverse", createBSCustomElementClass());
customElements.define("bs-flex-xxl-shrink-0", createBSCustomElementClass());
customElements.define("bs-flex-xxl-shrink-1", createBSCustomElementClass());
customElements.define("bs-flex-xxl-wrap", createBSCustomElementClass());
customElements.define("bs-flex-xxl-wrap-reverse", createBSCustomElementClass());
//customElements.define("bs-justify-content-*-around", createBSCustomElementClass());
//customElements.define("bs-justify-content-*-between", createBSCustomElementClass());
//customElements.define("bs-justify-content-*-center", createBSCustomElementClass());
//customElements.define("bs-justify-content-*-end", createBSCustomElementClass());
//customElements.define("bs-justify-content-*-start", createBSCustomElementClass());
customElements.define("bs-justify-content-around", createBSCustomElementClass());
customElements.define("bs-justify-content-between", createBSCustomElementClass());
customElements.define("bs-justify-content-center", createBSCustomElementClass());
customElements.define("bs-justify-content-end", createBSCustomElementClass());
customElements.define("bs-justify-content-evenly", createBSCustomElementClass());
customElements.define("bs-justify-content-lg-around", createBSCustomElementClass());
customElements.define("bs-justify-content-lg-between", createBSCustomElementClass());
customElements.define("bs-justify-content-lg-center", createBSCustomElementClass());
customElements.define("bs-justify-content-lg-end", createBSCustomElementClass());
customElements.define("bs-justify-content-lg-evenly", createBSCustomElementClass());
customElements.define("bs-justify-content-lg-start", createBSCustomElementClass());
customElements.define("bs-justify-content-md-around", createBSCustomElementClass());
customElements.define("bs-justify-content-md-between", createBSCustomElementClass());
customElements.define("bs-justify-content-md-center", createBSCustomElementClass());
customElements.define("bs-justify-content-md-end", createBSCustomElementClass());
customElements.define("bs-justify-content-md-evenly", createBSCustomElementClass());
customElements.define("bs-justify-content-md-start", createBSCustomElementClass());
customElements.define("bs-justify-content-sm-around", createBSCustomElementClass());
customElements.define("bs-justify-content-sm-between", createBSCustomElementClass());
customElements.define("bs-justify-content-sm-center", createBSCustomElementClass());
customElements.define("bs-justify-content-sm-end", createBSCustomElementClass());
customElements.define("bs-justify-content-sm-evenly", createBSCustomElementClass());
customElements.define("bs-justify-content-sm-start", createBSCustomElementClass());
customElements.define("bs-justify-content-start", createBSCustomElementClass());
customElements.define("bs-justify-content-xl-around", createBSCustomElementClass());
customElements.define("bs-justify-content-xl-between", createBSCustomElementClass());
customElements.define("bs-justify-content-xl-center", createBSCustomElementClass());
customElements.define("bs-justify-content-xl-end", createBSCustomElementClass());
customElements.define("bs-justify-content-xl-evenly", createBSCustomElementClass());
customElements.define("bs-justify-content-xl-start", createBSCustomElementClass());
customElements.define("bs-justify-content-xxl-around", createBSCustomElementClass());
customElements.define("bs-justify-content-xxl-between", createBSCustomElementClass());
customElements.define("bs-justify-content-xxl-center", createBSCustomElementClass());
customElements.define("bs-justify-content-xxl-end", createBSCustomElementClass());
customElements.define("bs-justify-content-xxl-evenly", createBSCustomElementClass());
customElements.define("bs-justify-content-xxl-start", createBSCustomElementClass());
//customElements.define("bs-order-*-#", createBSCustomElementClass());
customElements.define("bs-order-0", createBSCustomElementClass());
customElements.define("bs-order-1", createBSCustomElementClass());
customElements.define("bs-order-first", createBSCustomElementClass());
customElements.define("bs-order-last", createBSCustomElementClass());
customElements.define("bs-order-lg-0", createBSCustomElementClass());
customElements.define("bs-order-lg-first", createBSCustomElementClass());
customElements.define("bs-order-lg-last", createBSCustomElementClass());
customElements.define("bs-order-md-0", createBSCustomElementClass());
customElements.define("bs-order-md-first", createBSCustomElementClass());
customElements.define("bs-order-md-last", createBSCustomElementClass());
customElements.define("bs-order-sm-0", createBSCustomElementClass());
customElements.define("bs-order-sm-first", createBSCustomElementClass());
customElements.define("bs-order-sm-last", createBSCustomElementClass());
customElements.define("bs-order-xl-0", createBSCustomElementClass());
customElements.define("bs-order-xl-first", createBSCustomElementClass());
customElements.define("bs-order-xl-last", createBSCustomElementClass());
customElements.define("bs-order-xxl-0", createBSCustomElementClass());
customElements.define("bs-order-xxl-first", createBSCustomElementClass());
customElements.define("bs-order-xxl-last", createBSCustomElementClass());
(async function() {
async function loadScriptBlob(url) {
  try {
    // Fetch the JavaScript file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Read the response as a Blob
    const blob = await response.blob();

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a new script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = blobUrl;

    // Append the script to the end of the document
    document.body.appendChild(script);

    // Optional: Cleanup the blob URL after the script is loaded
    script.onload = () => {
      URL.revokeObjectURL(blobUrl);
    };
  } catch (error) {
    console.error('Failed to load script:', error);
  }
}

// Example usage
loadScriptBlob('bs.js');



async function loadStylesheet(url) {
  try {
    // Fetch the CSS file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Read the response as a Blob
    const blob = await response.blob();

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a new link element for the stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = blobUrl;

    // Append the link to the end of the document
    document.body.appendChild(link);

    // Optional: Cleanup the blob URL once it is no longer needed
    link.onload = () => {
      URL.revokeObjectURL(blobUrl);
    };
  } catch (error) {
    console.error('Failed to load stylesheet:', error);
  }
}

// Example usage
loadStylesheet('bs.css');
})();