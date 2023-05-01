import { memo, useMemo } from "preact/compat"
import { Inventory, InventoryItem } from "../core/Inventory"

type PathResolverFuncType = (id: string) => string

function CellView() {
  return (
    <div
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
      }}
    ></div>
  )
}

type ItemViewProps = {
  item: InventoryItem
  cellSize: number
  itemImagePathResolver: PathResolverFuncType
}

function ItemView(props: ItemViewProps) {
  const cellSize = props.cellSize
  const { x, y } = props.item
  const { id, width, height } = props.item.item
  return (
    <div
      style={{
        position: "absolute",
        left: x * cellSize,
        top: y * cellSize,
        width: width * cellSize,
        height: height * cellSize,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        boxSizing: "border-box",
        backgroundColor: "white",
      }}
    >
      <img
        src={props.itemImagePathResolver(id)}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}

const ItemViewMemoized = memo(ItemView)

export type InventoryViewProps = {
  inventory: Inventory
  cellSize: number
  itemImagePathResolver: PathResolverFuncType
}

export function InventoryView(props: InventoryViewProps) {
  const { width, height } = props.inventory

  const staticCell = useMemo(() => CellView(), [])
  const cells = new Array(width * height).fill(staticCell)

  const items = props.inventory.items.map((item) => (
    <ItemViewMemoized
      item={item}
      cellSize={props.cellSize}
      itemImagePathResolver={props.itemImagePathResolver}
    />
  ))

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${height}, ${props.cellSize}px)`,
          gridTemplateColumns: `repeat(${width}, ${props.cellSize}px)`,
          width: width * props.cellSize,
          height: height * props.cellSize,
        }}
      >
        {cells}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: width * props.cellSize,
          height: height * props.cellSize,
        }}
      >
        {items}
      </div>
    </div>
  )
}
