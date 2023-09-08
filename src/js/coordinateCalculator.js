export class CoordinateCalculator {
  minX = 0;
  maxX = 0;
  minY = 0;
  maxY = 0;
  outerPoints = [];
  innerPoints = [];
  center = { x: 0, y: 0 };

  /**
   * Creates a CoordinateCalculator object.
   * @param  {...any} mapCoordinates Object with x and y coordinates eg {x: 10, y: 10}
   */
  constructor(...mapCoordinates) {
    this.outerPoints = mapCoordinates;
    this.center = this.getCenterPoint();
    const { minX, maxX, minY, maxY } = this.getMaxMinFromPoints(...this.outerPoints);
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }

  /**
   * Sets the points of the CoordinateCalculator object.
   * @param  {...any} points Object with x and y coordinates eg {x: 10, y: 10}
   */
  setOuterPoints(...points) {
    this.points = points;
  }

  setInnerPoints(...points) {
    this.innerPoints = points;
  }

  rotate() {
    for (const point of this.outerPoints) {
      [point.x, point.y] = [point.y, point.x];
    }
    for (const point of this.innerPoints) {
      [point.x, point.y] = [point.y, point.x];
    }
  }

  rotatePoint(point, angle) {
    return (point.x * Math.cos(angle) - point.y * Math.sin(angle), point.x * Math.sin(angle) + point.y * Math.cos(angle));
  }

  rotatePoints(angle) {
    this.points.map(point => this.rotatePoint(point, angle));
  }

  getCenterPoint() {
    const { minX, maxX, minY, maxY } = this.getMaxMinFromPoints(...this.outerPoints);
    const centerX = (maxX - minX) / 2 + minX;
    const centerY = (maxY - minY) / 2 + minY;
    return { centerX, centerY };
  }

  getCenterPointFromPoints(...points) {
    const { minX, maxX, minY, maxY } = this.getMaxMinFromPoints(...points);
    const centerX = (maxX - minX) / 2 + minX;
    const centerY = (maxY - minY) / 2 + minY;
    return { centerX, centerY };
  }

  /**
 * Checks the maximum distance between the farthest points of the input, in both x and y direction.
 * Returns the minimum and maximum x and y values. On the form {minX, maxX, minY, maxY}
 * 
 * @param  {...any} points Object with x and y coordinates eg {x: 10, y: 10}
 * @return {Object} The min and max x and y values. On the form {minX, maxX, minY, maxY}
 */
  getMaxMinFromPoints(...points) {
    const minX = Math.min(...points.map(point => point.x))
    const maxX = Math.max(...points.map(point => point.x))
    const minY = Math.min(...points.map(point => point.y))
    const maxY = Math.max(...points.map(point => point.y))
    return { minX, maxX, minY, maxY }
    }

    /**
     * Suggests a width and height for the canvas based on the input points.
     * 
     * @return {Object} The suggested width and height for the canvas. On the form {width, height}
     */
    suggestCanvasSize() {
        const { minX, maxX, minY, maxY } = this.getMaxMinFromPoints(...this.outerPoints);
        const width = maxX - minX;
        const height = maxY - minY;
        return {width, height}
    }
}