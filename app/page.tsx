import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function HomeSetupList() {
  const [items, setItems] = useState({
    Sala: [
      { name: "Sofá", price: 1500, bought: false, image: "" },
      { name: "Mesa de centro", price: 400, bought: false, image: "" }
    ],
    Quarto: [
      { name: "Cama box", price: 1200, bought: false, image: "" },
      { name: "Guarda-roupa", price: 1800, bought: false, image: "" }
    ],
    Cozinha: [
      { name: "Geladeira", price: 2500, bought: false, image: "" },
      { name: "Fogão", price: 1200, bought: false, image: "" }
    ],
    Lavanderia: [
      { name: "Máquina de lavar", price: 2000, bought: false, image: "" }
    ]
  });

  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newRoom, setNewRoom] = useState("Sala");

  const addItem = () => {
    if (!newItem) return;
    const updated = { ...items };
    updated[newRoom].push({
      name: newItem,
      price: parseFloat(newPrice) || 0,
      bought: false,
      image: newImage
    });
    setItems(updated);
    setNewItem("");
    setNewPrice("");
    setNewImage("");
  };

  const toggleBought = (room, index) => {
    const updated = { ...items };
    updated[room][index].bought = !updated[room][index].bought;
    setItems(updated);
  };

  const totalSpent = Object.values(items)
    .flat()
    .filter(i => i.bought)
    .reduce((acc, i) => acc + i.price, 0);

  const totalPlanned = Object.values(items)
    .flat()
    .reduce((acc, i) => acc + i.price, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">🏡 Lista da Casa Nova</h1>

      <Card className="p-4 space-y-2">
        <Input
          placeholder="Nome do item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Input
          placeholder="Valor (R$)"
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <Input
          placeholder="URL da imagem (opcional)"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <select
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          className="border rounded p-2 w-full"
        >
          {Object.keys(items).map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
        <Button onClick={addItem}>Adicionar</Button>
      </Card>

      {Object.keys(items).map((room) => (
        <div key={room} className="space-y-2">
          <h2 className="text-xl font-semibold mt-4">{room}</h2>
          {items[room].map((item, index) => (
            <Card
              key={index}
              className="p-4 flex items-center justify-between"
            >
              <CardContent className="flex items-center gap-4">
                <Checkbox
                  checked={item.bought}
                  onCheckedChange={() => toggleBought(room, index)}
                />
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <p
                    className={`font-semibold ${
                      item.bought ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}

      <Card className="p-4">
        <p>
          <strong>Total planejado:</strong> R$ {totalPlanned.toFixed(2)}
        </p>
        <p>
          <strong>Total gasto:</strong> R$ {totalSpent.toFixed(2)}
        </p>
      </Card>
    </div>
  );
}