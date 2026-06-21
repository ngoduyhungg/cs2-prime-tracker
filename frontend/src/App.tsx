import { useEffect, useState } from "react";
import { getItems, createItem } from "./api/itemApi";
import { getStats } from "./api/statsApi";
import type { CreateItemPayload, Item } from "./types/item";
import type { Stats } from "./types/stats";

import ItemTable from "./components/ItemTable";
import StatsCards from "./components/StatsCards";
import ItemActions from "./components/ItemActions";
import ItemFormModal from "./components/ItemFormModal";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
    const [itemsData, statsData] = await Promise.all([getItems(), getStats()]);
    setItems(itemsData);
    setStats(statsData);
  };
    loadDashboardData();
  }, []);

  const handleCreateItem = async (payload: CreateItemPayload) => {
    await createItem(payload);

    const [itemsData, statsData] = await Promise.all([getItems(), getStats()]);
    setItems(itemsData);
    setStats(statsData);

    setIsAddModalOpen(false);
  };
  const handleAddNewWeek = () => { setIsAddModalOpen(true) };
  const handleCloseAddModal = () => { setIsAddModalOpen(false)};
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <section className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold">CS2 Prime Tracker</h1>
          <p className="mt-2 text-slate-400">Theo dõi vật phẩm nhận được từ Prime và tiến độ hoàn vốn</p>
        </div>
        <StatsCards stats={ stats } />
        <ItemFormModal open={isAddModalOpen} onClose={handleCloseAddModal} onSubmit={handleCreateItem}/>
        <ItemTable 
          items={ items }
          actions={ <ItemActions onAddClick={ handleAddNewWeek } />}
        />
      </section>
    </main>
  );
}
export default App;