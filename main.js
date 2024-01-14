let framerate = 60;
let amountHorizontalCells = 100;
let amountOfGenerations = 0;
let cellWidth = 2;
let cellHeight = 2;
let currGen = [];
let currGenColors = [];
let generation = 0;
let ruleNumber = 86;
let colors = [];
let notActiveColor = "white";
let sketch = function (p) {
    p.setup = function () {
        c = p.createCanvas(p.windowWidth, p.windowHeight);
        amountHorizontalCells = p.windowWidth / cellWidth;
        amountOfGenerations = p.windowHeight / cellHeight;
        notActiveColor = randomcolor();
        for (let i = 0; i < amountHorizontalCells; i++) {
            currGen.push('0');
            currGenColors.push(notActiveColor);
        }
        for (let i = 0; i < 4; i++) {
            colors.push(randomcolor());
        }
        currGen[Math.floor(currGen.length / 2)] = '1';
        currGenColors[Math.floor(currGenColors.length / 2)] = colors[0];
        document.getElementById("canvascontainer").appendChild(c.canvas);
        p.frameRate(framerate);
    };

    p.draw = function () {
        for (let i = 0; i < amountHorizontalCells; i++) {
            p.push();
            p.noStroke();
            p.fill(currGen[i] == '0' ?  currGenColors[i] : notActiveColor);
            p.rect(i * cellWidth, generation * cellHeight, cellWidth, cellHeight);
            p.pop();
        } 

        generation++;
        if (generation > amountOfGenerations) {
            generation = 0;
        }
        currGen = calculateNextGeneration();
    };

    function calculateNextGeneration() {
        let ruleSet = ruleNumber.toString(2).padStart(8, '0').split("").reverse().join("");
        let newGen = [];
        currGenColors = [];
        for (let i = 0; i < currGen.length; i++) {
            let left = currGen[(i - 1 + currGen.length) % (currGen.length)];
            let right = currGen[(i + 1) % currGen.length];
            let state = currGen[i];

            let colorIdx = parseInt(left + right, 2);

            newGen.push(ruleSet[parseInt(left + state + right, 2)]);
            currGenColors.push(colors[colorIdx]);
        };

        return newGen;
    };

    function randomcolor() {
        return '#' + (function co(lor){   return (lor +=
            [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
                && (lor.length == 6) ?  lor : co(lor); })('');
    };

};

let app = new p5(sketch)
