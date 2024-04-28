export default class QPainter {
    constructor(painterUuid = '', selector, dimensions, properties) {
        this.selector = selector;
        this.dimensions = dimensions;
        this.properties = properties;
        this.paint = null;
        if (painterUuid === '') {
            this.uuid = this.randomLetters();
        } else {
            this.uuid = painterUuid;
        }
        this.init();
    }
    randomLetters() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let randomLetters = '';
        for (let i = 0; i < 12; i++) {
            randomLetters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return randomLetters;
    }
    init() {}
    renderQPainter() {
        if ('paintWorklet' in CSS) {
            var qPainter = this;
			console.log(Object.keys(this.properties))
            const workletCode = `
            class ${this.uuid} {
                    static get inputProperties() { return ${JSON.stringify(Object.keys(this.properties))}; }
                    paint(ctx, size, properties) {
					var dimensions = ${JSON.stringify(this.dimensions)};
				 var scaleX = size.width / dimensions.width;
    var scaleY = size.height / dimensions.height;
	//ctx.translate(-1 * dimensions.width / 2, -1 * dimensions.height - 2)
    // Apply scaling
    ctx.scale(scaleX, scaleY);

    // Calculate translation offsets to maintain the top-left position
    var translateX = (dimensions.width - size.width) / scaleX;
    var translateY = (dimensions.height - size.height) / scaleY;

    // Apply translation to reverse the displacement caused by scaling
   // ctx.translate(translateX, translateY);
                        ${this.paint}
                    }
                }
                registerPaint('${this.uuid}', ${this.uuid});

          
        `;

            const blob = new Blob([workletCode], {
                type: 'application/javascript'
            });
            const blobURL = URL.createObjectURL(blob);

            CSS.paintWorklet.addModule(blobURL)
document.head.insertAdjacentHTML('beforeend', `
  <style>
     ${qPainter.selector} { 
       background-image: paint(${this.uuid}); 
       ${Object.keys(this.properties).map(prop => `${prop}: ${this.properties[prop]};`).join('')}
     }
  </style>
`);
         
	
        }
    }

}


export class QPainterElement extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            
        }
	}
