import { useState, useMemo } from "preact/hooks"
import { InventoryView } from "./components/InventoryView"
import { Inventory, Item } from "./core/Inventory"

const items = [
  // prettier-ignore
  new Item("red-apple_1f34e", 1, 1),
  new Item("hammer-and-wrench_1f6e0-fe0f", 2, 2),
  new Item("wrapped-gift_1f381", 1, 1),
  new Item("package_1f4e6", 3, 3),
  new Item("pile-of-poo_1f4a9", 1, 1),
  new Item("wine-glass_1f377", 1, 2),
]

const player = {
  inventory: new Inventory(5, 10),
}

items.forEach((item) => player.inventory.addItem(item))

function itemImagePathResolver(id: string) {
  return `https://em-content.zobj.net/thumbs/120/google/350/${id}.png`
}

export function App() {
  const [count, setCount] = useState(player.inventory.items.length)

  function onClick_AddItem(item: Item) {
    return () => {
      player.inventory.addItem(item)
      setCount(player.inventory.items.length)
    }
  }

  function onClick_ClearInventory() {
    return () => {
      player.inventory.clear()
      setCount(player.inventory.items.length)
    }
  }

  function createItemButton(item: Item) {
    return (
      <button onClick={onClick_AddItem(item)}>
        <div>
          <img
            src={itemImagePathResolver(item.id)}
            style={{
              width: 25,
            }}
          />
          <div>{item.id}</div>
        </div>
      </button>
    )
  }

  function clearButton() {
    return <button onClick={onClick_ClearInventory()}>Clear</button>
  }

  const buttons = useMemo(() => [clearButton(), ...items.map(createItemButton)], [])

  return (
    <div>
      <div>{count}</div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <InventoryView
          inventory={player.inventory}
          cellSize={50}
          itemImagePathResolver={itemImagePathResolver}
        />
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 200,
            }}
          >
            {buttons}
          </div>
        </div>
      </div>
    </div>
  )
}
