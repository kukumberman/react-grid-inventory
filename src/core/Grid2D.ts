export class Grid2D {
  constructor(public readonly width: number, public readonly height: number) {}

  getNeighbours(x: number, y: number) {
    const cells = []
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue
        }
        const nx = x + i
        const ny = y + j
        if (this.isInside(nx, ny)) {
          const index = this.gridToIndex(nx, ny)
          cells.push(index)
        }
      }
    }
    return cells
  }

  isInside(x: number, y: number) {
    const xx = x >= 0 && x < this.width
    const yy = y >= 0 && y < this.height
    return xx && yy
  }

  gridToIndex(x: number, y: number) {
    return y * this.width + x
  }

  indexToGrid(index: number) {
    return {
      x: index % this.width,
      y: Math.floor(index / this.width),
    }
  }
}
