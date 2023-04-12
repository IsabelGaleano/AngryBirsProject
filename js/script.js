//Matter Modules

const { Render, Runner, Engine, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint, Events } = Matter;

//Declaration Variables

let birds = getRandomBird();
//localStorage.removeItem("level");
//localStorage.removeItem("levelOnePass");
let level = sessionStorage.getItem("level");
let levelOnePass = sessionStorage.getItem("levelOnePass");
let levelTwoPass = sessionStorage.getItem("levelTwoPass");
let levelThreePass = sessionStorage.getItem("levelThreePass");;
let basePropsw;
let colsBaseProps;
let scoreBricks = 0;
let positionBird;

if (level === null || level === '1') {
    positionBird = 0;

} else if (level === '2') {
    positionBird = 1;
} else {
    positionBird = 2;
}

const { name, posX, posY, radius, physics, grow, maxGrow } = birds[positionBird];

characterName.textContent = name;

if (level === null) {
    level = '1';
    levelOnePass = false;
}


if (levelTwoPass === null) {
    levelTwoPass = false;
}

if (levelThreePass === null) {
    levelThreePass = false;
}

//Game distribution
const gameSize = { w: window.innerWidth, h: window.innerHeight };
const baseProps = { w: 150, h: 20, posX: gameSize.w - 300, posY: gameSize.h - 200 };

if (level === '1' && levelOnePass === false) {
    basePropsw = baseProps.w / 3;
    colsBaseProps = 3;
}

if (level === '2' && levelTwoPass === false) {
    basePropsw = baseProps.w / 4;
    colsBaseProps = 4;
}

if (level === '3' && levelThreePass === false) {
    basePropsw = baseProps.w / 5;
    colsBaseProps = 5;
}

//Game distribution
const bricksProps = { w: basePropsw, h: 30, posX: baseProps.posX - baseProps.w / 2, posY: 50, cols: colsBaseProps, rows: 10 };

//The library renders the game environment
const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine,
    options: { 
        width: gameSize.w, 
        height: gameSize.h,
        background: 'transparent',
        wireframes: false, // Para que no aparezcan los contornos de los objetos
        background: 'url(FondoCenfoShooters.png)' }
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
    if (scoreBricks > 15 && level === '1') {
        level = 2;
        levelOnePass = true;

        sessionStorage.setItem("level", level);
        sessionStorage.setItem("levelOnePass", levelOnePass);

    }

    if (scoreBricks > 20 && level === '2') {
        level = 3;
        levelTwoPass = true;

        sessionStorage.setItem("level", level);
        sessionStorage.setItem("levelTwoPass", levelTwoPass);

    }

    if (scoreBricks > 25 && level === '3') {
        levelThreePass = true;
        sessionStorage.setItem("levelThreePass", levelThreePass);

    }


});

//bodies are added

Composite.add(engine.world, [base, bricks, bird, shooter, mouseContraint]);

Runner.run(engine);
Render.run(render);