Introduction to qHTML: A Simplified HTML Representation

qHTML is a simplified, custom representation of HTML designed for ease of use and intuitive understanding. Its structure and syntax are similar to CSS, but it's utilized to define HTML elements and their attributes.

Basic Structure:

Elements: Elements are defined similarly to CSS. A tag name is provided, followed by a pair of curly braces {}. Within the curly braces, the attributes and nested elements are defined.

Example:
    <q-html>
     div {
      };

     p {
     };
     </q-html>

Attributes: Attributes are defined with a colon : and terminated by a semicolon ;. The value of the attribute is always enclosed in double quotes.

Example:
      <q-html>
       div {
          class: "container";
          content: "click the button below for a special message";
          button {
              onclick: "alert('hello world')";
              content: "click me!";
           }
       }
  </q-html>

Nesting: qHTML allows for the nesting of elements. Nested elements are defined within the curly braces of their parent element.

Example:
 <q-html>
    div {
        class: "container";
        p {
           content: "This is a paragraph inside a div.";
        }
   }

 </q-html>

Important Points:

The content attribute is special in qHTML. It represents the inner HTML of an element.

Example:
 <q-html>
     p {
        content: "This is a paragraph.";
     }
 </q-html>

All other attributes are directly mapped to HTML attributes. For instance, class, id, href, etc., work the same as in HTML.

Conversion to HTML:

Converting qHTML to regular HTML involves:

Transforming each element into its standard HTML representation.
Placing the content attribute value as the innerHTML of the respective element.
Mapping all other attributes directly to the element.
Example Conversion:

qHTML:
   <q-html>
    a {
      href: "https://www.example.com";
      content: "Visit Example";
    };
  </q-html>

Converted to HTML:
<a href="https://www.example.com">Visit Example</a>
