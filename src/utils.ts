// Return a random integer between min (inclusive) and max (exclusive)
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// Return a random float between two min (inclusive) and max (exclusive)
export const getRandomFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const getRandomBool = () => {
  return Math.random() > 0.5;
};

// Return {deltaX, deltaY}, where abs(deltaX) + abs(deltaY) == totalSpeed
export const getRandomVector = (totalSpeed: number) => {
  const part1 = getRandomFloat(0, totalSpeed);
  const part2 = totalSpeed - part1;
  const randDeltaX = getRandomBool() ? -part1 : part1;
  const randDeltaY = getRandomBool() ? -part2 : part2;
  return {randDeltaX, randDeltaY};
};
