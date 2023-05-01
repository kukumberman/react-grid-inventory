import { Grid2D } from "./Grid2D"

export class Item {
  constructor(
    public readonly id: string,
    public readonly width: number,
    public readonly height: number
  ) {}
}

export class InventoryItem {
  constructor(
    public readonly id: string,
    public readonly item: Item,
    public readonly x: number,
    public readonly y: number
  ) {}
}

export class Inventory {
  public readonly items: InventoryItem[]
  public readonly cells: Array<Item | null>
  private readonly cellsMap: Map<InventoryItem, number[]>
  private readonly grid: Grid2D

  constructor(public readonly width: number, public readonly height: number) {
    this.items = []
    this.cells = new Array(width * height).fill(null)
    this.cellsMap = new Map()
    this.grid = new Grid2D(width, height)
  }

  addItem(item: Item): boolean {
    const selfSize = this.width * this.height
    const itemSize = item.width * item.height
    if (itemSize > selfSize) {
      return false
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = this.grid.gridToIndex(x, y)
        if (this.cells[index] !== null) {
          continue
        }

        if (this.addItemAt(item, x, y)) {
          return true
        }
      }
    }
    return false
  }

  addItemAt(item: Item, x: number, y: number): boolean {
    const maxCount = item.width * item.height
    const indexes = []

    for (let i = 0; i < item.width; i++) {
      for (let j = 0; j < item.height; j++) {
        const xx = x + i
        const yy = y + j
        if (xx >= this.width || yy >= this.height) {
          continue
        }
        const index = this.grid.gridToIndex(xx, yy)
        if (this.cells[index] !== null) {
          continue
        }
        indexes.push(index)
      }
    }

    if (indexes.length !== maxCount) {
      return false
    }

    const id = Date.now().toString()
    const newItem = new InventoryItem(id, item, x, y)
    this.items.push(newItem)

    this.cellsMap.set(newItem, indexes)
    indexes.forEach((idx) => (this.cells[idx] = item))

    return true
  }

  removeItem(id: string): boolean {
    const itemIndex = this.items.findIndex((item) => item.id === id)
    if (itemIndex === -1) {
      return false
    }

    const item = this.items[itemIndex]
    const indexes = this.cellsMap.get(item)!
    indexes.forEach((idx) => (this.cells[idx] = null))

    this.items.splice(itemIndex, 1)

    return true
  }

  clear() {
    this.items.length = 0
    this.cells.fill(null)
    this.cellsMap.clear()
  }
}
