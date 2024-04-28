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
/* customElements.define("bs-active", createBSCustomElementClass());
customElements.define("bs-affix", createBSCustomElementClass());
customElements.define("bs-alert", createBSCustomElementClass());
customElements.define("bs-alert-danger", createBSCustomElementClass());
customElements.define("bs-alert-dismissible", createBSCustomElementClass());
customElements.define("bs-alert-info", createBSCustomElementClass());
customElements.define("bs-alert-link", createBSCustomElementClass());
customElements.define("bs-alert-success", createBSCustomElementClass());
customElements.define("bs-alert-warning", createBSCustomElementClass());
customElements.define("bs-badge", createBSCustomElementClass());
customElements.define("bs-bg-danger", createBSCustomElementClass());
customElements.define("bs-bg-info", createBSCustomElementClass());
customElements.define("bs-bg-primary", createBSCustomElementClass());
customElements.define("bs-bg-success", createBSCustomElementClass());
customElements.define("bs-bg-warning", createBSCustomElementClass());
customElements.define("bs-breadcrumb", createBSCustomElementClass());
customElements.define("bs-btn", createBSCustomElementClass());
customElements.define("bs-btn-block", createBSCustomElementClass());
customElements.define("bs-btn-danger", createBSCustomElementClass());
customElements.define("bs-btn-default", createBSCustomElementClass());
customElements.define("bs-btn-group", createBSCustomElementClass());
customElements.define("bs-btn-group-justified", createBSCustomElementClass());
customElements.define("bs-btn-group-lg", createBSCustomElementClass());
customElements.define("bs-btn-group-sm", createBSCustomElementClass());
customElements.define("bs-btn-group-xs", createBSCustomElementClass());
customElements.define("bs-btn-group-vertical", createBSCustomElementClass());
customElements.define("bs-btn-info", createBSCustomElementClass());
customElements.define("bs-btn-link", createBSCustomElementClass());
customElements.define("bs-btn-lg", createBSCustomElementClass());
customElements.define("bs-btn-primary", createBSCustomElementClass());
customElements.define("bs-btn-sm", createBSCustomElementClass());
customElements.define("bs-btn-success", createBSCustomElementClass());
customElements.define("bs-btn-warning", createBSCustomElementClass());
customElements.define("bs-btn-xs", createBSCustomElementClass());
customElements.define("bs-caption", createBSCustomElementClass());
customElements.define("bs-caret", createBSCustomElementClass());
customElements.define("bs-carousel", createBSCustomElementClass());
customElements.define("bs-carousel-caption", createBSCustomElementClass());
customElements.define("bs-carousel-control", createBSCustomElementClass());
customElements.define("bs-carousel-indicators", createBSCustomElementClass());
customElements.define("bs-carousel-inner", createBSCustomElementClass());
customElements.define("bs-center-block", createBSCustomElementClass());
customElements.define("bs-checkbox", createBSCustomElementClass());
customElements.define("bs-checkbox-inline", createBSCustomElementClass());
customElements.define("bs-clearfix", createBSCustomElementClass());
customElements.define("bs-close", createBSCustomElementClass());
customElements.define("bs-collapse", createBSCustomElementClass());
customElements.define("bs-container", createBSCustomElementClass());
customElements.define("bs-container-fluid", createBSCustomElementClass());
customElements.define("bs-control-label", createBSCustomElementClass());
customElements.define("bs-danger", createBSCustomElementClass());
customElements.define("bs-disabled", createBSCustomElementClass());
customElements.define("bs-disabled", createBSCustomElementClass());
customElements.define("bs-disabled", createBSCustomElementClass());
customElements.define("bs-disabled", createBSCustomElementClass());
customElements.define("bs-divider", createBSCustomElementClass());
customElements.define("bs-dl-horizontal", createBSCustomElementClass());
customElements.define("bs-dropdown", createBSCustomElementClass());
customElements.define("bs-dropdown-header", createBSCustomElementClass());
customElements.define("bs-dropdown-menu", createBSCustomElementClass());
customElements.define("bs-dropdown-menu-right", createBSCustomElementClass());
customElements.define("bs-dropdown-toggle", createBSCustomElementClass());
customElements.define("bs-dropup", createBSCustomElementClass());
customElements.define("bs-embed-responsive", createBSCustomElementClass());
customElements.define("bs-embed-responsive-1", createBSCustomElementClass());
customElements.define("bs-embed-responsive-4", createBSCustomElementClass());
customElements.define("bs-embed-responsive-item", createBSCustomElementClass());

customElements.define("bs-fade", createBSCustomElementClass());
customElements.define("bs-form-control", createBSCustomElementClass());
customElements.define("bs-form-control-feedback", createBSCustomElementClass());
customElements.define("bs-form-control-static", createBSCustomElementClass());
customElements.define("bs-form-group", createBSCustomElementClass());
customElements.define("bs-form-inline", createBSCustomElementClass());
customElements.define("bs-form-horizontal", createBSCustomElementClass());
customElements.define("bs-glyphicon", createBSCustomElementClass());
customElements.define("bs-has-danger", createBSCustomElementClass());

customElements.define("bs-has-feedback", createBSCustomElementClass());
customElements.define("bs-has-success", createBSCustomElementClass());

customElements.define("bs-has-warning", createBSCustomElementClass());

customElements.define("bs-help-block", createBSCustomElementClass());
customElements.define("bs-hidden", createBSCustomElementClass());
//customElements.define("bs-hidden-*", createBSCustomElementClass());
customElements.define("bs-hide", createBSCustomElementClass());

customElements.define("bs-h1", createBSCustomElementClass());
customElements.define("bs-h6", createBSCustomElementClass());
customElements.define("bs-icon-bar", createBSCustomElementClass());
customElements.define("bs-icon-next", createBSCustomElementClass());
customElements.define("bs-icon-prev", createBSCustomElementClass());
customElements.define("bs-img-circle", createBSCustomElementClass());
customElements.define("bs-img-responsive", createBSCustomElementClass());
customElements.define("bs-img-rounded", createBSCustomElementClass());
customElements.define("bs-img-thumbnail", createBSCustomElementClass());
customElements.define("bs-in", createBSCustomElementClass());
customElements.define("bs-info", createBSCustomElementClass());
customElements.define("bs-initialism", createBSCustomElementClass());
customElements.define("bs-input-group", createBSCustomElementClass());
customElements.define("bs-input-group-lg", createBSCustomElementClass());
customElements.define("bs-input-group-sm", createBSCustomElementClass());
customElements.define("bs-input-group-addon", createBSCustomElementClass());

customElements.define("bs-input-group-btn", createBSCustomElementClass());

customElements.define("bs-input-lg", createBSCustomElementClass());
customElements.define("bs-input-sm", createBSCustomElementClass());
customElements.define("bs-invisible", createBSCustomElementClass());
customElements.define("bs-item", createBSCustomElementClass());
customElements.define("bs-jumbotron", createBSCustomElementClass());
customElements.define("bs-label", createBSCustomElementClass());

customElements.define("bs-label-danger", createBSCustomElementClass());
customElements.define("bs-label-info", createBSCustomElementClass());
customElements.define("bs-label-success", createBSCustomElementClass());
customElements.define('.label-warning    ', createBSCustomElementClass());
customElements.define("bs-left", createBSCustomElementClass());
customElements.define("bs-list-group", createBSCustomElementClass());
customElements.define("bs-list-group-item", createBSCustomElementClass());
customElements.define("bs-list-inline", createBSCustomElementClass());
customElements.define("bs-list-unstyled", createBSCustomElementClass());
customElements.define("bs-mark", createBSCustomElementClass());
customElements.define("bs-media", createBSCustomElementClass());
customElements.define("bs-media-body", createBSCustomElementClass());
customElements.define("bs-media-heading", createBSCustomElementClass());
customElements.define("bs-media-list", createBSCustomElementClass());
customElements.define("bs-media-object", createBSCustomElementClass());
customElements.define("bs-modal", createBSCustomElementClass());
customElements.define("bs-modal-body", createBSCustomElementClass());
customElements.define("bs-modal-content", createBSCustomElementClass());
customElements.define("bs-modal-dialog", createBSCustomElementClass());
customElements.define("bs-modal-footer", createBSCustomElementClass());
customElements.define("bs-modal-header", createBSCustomElementClass());
customElements.define("bs-modal-lg", createBSCustomElementClass());
customElements.define("bs-modal-open", createBSCustomElementClass());
customElements.define("bs-modal-sm", createBSCustomElementClass());
customElements.define("bs-modal-title", createBSCustomElementClass());
customElements.define("bs-nav", createBSCustomElementClass());
customElements.define("bs-nav", createBSCustomElementClass());
customElements.define("bs-nav", createBSCustomElementClass());
customElements.define("bs-navbar-nav", createBSCustomElementClass());
customElements.define("bs-nav-justified", createBSCustomElementClass());
customElements.define("bs-nav-stacked", createBSCustomElementClass());
customElements.define("bs-nav-tabs", createBSCustomElementClass());
customElements.define("bs-navbar", createBSCustomElementClass());
customElements.define("bs-navbar-brand", createBSCustomElementClass());
customElements.define("bs-navbar-btn", createBSCustomElementClass());
customElements.define("bs-navbar-collapse", createBSCustomElementClass());
customElements.define("bs-navbar-default", createBSCustomElementClass());
customElements.define("bs-navbar-fixed-bottom", createBSCustomElementClass());
customElements.define("bs-navbar-fixed-top", createBSCustomElementClass());
customElements.define("bs-navbar-form", createBSCustomElementClass());
customElements.define("bs-navbar-header", createBSCustomElementClass());
customElements.define("bs-navbar-inverse", createBSCustomElementClass());
customElements.define("bs-navbar-left", createBSCustomElementClass());
customElements.define("bs-navbar-link", createBSCustomElementClass());
customElements.define("bs-navbar-nav", createBSCustomElementClass());
customElements.define("bs-navbar-right", createBSCustomElementClass());
customElements.define("bs-navbar-static-top", createBSCustomElementClass());
customElements.define("bs-navbar-text", createBSCustomElementClass());
customElements.define("bs-navbar-toggle", createBSCustomElementClass());

customElements.define("bs-next", createBSCustomElementClass());
customElements.define("bs-next", createBSCustomElementClass());
customElements.define("bs-page-header", createBSCustomElementClass());
customElements.define("bs-pager", createBSCustomElementClass());
customElements.define("bs-pagination", createBSCustomElementClass());
customElements.define("bs-pagination-lg", createBSCustomElementClass());
customElements.define("bs-pagination-sm", createBSCustomElementClass());
customElements.define("bs-panel", createBSCustomElementClass());
customElements.define("bs-panel-body", createBSCustomElementClass());
customElements.define("bs-panel-collapse", createBSCustomElementClass());
customElements.define("bs-panel-danger", createBSCustomElementClass());
customElements.define("bs-panel-info", createBSCustomElementClass());
customElements.define("bs-panel-success", createBSCustomElementClass());
customElements.define("bs-panel-warning", createBSCustomElementClass());
customElements.define("bs-panel-footer", createBSCustomElementClass());
customElements.define("bs-panel-group", createBSCustomElementClass());
customElements.define("bs-panel-heading", createBSCustomElementClass());
customElements.define("bs-panel-title", createBSCustomElementClass());
customElements.define("bs-popover", createBSCustomElementClass());
customElements.define("bs-pre-scrollable", createBSCustomElementClass());
customElements.define("bs-prev", createBSCustomElementClass());
customElements.define("bs-previous", createBSCustomElementClass());
customElements.define("bs-progress", createBSCustomElementClass());
customElements.define("bs-progress-bar", createBSCustomElementClass());
customElements.define("bs-progress-bar-danger", createBSCustomElementClass());
customElements.define("bs-progress-bar-info", createBSCustomElementClass());
customElements.define("bs-progress-bar-striped", createBSCustomElementClass());
customElements.define("bs-progress-bar-success", createBSCustomElementClass());
customElements.define("bs-progress-bar-warning", createBSCustomElementClass());
customElements.define("bs-pull-left", createBSCustomElementClass());
customElements.define("bs-pull-right", createBSCustomElementClass());
customElements.define("bs-right", createBSCustomElementClass());
customElements.define("bs-row", createBSCustomElementClass());
customElements.define("bs-row-no-gutters", createBSCustomElementClass());
customElements.define("bs-show", createBSCustomElementClass());
customElements.define("bs-small", createBSCustomElementClass());
customElements.define("bs-sr-only", createBSCustomElementClass());
customElements.define("bs-sr-only-focusable", createBSCustomElementClass());
customElements.define("bs-success", createBSCustomElementClass());
customElements.define("bs-tab-content", createBSCustomElementClass());

customElements.define("bs-tab-pane", createBSCustomElementClass());

customElements.define("bs-table", createBSCustomElementClass());
customElements.define("bs-table-bordered", createBSCustomElementClass());
customElements.define("bs-table-condensed", createBSCustomElementClass());
customElements.define("bs-table-hover", createBSCustomElementClass());
customElements.define("bs-table-responsive", createBSCustomElementClass());
customElements.define("bs-text-capitalize", createBSCustomElementClass());
customElements.define("bs-text-center", createBSCustomElementClass());
customElements.define("bs-text-danger", createBSCustomElementClass());
customElements.define("bs-text-hide", createBSCustomElementClass());
customElements.define("bs-text-info", createBSCustomElementClass());
customElements.define("bs-text-justify", createBSCustomElementClass());
customElements.define("bs-text-left", createBSCustomElementClass());
customElements.define("bs-text-lowercase", createBSCustomElementClass());
customElements.define("bs-text-muted", createBSCustomElementClass());
customElements.define("bs-text-nowrap", createBSCustomElementClass());
customElements.define("bs-text-primary", createBSCustomElementClass());
customElements.define("bs-text-right", createBSCustomElementClass());
customElements.define("bs-text-success", createBSCustomElementClass());
customElements.define("bs-text-uppercase", createBSCustomElementClass());
customElements.define("bs-text-warning", createBSCustomElementClass());
customElements.define("bs-thumbnail", createBSCustomElementClass());
customElements.define("bs-tooltip", createBSCustomElementClass());
//customElements.define("bs-visible-*", createBSCustomElementClass());

customElements.define("bs-visible-print-block", createBSCustomElementClass());
customElements.define("bs-visible-print-inline", createBSCustomElementClass());
customElements.define("bs-hidden-print", createBSCustomElementClass());
customElements.define("bs-warning", createBSCustomElementClass());
customElements.define("bs-well", createBSCustomElementClass());
customElements.define("bs-well-lg", createBSCustomElementClass());
customElements.define("bs-well-sm", createBSCustomElementClass());


customElements.define("bs-accordion-body", createBSCustomElementClass());
customElements.define("bs-accordion-button", createBSCustomElementClass());
customElements.define("bs-accordion-collapse", createBSCustomElementClass());
customElements.define("bs-accordion-flush", createBSCustomElementClass());
customElements.define("bs-accordion-header", createBSCustomElementClass());
customElements.define("bs-accordion-item", createBSCustomElementClass());
customElements.define("bs-collapsed", createBSCustomElementClass());
 

customElements.define("bs-alert-danger", createBSCustomElementClass());
customElements.define("bs-alert-dark", createBSCustomElementClass());
customElements.define("bs-alert-dismissible", createBSCustomElementClass());
customElements.define("bs-alert-heading", createBSCustomElementClass());
customElements.define("bs-alert-info", createBSCustomElementClass());
customElements.define("bs-alert-light", createBSCustomElementClass());
customElements.define("bs-alert-link", createBSCustomElementClass());
customElements.define("bs-alert-primary", createBSCustomElementClass());
customElements.define("bs-alert-secondary", createBSCustomElementClass());
customElements.define("bs-alert-success", createBSCustomElementClass());
customElements.define("bs-alert-warning", createBSCustomElementClass());
customElements.define("bs-fade", createBSCustomElementClass());
 

customElements.define("bs-badge", createBSCustomElementClass());
customElements.define("bs-badge-danger", createBSCustomElementClass());
customElements.define("bs-badge-dark", createBSCustomElementClass());
customElements.define("bs-badge-info", createBSCustomElementClass());
customElements.define("bs-badge-light", createBSCustomElementClass());
customElements.define("bs-badge-pill", createBSCustomElementClass());
customElements.define("bs-badge-primary", createBSCustomElementClass());
customElements.define("bs-badge-secondary", createBSCustomElementClass());
customElements.define("bs-badge-success", createBSCustomElementClass());
customElements.define("bs-badge-warning", createBSCustomElementClass());
 
Borders
customElements.define("bs-border", createBSCustomElementClass());
//customElements.define("bs-border-*-0", createBSCustomElementClass());
customElements.define("bs-border-1", createBSCustomElementClass());
customElements.define("bs-border-danger", createBSCustomElementClass());
customElements.define("bs-border-dark", createBSCustomElementClass());
customElements.define("bs-border-info", createBSCustomElementClass());
customElements.define("bs-border-light", createBSCustomElementClass());
customElements.define("bs-border-primary", createBSCustomElementClass());
customElements.define("bs-border-secondary", createBSCustomElementClass());
customElements.define("bs-border-success", createBSCustomElementClass());
customElements.define("bs-border-warning", createBSCustomElementClass());
customElements.define("bs-border-white", createBSCustomElementClass());
customElements.define("bs-rounded", createBSCustomElementClass());
//customElements.define("bs-rounded-*", createBSCustomElementClass());
customElements.define("bs-rounded-0", createBSCustomElementClass());
customElements.define("bs-rounded-1", createBSCustomElementClass());
customElements.define("bs-rounded-2", createBSCustomElementClass());
customElements.define("bs-rounded-3", createBSCustomElementClass());
customElements.define("bs-rounded-bottom", createBSCustomElementClass());
customElements.define("bs-rounded-circle", createBSCustomElementClass());
customElements.define("bs-rounded-end", createBSCustomElementClass());
customElements.define("bs-rounded-pill", createBSCustomElementClass());
customElements.define("bs-rounded-start", createBSCustomElementClass());
customElements.define("bs-rounded-top", createBSCustomElementClass());
 

customElements.define("bs-breadcrumb", createBSCustomElementClass());
customElements.define("bs-breadcrumb-item", createBSCustomElementClass());


customElements.define("bs-btn-group", createBSCustomElementClass());

customElements.define("bs-btn-group-lg", createBSCustomElementClass());
customElements.define("bs-btn-group-sm", createBSCustomElementClass());
customElements.define("bs-btn-group-vertical", createBSCustomElementClass());
customElements.define("bs-btn-toolbar", createBSCustomElementClass());



customElements.define("bs-btn-block", createBSCustomElementClass());
customElements.define("bs-btn-lg", createBSCustomElementClass());
customElements.define("bs-btn-sm", createBSCustomElementClass());





customElements.define("bs-btn", createBSCustomElementClass());
customElements.define("bs-btn-close", createBSCustomElementClass());
customElements.define("bs-btn-close-white", createBSCustomElementClass());
customElements.define("bs-btn-danger", createBSCustomElementClass());
customElements.define("bs-btn-dark", createBSCustomElementClass());
customElements.define("bs-btn-info", createBSCustomElementClass());
customElements.define("bs-btn-light", createBSCustomElementClass());
customElements.define("bs-btn-link", createBSCustomElementClass());
customElements.define("bs-btn-outline-danger", createBSCustomElementClass());
customElements.define("bs-btn-outline-dark", createBSCustomElementClass());
customElements.define("bs-btn-outline-info", createBSCustomElementClass());
customElements.define("bs-btn-outline-light", createBSCustomElementClass());
customElements.define("bs-btn-outline-primary", createBSCustomElementClass());
customElements.define("bs-btn-outline-secondary", createBSCustomElementClass());
customElements.define("bs-btn-outline-success", createBSCustomElementClass());
customElements.define("bs-btn-outline-warning", createBSCustomElementClass());
customElements.define("bs-btn-primary", createBSCustomElementClass());
customElements.define("bs-btn-secondary", createBSCustomElementClass());
customElements.define("bs-btn-success", createBSCustomElementClass());
customElements.define("bs-btn-warning", createBSCustomElementClass());
 

customElements.define("bs-card", createBSCustomElementClass());
customElements.define("bs-card-body", createBSCustomElementClass());
customElements.define("bs-card-columns", createBSCustomElementClass());
customElements.define("bs-card-deck", createBSCustomElementClass());
customElements.define("bs-card-footer", createBSCustomElementClass());
customElements.define("bs-card-group", createBSCustomElementClass());
customElements.define("bs-card-header", createBSCustomElementClass());
customElements.define("bs-card-header-pills", createBSCustomElementClass());
customElements.define("bs-card-header-tabs", createBSCustomElementClass());
customElements.define("bs-card-img-bottom", createBSCustomElementClass());
customElements.define("bs-card-img-overlay", createBSCustomElementClass());
customElements.define("bs-card-img-top", createBSCustomElementClass());
customElements.define("bs-card-link", createBSCustomElementClass());
customElements.define("bs-card-subtitle", createBSCustomElementClass());
customElements.define("bs-card-text", createBSCustomElementClass());
customElements.define("bs-card-title", createBSCustomElementClass());
//customElements.define("bs-h*.card-header", createBSCustomElementClass());
customElements.define("bs-list-group", createBSCustomElementClass());

customElements.define("bs-stretched-link", createBSCustomElementClass());
 


customElements.define("bs-carousel-caption", createBSCustomElementClass());
customElements.define("bs-carousel-control-next", createBSCustomElementClass());
customElements.define("bs-carousel-control-next-icon", createBSCustomElementClass());
customElements.define("bs-carousel-control-prev", createBSCustomElementClass());
customElements.define("bs-carousel-control-prev-icon", createBSCustomElementClass());
customElements.define("bs-carousel-dark", createBSCustomElementClass());
customElements.define("bs-carousel-fade", createBSCustomElementClass());
customElements.define("bs-carousel-indicators", createBSCustomElementClass());
customElements.define("bs-carousel-inner", createBSCustomElementClass());
customElements.define("bs-carousel-item", createBSCustomElementClass());
  */

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