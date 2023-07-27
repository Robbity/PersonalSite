const matterContainer = document.querySelector("#matter-container");

var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Body = Matter.Body;
var Composites = Matter.Composites;
var MouseConstraint = Matter.MouseConstraint;
var Mouse = Matter.Mouse;
var World = Matter.World;

// create engine
var engine = Engine.create(),
  world = engine.world;

// create renderer
var render = Render.create({
  element: matterContainer,
  engine: engine,
  options: {
    width: matterContainer.clientWidth,
    height: matterContainer.clientHeight,
    background: "transparent",
    wireframes: false,
  },
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

function handleResize(matterContainer) {
  // set canvas size to new values
  render.canvas.width = matterContainer.clientWidth;
  render.canvas.height = matterContainer.clientHeight;
}

// render.canvas.width = window.innerWidth;
// render.canvas.height = window.innerHeight;

// add bodies
var cradle = Composites.newtonsCradle(
  matterContainer.clientWidth / 2,
  matterContainer.clientHeight / 2,
  4,
  matterContainer.clientWidth / 30,
  200
);
World.add(world, cradle);
// Select starting positions for each sphere
Body.translate(cradle.bodies[0], { x: 0, y: 0 });

// add mouse control
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
});

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
// Render.lookAt(render, {
//   min: { x: 0, y: 50 },
//   max: { x: 800, y: 450 },
// });

Render.run(render);
