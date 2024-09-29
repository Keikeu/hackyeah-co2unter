import React, { Fragment, useEffect, useRef } from "react";
import Matter from "matter-js";
import Slider from "commons/components/Slider";
import T from "prop-types";
import Typography from "commons/components/Typography";
import Flexbox from "commons/components/Flexbox";
import { formatCO2, normalizeEmissions } from "commons/util/helpers";
import Divider from "commons/components/Divider";

const CircleRenderer = ({ circles: initCircles, setCircles: setInitCircles, maxValue }) => {
  const containerRef = useRef();
  const engineRef = useRef(null);
  const circleRefs = useRef([]);

  const wallThickness = 100;

  useEffect(() => {
    // Only initialize Matter.js engine once
    if (!engineRef.current) {
      const screenWidth = window.innerWidth - 48;
      const screenHeight = window.innerHeight / 2;

      const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Bodies = Matter.Bodies,
        Common = Matter.Common;

      const engine = Engine.create();
      engine.world.gravity.x = 0;
      engine.world.gravity.y = 0;
      const world = engine.world;
      engineRef.current = engine;

      const render = Render.create({
        element: containerRef.current,
        engine: engine,
        options: {
          width: screenWidth,
          height: screenHeight,
          wireframes: false,
          showAngleIndicator: false,
          background: "#efebeb",
        },
      });

      Render.run(render);

      const runner = Runner.create();
      Runner.run(runner, engine);

      // Box bounds
      // x, y, width, height
      Composite.add(world, [
        // bottom
        Bodies.rectangle(screenWidth / 2, screenHeight + wallThickness / 2, screenWidth, wallThickness, {
          isStatic: true,
          density: 1e30,
          render: { fillStyle: "#ff00ff" },
        }),
        // left
        Bodies.rectangle(0 - wallThickness / 2, screenHeight / 2, wallThickness, screenHeight, {
          isStatic: true,
          density: 1e30,
          render: { fillStyle: "#ffff00" },
        }),
        // right
        Bodies.rectangle(screenWidth + wallThickness / 2, screenHeight / 2, wallThickness, screenHeight, {
          isStatic: true,
          density: 1e30,
          render: { fillStyle: "#00ff00" },
        }),
        // top
        Bodies.rectangle(screenWidth / 2, 0 - wallThickness / 2, screenWidth, wallThickness, {
          isStatic: true,
          density: 1e30,
          render: { fillStyle: "#0000ff" },
        }),
      ]);

      // Create circles at different positions
      const circles = [];
      for (let i = 0; i < initCircles.length; i++) {
        const x = Common.random(0, screenWidth);
        const y = Common.random(0, screenHeight);
        const circle = Bodies.circle(
          x,
          y,
          normalizeEmissions(initCircles[i].value * initCircles[i].factor, 0, maxValue),
          {
            friction: 0.001,
            frictionAir: 0.001,
            restitution: 0.1,
            render: {
              fillStyle: initCircles[i].color,
            },
          }
        );
        circles.push(circle);
        circleRefs.current.push(circle);
      }

      Composite.add(world, circles);

      // Mouse control for dragging
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });
      Composite.add(world, mouseConstraint);
      render.mouse = mouse;

      return () => {
        Render.stop(render);
        Runner.stop(runner);
        Composite.clear(world);
        Engine.clear(engine);
      };
    }
  }, []);

  // Function to handle slider change
  const handleSliderChange = (index, newValue) => {
    const updatedCircles = [...initCircles];
    updatedCircles[index].value = newValue;
    setInitCircles(updatedCircles);

    // Update circle size dynamically
    const currentCircle = circleRefs.current[index];
    const newRadius = normalizeEmissions(newValue * initCircles[index].factor, 0, maxValue);

    if (currentCircle) {
      const currentRadius = currentCircle.circleRadius;
      const scaleFactor = newRadius / currentRadius;
      Matter.Body.scale(currentCircle, scaleFactor, scaleFactor);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div ref={containerRef} style={{ borderRadius: "var(--border-radius-2)", overflow: "hidden" }}></div>

      {setInitCircles && (
        <div style={{ marginTop: "20px" }}>
          {initCircles.map((circle, index) => (
            <Fragment key={index}>
              <Typography variant="h4" marginTop={8}>
                {circle.label}:
              </Typography>
              <Flexbox alignItems="center">
                <Slider
                  color={circle.color}
                  min={circle.min}
                  max={circle.max}
                  step={circle.step}
                  marks={[{ value: circle.average || 0, label: "AVG" }]}
                  valueLabelDisplay="auto"
                  value={circle.value}
                  onChange={e => handleSliderChange(index, parseInt(e.target.value))}
                  style={{ width: "50%", flexShrink: 0 }}
                />
                <Typography variant="label" marginLeft={24} style={{ flexBasis: "25%" }}>
                  {circle.value} {circle.unit}
                </Typography>
                <Typography variant="label" marginLeft={24} style={{ flexBasis: "25%" }}>
                  {formatCO2(circle.value * circle.factor)}
                </Typography>
              </Flexbox>
              <Divider />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

CircleRenderer.propTypes = {
  circles: T.array,
  setCircles: T.func,
  maxValue: T.number,
};

export default CircleRenderer;
