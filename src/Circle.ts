import {getRandomInt, getRandomVector} from "./utils";

export class Circle {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;

  isFirstStep = true;
  isMaxX = false;
  isMinX = false;
  isMaxY = false;
  isMinY = false;
  radius = 12;
  color = "blue";
  speed = 100;

  constructor(distancePerStep: number) {
    const {deltaX, deltaY} = getRandomVector(distancePerStep);
    this.x = getRandomInt(100, 200);
    this.y = getRandomInt(100, 200);
    this.deltaX = deltaX;
    this.deltaY = deltaY;
  }

  /* For steps other than first step, scale the delta
   * values based on any change in circle speed.
   * Flip the sign to change direction if a collision was
   * detected on the previous step.
   */
  private setVector = (
    distancePerStep: number,
    prevDistancePerStep: number
  ) => {
    const scaleFactor = distancePerStep / prevDistancePerStep;

    this.deltaX = this.deltaX * scaleFactor;
    if (this.isMaxX) {
      this.deltaX = -this.deltaX;
      this.isMaxX = false;
    } else if (this.isMinX) {
      this.deltaX = -this.deltaX;
      this.isMinX = false;
    }
    this.deltaY = this.deltaY * scaleFactor;
    if (this.isMaxY) {
      this.deltaY = -this.deltaY;
      this.isMaxY = false;
    } else if (this.isMinY) {
      this.deltaY = -this.deltaY;
      this.isMinY = false;
    }
  };

  /* Check if velocity values on this step would cause circle to exit canvas.
   * If so, set flags so that direction will change on the next step
   * Also, trigger sounds!
   */
  private detectCollisions = (
    ctx: CanvasRenderingContext2D,
    isAudioReady: boolean,
    synth: any
  ) => {
    if (this.x + this.deltaX > ctx.canvas.width - this.radius) {
      this.isMaxX = true;
      isAudioReady && synth.triggerAttackRelease("C4", "8n");
    } else if (this.x + this.deltaX < 0 + this.radius) {
      this.isMinX = true;
      isAudioReady && synth.triggerAttackRelease("D4", "8n");
    }
    if (this.y + this.deltaY > ctx.canvas.height - this.radius) {
      this.isMaxY = true;
      isAudioReady && synth.triggerAttackRelease("E4", "8n");
    } else if (this.y + this.deltaY < 0 + this.radius) {
      this.isMinY = true;
      isAudioReady && synth.triggerAttackRelease("F4", "8n");
    }
  };

  private paint = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  /* Move drawing position for next step, based on the circle's delta values.
   * Also, force the circle not to move outside the canvas if
   * a collision has been detected. This is necessary to stop the circle
   * 'escaping' after a pause in animation, e.g when changing tabs.
   */
  private moveDrawingPosition = (ctx: CanvasRenderingContext2D) => {
    this.x += this.deltaX;
    this.y += this.deltaY;
    if (this.isMaxX) {
      this.x = ctx.canvas.width - this.radius;
    } else if (this.isMinX) {
      this.x = 0 + this.radius;
    }
    if (this.isMaxY) {
      this.y = ctx.canvas.height - this.radius;
    } else if (this.isMinY) {
      this.y = 0 + this.radius;
    }
  };

  step = (
    distancePerStep: number,
    prevDistancePerStep: number,
    ctx: CanvasRenderingContext2D,
    isAudioReady: boolean,
    synth: any
  ) => {
    if (this.isFirstStep) {
      this.isFirstStep = false;
    } else {
      this.setVector(distancePerStep, prevDistancePerStep);
    }

    this.detectCollisions(ctx, isAudioReady, synth);
    this.moveDrawingPosition(ctx);
    this.paint(ctx);
  };
}
