// @ts-nocheck

import {MutableRefObject} from "react";
import {getRandomInt, getRandomVector} from "../utils/utils";
import {v4 as uuid} from "uuid";
import {Sampler} from "tone";

export class DVDLogo {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  logoRef: MutableRefObject<null>;
  name?: string;

  id = uuid();
  canvasRightCollision = false;
  canvasLeftCollision = false;
  canvasBottomCollision = false;
  canvasTopCollision = false;

  objectRightCollision = false;
  objectLeftCollision = false;
  objectBottomCollision = false;
  objectTopCollision = false;

  color = "blue";
  width = 64;
  height = 33;

  constructor(
    distancePerStep: number,
    logoRef: MutableRefObject<null>,
    x?: number,
    y?: number,
    deltaX?: number,
    deltaY?: number,
    name?: string
  ) {
    const {randDeltaX, randDeltaY} = getRandomVector(distancePerStep);
    this.x = x ?? getRandomInt(100, 200);
    this.y = y ?? getRandomInt(100, 200);
    this.deltaX = deltaX ?? randDeltaX;
    this.deltaY = deltaY ?? randDeltaY;
    this.logoRef = logoRef;
    this.name = name;
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
    if (this.canvasRightCollision || this.objectRightCollision) {
      this.deltaX = -this.deltaX;
      this.canvasRightCollision = false;
      this.objectRightCollision = false;
    }
    if (this.canvasLeftCollision || this.objectLeftCollision) {
      this.deltaX = -this.deltaX;
      this.canvasLeftCollision = false;
      this.objectLeftCollision = false;
    }
    this.deltaY = this.deltaY * scaleFactor;
    if (this.canvasBottomCollision || this.objectBottomCollision) {
      this.deltaY = -this.deltaY;
      this.canvasBottomCollision = false;
      this.objectBottomCollision = false;
    }
    if (this.canvasTopCollision || this.objectTopCollision) {
      this.deltaY = -this.deltaY;
      this.canvasTopCollision = false;
      this.objectTopCollision = false;
    }
  };

  /* Check if velocity values on this step would cause circle to exit canvas on next step.
   * If so, set flags so that direction will change on the next step
   * Also, trigger sounds!
   */
  private detectCanvasCollision = (
    ctx: CanvasRenderingContext2D,
    sampler: Sampler
  ) => {
    if (this.x + this.deltaX > ctx.canvas.width - this.width) {
      this.canvasRightCollision = true;
      sampler.triggerAttack("C4");
    } else if (this.x + this.deltaX < 0) {
      this.canvasLeftCollision = true;
      sampler.triggerAttack("C4");
    }
    if (this.y + this.deltaY > ctx.canvas.height - this.height) {
      this.canvasBottomCollision = true;
      sampler.triggerAttack("C4");
    } else if (this.y + this.deltaY < 0) {
      this.canvasTopCollision = true;
      sampler.triggerAttack("C4");
    }
  };

  private detectObjectCollision = (logos: DVDLogo[], sampler: Sampler) => {
    const otherLogos = logos.filter((logo) => logo.id !== this.id);

    otherLogos.forEach((other) => {
      const thisLeftEdge = this.x;
      const otherLeftEdge = other.x;
      const thisRightEdge = this.x + this.width;
      const otherRightEdge = other.x + other.width;
      const thisTopEdge = this.y;
      const otherTopEdge = other.y;
      const thisBottomEdge = this.y + this.height;
      const otherBottomEdge = other.y + other.height;

      const isYIntersecting =
        thisBottomEdge + this.deltaY >= otherTopEdge + other.deltaY &&
        thisTopEdge + this.deltaY <= otherBottomEdge + other.deltaY;
      const isXIntersecting =
        thisLeftEdge + this.deltaX <= otherRightEdge + other.deltaX &&
        thisRightEdge + this.deltaX >= otherLeftEdge + other.deltaX;

      // Logo right edge
      if (
        thisRightEdge < otherLeftEdge &&
        thisRightEdge + this.deltaX >= otherLeftEdge + other.deltaX &&
        isYIntersecting
      ) {
        this.objectRightCollision = true;
        sampler.triggerAttack("D4");
      }
      // Logo left edge
      if (
        thisLeftEdge > otherRightEdge &&
        thisLeftEdge + this.deltaX <= otherRightEdge + other.deltaX &&
        isYIntersecting
      ) {
        this.objectLeftCollision = true;
        sampler.triggerAttack("D4");
      }
      // Logo top edge
      if (
        thisTopEdge > otherBottomEdge &&
        thisTopEdge + this.deltaY <= otherBottomEdge + other.deltaY &&
        isXIntersecting
      ) {
        this.objectTopCollision = true;
        sampler.triggerAttack("D4");
      }
      // Logo bottom edge
      if (
        thisBottomEdge < otherTopEdge &&
        thisBottomEdge + this.deltaY >= otherTopEdge + other.deltaY &&
        isXIntersecting
      ) {
        this.objectTopCollision = true;
        sampler.triggerAttack("D4");
      }
    });
  };

  private paint = (ctx: CanvasRenderingContext2D) => {
    const imgNode = this.logoRef.current[0];
    if (imgNode) {
      ctx.drawImage(imgNode, this.x, this.y, this.width, this.height);
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  };

  /* Move drawing position for next step, based on the logo's delta values.
   * Also, force the logo not to move outside the canvas if
   * a collision has been detected. This is necessary to stop the circle
   * 'escaping' after a pause in animation, e.g when changing tabs.
   */
  private moveDrawingPosition = (ctx: CanvasRenderingContext2D) => {
    this.x += this.deltaX;
    this.y += this.deltaY;
    if (this.canvasRightCollision) {
      this.x = ctx.canvas.width - this.width;
    } else if (this.canvasLeftCollision) {
      this.x = 0;
    }
    if (this.canvasBottomCollision) {
      this.y = ctx.canvas.height - this.height;
    } else if (this.canvasTopCollision) {
      this.y = 0;
    }
  };

  step = (
    logos: DVDLogo[],
    distancePerStep: number,
    prevDistancePerStep: number,
    frameCount: number,
    ctx: CanvasRenderingContext2D,
    sampler: Sampler,
    isDetectCollisions: Boolean
  ) => {
    if (frameCount === 0) return;

    // Set where it's going to move next step
    this.setVector(distancePerStep, prevDistancePerStep);

    // Check if it will hit the walls next step
    this.detectCanvasCollision(ctx, sampler);
    this.moveDrawingPosition(ctx);

    // Check if it will hit another logo next step
    isDetectCollisions && this.detectObjectCollision(logos, sampler);

    this.paint(ctx);
  };
}
