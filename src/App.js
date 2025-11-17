import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Camera", quantity: 1, packed: true },
  { id: 4, description: "SD Card", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItems(item) {
    setItems((items) => [...items, item]); //adding a new element to the list
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id)); //deleting the item with the given id
  }

  function handlePackedItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onItemPacked={handlePackedItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away Packing List 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantiy] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantiy(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😄 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantiy(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onItemPacked }) {
  function handleDeleteClick(id) {
    onDeleteItem(id);
  }
  function handlePackedClick(id) {
    onItemPacked(id);
  }
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteClick={handleDeleteClick}
            onPackedClick={handlePackedClick}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteClick, onPackedClick }) {
  return (
    <li>
      <input
        type="checkbox"
        onClick={(e) => onPackedClick(item.id)}
        checked={item.packed}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(e) => onDeleteClick(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  return (
    <footer className="stats">
      <em>
        💼 You have {items.length} items on your list, and you are already
        packed {items.filter((item) => item.packed === true).length} Item(s)
      </em>
    </footer>
  );
}
