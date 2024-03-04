I**ntroduction to Quick HTML: * The Quick Inline HyperText Markup Language***

qHTML is a simplified, custom representation of HTML designed for ease of use and intuitive understanding. Its structure and syntax are similar to CSS, but it's utilized to define HTML elements and their attributes.

For Demo:  <a href="https://mikeNickaloff.github.io/qhtml/demo.html">demo</a>

**Basic Structure:**

Elements: Elements are defined similarly to CSS. A tag name is provided, followed by a pair of curly braces {}. Within the curly braces, the attributes and nested elements are defined.

**Example:**
 
      <script src="qhtml.js"></script>
       <q-html>
         div {
              content: "my div"
          }
    
           p {
               content: "my paragraph"
           }
         </q-html>

Attributes: Attributes are defined  by specifying the attribute name followed by a colon (:) followed by the value surrrounded in double quotes. 

The value should be in the same form as traditional inline HTML tags -- style attributes are not allowed inside of qHTML -- they must be provided in a seperate style tag outside of the qhtml. 

Any other attributes can as long as they are valid. 

You can also use the content attribute on any tag to set the "textContent" of that tag. (not the HTML content).

Inline attributes like onclick, onmouseover, etc  work as well.

Nesting is also supported by simply adding additional tags into existing tags between the { curley braces }


Example:
   

      <q-html>
           div {
              id: "myDiv"
              class: "container"
              content: "click the button below for a special message"
              button {
                  onclick: "alert('hello world')"
                  content: "click me!"
               }
           }
      </q-html>


  Result:  

       <div id="myDiv" class="container">
               click the button below for a special message  
               <button onclick="alert('hello world')">click me!</button>
       </div>

Important Points:

The content attribute is special in qHTML. It represents the inner text of an element.

All properties are surrounded with double-quotes and cannot contain any CSS code.

Style attributes are ignored and scripts cannot be used directly from qHTML except as inline properties. 

If you need to access the generated HTML on page load you can  use the QHTMLContentLoaded event which is called from the document itself after the page finishes loading the QHTML.

For all others, you just access the QHTML elements as if they were normal HTML tags.

Example:

     <q-html>
      p {
            content: "This is a paragraph."
            span {
                   content: "And here is how to handle multiple elements... "                   
            } 
           a { 
               href:"#"
              content: "Click here!"
              onclick: "myFunction()"
           }
            span { 
                 id: "mySpan"
                 content: " and continue learning"
            }
         }
     </q-html>

     <script>
       // to access QHTML elements, just access them in the same way as any other HTML elements.
      function myFunction() {  
                               document.querySelector("#mySpan").innerText = "Clicked!"; 
                               alert("hello world!"); 
                             }
                             
      // on document load if you want to access the HTML immediately use QHTMLContentLoaded
      document.addEventListener("QHTMLContentLoaded", function() {
            document.querySelectorAll("#mySpan").forEach(function(elem) {  elem.innerText = "Soon!" })
      })
     </script>


Simplified Nesting

You can nest multiple tags for convenience using a comma

Example:

qHTML:

       <q-html>
         p,center,a {
           href: "https://www.example.com"
           content: "Visit Example"
        }
       </q-html>

Converted to HTML:

            <p><center><a href="https://www.example.com">Visit Example</a></center></p>


 Currently planned features for later release:
 
- style tag parsing
- native javascript parsing
