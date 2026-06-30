import ItemFormModal from "./components/ItemFormModal";
import DashboardWorkspace from "./components/DashboardWorkspace";

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
    <main className="app-gaming-bg text-white px-8 py-8">
      <section className="mx-auto w-full max-w-[1760px]">
        <DashboardWorkspace
          stats={stats}
          weeks={weeks}
          items={items}
          onCreateWeek={handleAddNewWeek}
          onAddItemClick={handleAddItemClick}
          onSaveWeekItems={handleSaveWeekItems}
        />

        <ItemFormModal
          open={isAddModalOpen}
          selectedWeekNumber={selectedWeek?.weekNumber}
          onClose={handleCloseAddModal}
          onSubmit={handleCreateItem}
        />
      </section>
    </main>
  );
}

export default App;