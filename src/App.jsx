import React from 'react';
import { usePerfumeFormulas } from './hooks/usePerfumeFormulas';
import { FormulaForm } from './components/formulas/FormulaForm';
import { ProductionOrderList } from './components/production/ProductionOrderList';

export const App = () => {
  const { productionOrders, addFormula, updateOrderStatus, loading, error } = usePerfumeFormulas();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>SymriseNexus - Sistema de Perfumería</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>Plataforma Web / Móvil de Gestión de Fórmulas y Producción</p>
      </header>

      {loading && <p>Cargando información del sistema...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <main>
          <FormulaForm onSaveFormula={addFormula} />
          <ProductionOrderList orders={productionOrders} onUpdateStatus={updateOrderStatus} />
        </main>
      )}
    </div>
  );
};

export default App;