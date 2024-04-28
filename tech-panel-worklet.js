/* Based Mostly on scfPanel Paint Worklet */

/**
 *
 * @param strVal: pre-sanitized string containing a single css value '10' | '10px' | '10px' ...
 * @param maxVal: in case the value contains a percentage and we have a maxVal, we calculate a px value relative to maxVal
 * @returns {number} Pixel value
 */
const normalizeCssValue = (strVal, maxVal = null) => {
    // If non-numeric value return the string:
    if(isNaN(parseInt(strVal.slice(0, 1))) && strVal.slice(0,1) !== '-') {
        return strVal;
    }

    if (`${parseFloat(strVal)}` === strVal) {
        return parseFloat(strVal);
    }
    if (strVal.slice(-1) === '%' && maxVal !== null) {
        const percentage = parseFloat(strVal.slice(0, -1)) / 100;

        // percentage, relative to maxVal
        return percentage * maxVal;

    }
    return typeof parseFloat(strVal) === 'number' ? parseFloat(strVal) : null;
}

/**
 *
 * @param props: full props object from WorkletAPI
 * @param propName: css property name as in '--customfoo-variable-baz'
 * @returns {{varName: *, value: *}} where value is property value as sanitized string '0px 200%' and varName
 *                                      is a camelcased version of the property name 'variableBaz'
 */
const extractProp = (props, propName) => {
    const snaked = propName.replace('--tech-', '');
    const cameled = snaked.split('-').map((v, i) => i > 0 ? `${v.charAt(0).toUpperCase()}${v.slice(1)}` : v).join('');

    const fullValue = props.get(propName).toString().trim();
    return {
        varName: cameled,
        value: fullValue
    }
}


class ScfBorder {

    static doubleValuedProps = [
        '--tech-top-left',
        '--tech-top-right',
        '--tech-bottom-right',
        '--tech-bottom-left',
        '--tech-pattern-shift'
    ];

    static singleValuedProps = [
        '--tech-width',
        '--tech-border-color',
        '--tech-shadow-color',
        '--tech-pattern-size',
        '--tech-top-dent',
        '--tech-top-dent-length',
		'--tech-percentage'
    ];

    static get inputProperties() {
        return [
            ...ScfBorder.singleValuedProps,
            ...ScfBorder.doubleValuedProps
        ];
    }

    static propDefaults = {
        topLeft: {v: 0, h: 0},
        topRight: {v: 0, h: 0},
        bottomRight: {v: 0, h: 0},
        bottomLeft: {v: 0, h: 0},
        patternShift: {v: 0, h: 0},
		percentage: 0.50,

        width: 0,
        patternSize: 20,
        borderColor: '#00f',
        shadowColor: '#00f',
        topDent: 0,
        topDentLength: 0,
    }

    borderPath(size, {topLeft, topRight, bottomRight, bottomLeft, offset, topDent, topDentLength, percentage}) {
        const {width: canvasWidth, height: canvasHeight} = size;
        const borderPath = new Path2D();
        // Top Left

        borderPath.moveTo(offset , offset + topLeft.v );
        !(topLeft.h === 0 && topLeft.v === 0) && borderPath.lineTo(offset + topLeft.h ,  offset );


        // Top Dent
        const straight = canvasWidth - topLeft.h - topRight.h;
        const half = (straight - topDentLength) / 2
        borderPath.lineTo(-offset + topLeft.h + half , offset );
        borderPath.lineTo(-offset + topLeft.h + half + topDent , offset + topDent );
        borderPath.lineTo(offset + topLeft.h + half + topDentLength + topDent , offset + topDent );
        borderPath.lineTo(offset + topLeft.h + half + topDentLength + topDent + topDent , offset );

        // Top Right
        borderPath.lineTo(-offset + canvasWidth - topRight.h , offset );
        !(topRight.h === 0 && topRight.v === 0) && borderPath.lineTo(canvasWidth - offset , topRight.v + offset );

        // Bottom Right
        borderPath.lineTo(canvasWidth - offset , canvasHeight - bottomRight.v - offset );
        !(bottomRight.h === 0 && bottomRight.v === 0) && borderPath.lineTo(canvasWidth - bottomRight.h - offset , canvasHeight - offset );

        // bottom Left
        borderPath.lineTo(bottomLeft.h + offset , canvasHeight - offset );
        !(bottomLeft.h === 0 && bottomLeft.v === 0) && borderPath.lineTo(offset , canvasHeight - bottomLeft.v - offset )

        borderPath.closePath();
        return borderPath;
    }

    parseProps(ctx, size, props) {
        // All this can go away once Firefox starts supporting CSS Typed OM :/
        const {width: canvasWidth, height: canvasHeight} = size;

        const singleVals = ScfBorder.singleValuedProps.reduce((acc, propName) => {
            const {varName, value} = extractProp(props, propName);
            // @TODO  figure out a way to be %-relative to height/width respectively
            return {...acc, [varName]: normalizeCssValue(value, canvasWidth) || ScfBorder.propDefaults[varName]}
        }, {});


        const doubleVals = ScfBorder.doubleValuedProps.reduce((acc, propName) => {
            const {varName, value} = extractProp(props, propName);

            if (value.length === 0) {
                return {
                    ...acc,
                    [varName]: ScfBorder.propDefaults[varName]
                }
            }

            if (value.split(' ').length === 1) {
                return {
                    ...acc,
                    [varName]: {v: normalizeCssValue(value, canvasHeight), h: normalizeCssValue(value, canvasWidth)}
                }
            }

            if (value.split(' ').length === 2) {
                const [v, h] = value.split(' ');
                return {
                    ...acc,
                    [varName]: {v: normalizeCssValue(v, canvasHeight), h: normalizeCssValue(h, canvasWidth)}
                }
            }

            return acc;
        }, {});

        return {...doubleVals, ...singleVals};

    }

    drawHexaGrid(ctx, size, {size: hexagonSize}) {
        const ang = Math.sin(120);
        const amount = Math.floor(size.height / hexagonSize);


        [...Array(amount).keys()].map((factor) => {
            this.drawHexagonLine(ctx, size, {size: hexagonSize, dx: 0, dy: factor * 3 * ang * hexagonSize});
        });
    }

    drawHexagonLine(ctx, size, {size: hexagonSize, dx = 0, dy = 0}) {
        const ang = Math.sin(120);

        const amount = Math.floor(size.width / hexagonSize);

        const startPoints = [...Array(amount).keys()].map((factor) => {
            const x = (hexagonSize + (hexagonSize * ang));
            return {x: factor * x + dx, y: factor % 2 ? dy : dy + (1.5 * hexagonSize * ang)}
        });

        startPoints.map((start) => {
            this.drawHexagon(ctx, {size: hexagonSize, start});
        });
    }

    drawHexagon(ctx, {size, start}) {
        const ang = Math.sin(120);
        ctx.moveTo(start.x, start.y);
        const hexaLines = [
            {x: size, y: 0},
            {x: size + (size * ang), y: 1.5 * size * ang},
            {x: size, y: 3 * size * ang},
            {x: 0, y: 3 * size * ang},
            {x: -1 * size * ang, y: 1.5 * size * ang},
        ]

        hexaLines.map((line) => {
            ctx.lineTo(line.x + start.x, line.y + start.y);
        });
        ctx.closePath();
    }

    paint(ctx, size, props) {
        const pp = this.parseProps(ctx, size, props);
        const {
            patternShift,
            width: borderWidth,
            borderColor,
            patternSize,
            shadowColor,
			percentage
        } = pp;


        // Draw first borderpath inset for 1/2 of borderWidth, so clipping does not cut the border off
        const widthClipOffset = borderWidth / 2;

        // prepare outline
        const borderPath = this.borderPath(size, {...pp, offset: widthClipOffset});

        // Prepare clipping outline, that removes patterns & shadows that leak "outside" of the border
        const clipBorderPath = this.borderPath(size, {...pp, offset: 0});

ctx.fillStyle = 'rgba(0, 0, 0, 0.57)';
ctx.fill(borderPath);
        ctx.clip(clipBorderPath); // clip = define the "inside" to be the only place to be drawn on
        ctx.lineJoin = 'bevel'; // Slight smoothing of corners
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = borderColor;

        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 30;
        ctx.stroke(borderPath); // Draw border


        ctx.save();
        ctx.globalCompositeOperation = 'destination-over'; // draw "behind" the border

        // Gradient to draw the hexagons, shifting center points of the radial grad to show more or less of the
        // hexagons in one or two directions
        const hexaGrad = ctx.createRadialGradient(
            (size.width / 2) + patternShift.h, (size.height / 2) + patternShift.v, 0.25 * Math.max(size.width, size.height),
            (size.width / 2) + patternShift.h, (size.height / 2) + patternShift.v, Math.max(size.width, size.height)
        );
        hexaGrad.addColorStop(0, 'transparent');
        hexaGrad.addColorStop(1, borderColor);

        ctx.fillStyle = hexaGrad;
        ctx.lineWidth = 1;
        ctx.strokeStyle = hexaGrad;
        this.drawHexaGrid(ctx, size, {size: patternSize});
        ctx.stroke();
        ctx.restore();


    }
	
	 interpolateArrays(arr1, arr2, percentage) {
    const interpolateValue = (start, end, percentage) => start + (end - start) * percentage;
    
    const interpolateObject = (obj1, obj2, percentage) => {
        const result = {};
        for (const key in obj1) {
            result[key] = interpolateValue(obj1[key], obj2[key], percentage);
        }
        return result;
    };

    const interpolate = (arr1, arr2, percentage) => {
	while (arr1.length > arr2.length) {
	arr2.push(arr1[arr2.length - 1])
	}
	while (arr2.length > arr1.length) {
	arr1.push(arr2[arr1.length - 1])
	}
        return arr1.map((item, index) => {
            if (Array.isArray(item)) {
                return interpolate(item, arr2[index], percentage);
            } else if (typeof item === 'object' && item !== null) {
                return interpolateObject(item, arr2[index], percentage);
            } else {
                return interpolateValue(item, arr2[index], percentage);
            }
        });
    };

    return interpolate(arr1, arr2, percentage);
}
 multiplyValues(path, x) {
 console.log(path);
return path;

}
}

registerPaint('tech-panel', ScfBorder);
