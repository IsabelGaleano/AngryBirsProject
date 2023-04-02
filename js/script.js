//Matter Modules

const { Render, Runner, Engine, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint, Events } = Matter;

//Declaration Variables

const { name, posX, posY, radius, physics, grow, maxGrow } = getRandomBird();
//localStorage.removeItem("level");
//localStorage.removeItem("levelOnePass");
let level = localStorage.getItem("level");
let levelOnePass = localStorage.getItem("levelOnePass");
let levelTwoPass = false;
let levelThreePass = false;
let basePropsw;
let colsBaseProps;
let scoreBricks = 0;

characterName.textContent = name;

if(level === null) {
    level = 1;
    levelOnePass = false;
}

console.log(level);
//Game distribution
const gameSize = { w: window.innerWidth, h: window.innerHeight };
const baseProps = { w: 150, h: 20, posX: gameSize.w - 300, posY: gameSize.h - 200 };

if (level === 1 && !levelOnePass) {
    basePropsw = baseProps.w / 3;
    colsBaseProps = 3;
} 

if (level === '2') {
    basePropsw = baseProps.w / 4;
    colsBaseProps = 4;
} 

if (level === '3') {
    basePropsw = baseProps.w / 4;
    colsBaseProps = 4;
} 

//Game distribution
const bricksProps = { w: basePropsw, h: 30, posX: baseProps.posX - baseProps.w / 2, posY: 50, cols: colsBaseProps, rows: 10 };

//The library renders the game environment
const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine,
    options: { width: gameSize.w, height: gameSize.h }
});

const base = Bodies.rectangle(baseProps.posX, baseProps.posY, baseProps.w, baseProps.h, { isStatic: true });

const bricks = Composites.stack(bricksProps.posX, bricksProps.posY, bricksProps.cols, bricksProps.rows, 0, 0, (x, y) => {
    return Bodies.rectangle(x, y, bricksProps.w, bricksProps.h);
});

const bird = Bodies.circle(posX, posY, radius, physics);

const shooter = Constraint.create({
    pointA: { x: posX, y: posY },
    bodyB: bird
});

const mouse = Mouse.create(render.canvas);
const mouseContraint = MouseConstraint.create(engine, { mouse });

//Eliminate the force of the shooter

let isFiring = false;

Events.on(mouseContraint, 'enddrag', () => isFiring = true);

Events.on(engine, 'afterUpdate', () => {

    if (isFiring) {

        Composite.remove(engine.world, shooter, true);

        if (grow && bird.circleRadius < maxGrow) {
            Body.scale(bird, grow, grow);
        };
    }

    score.textContent = bricks.bodies.filter(elm => elm.position.y > gameSize.h).length;

    scoreBricks = bricks.bodies.filter(elm => elm.position.y > gameSize.h).length;
    console.log(scoreBricks);
    if (scoreBricks > 20 && level === '1') {
        level = 2;
        levelOnePass = true;
        
        localStorage.setItem("level", level);
        localStorage.setItem("levelOnePass", levelOnePass);
    }

});

//bodies are added

Composite.add(engine.world, [base, bricks, bird, shooter, mouseContraint]);

Runner.run(engine);
Render.run(render);