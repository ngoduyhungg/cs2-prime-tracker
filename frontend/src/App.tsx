import StatsCards from "./components/StatsCards";
import ItemFormModal from "./components/ItemFormModal";
import DashboardProgress from "./components/DashboardProgress";
import BestDropCard from "./components/BestDropCard";
import BestSaleCard from "./components/BestSaleCard";

import { usePrimeDashboard } from "./hooks/usePrimeDashboard";

function App() {
  const {
    items,
    weeks,
    stats,
    isAddModalOpen,
    selectedWeekId,
    handleCreateItem,
    handleAddNewWeek,
    handleAddItemClick,
    handleCloseAddModal,
    handleSaveWeekItems
  } = usePrimeDashboard();

  const selectedWeek = weeks.find((week) => week.id === selectedWeekId);


  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <section className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold">CS2 Prime Tracker</h1>
          <p className="mt-2 text-slate-400">
            Theo dõi vật phẩm nhận được từ Prime và tiến độ hoàn vốn
          </p>
        </div>

        <StatsCards stats={stats} />
        <BestDropCard items={items}/>
        <BestSaleCard items={items}/>
        <ItemFormModal
          open={isAddModalOpen}
          selectedWeekNumber={selectedWeek?.weekNumber}
          onClose={handleCloseAddModal}
          onSubmit={handleCreateItem}
        />

        <DashboardProgress
          weeks={weeks}
          items={items}
          onCreateWeek={handleAddNewWeek}
          onAddItemClick={handleAddItemClick}
          onSaveWeekItems={handleSaveWeekItems}
        />
      </section>
    </main>
  );
}
export default App;