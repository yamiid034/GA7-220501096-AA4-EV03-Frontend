import React from 'react';

/**
 * Componente visual diseñado para monitorear y actualizar en tiempo real 
 * las órdenes de fabricación de perfumería en los dispositivos tablet del laboratorio.
 */
export const ProductionOrderList = ({ orders, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente': return '#f39c12';
      case 'En Mezcla': return '#3498db';
      case 'Control de Calidad': return '#9b59b6';
      case 'Completado': return '#2ecc71';
      default: return '#7f8c8d';
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginTop: '25px' }}>
      <h2>Órdenes de Producción en Laboratorio (Vista Tablet)</h2>
      
      {orders.length === 0 ? (
        <p>No hay órdenes de producción programadas para la jornada.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '15px' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '15px',
                borderLeft: `6px solid ${getStatusColor(order.estado)}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#333' }}>{order.id}</span>
                <span
                  style={{
                    backgroundColor: getStatusColor(order.estado),
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '0.85em',
                    fontWeight: 'bold'
                  }}
                >
                  {order.estado}
                </span>
              </div>

              <h3 style={{ margin: '10px 0 5px 0', color: '#2c3e50' }}>{order.formulaNombre}</h3>
              <p style={{ margin: '3px 0', color: '#666', fontSize: '0.9em' }}><strong>Lote:</strong> {order.lote}</p>
              <p style={{ margin: '3px 0', color: '#666', fontSize: '0.9em' }}><strong>Volumen:</strong> {order.volumenLitros} Litros</p>
              <p style={{ margin: '3px 0', color: '#666', fontSize: '0.9em' }}><strong>Operario:</strong> {order.operario}</p>

              <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                <label style={{ fontSize: '0.85em', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  Actualizar Estado de Preparación:
                </label>
                <select
                  value={order.estado}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Mezcla">En Mezcla</option>
                  <option value="Control de Calidad">Control de Calidad</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};