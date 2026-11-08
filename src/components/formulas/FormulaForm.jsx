import React, { useState } from 'react';

/**
 * Componente interactivo para el registro y pesaje teórico de materias primas
 * para las fórmulas del proyecto SymriseNexus.
 */
export const FormulaForm = ({ onSaveFormula }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Eau de Parfum');
  const [baseVolume, setBaseVolume] = useState(1000); // Base de cálculo en gramos
  const [ingredientes, setIngredientes] = useState([
    { id: 1, nombre: '', porcentaje: 0, pesoGramos: 0 }
  ]);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Agrega una nueva fila de ingrediente a la fórmula
  const handleAddIngredient = () => {
    setIngredientes([
      ...ingredientes,
      { id: Date.now(), nombre: '', porcentaje: 0, pesoGramos: 0 }
    ]);
  };

  // Remueve un ingrediente existente
  const handleRemoveIngredient = (id) => {
    if (ingredientes.length === 1) return;
    setIngredientes(ingredientes.filter((ing) => ing.id !== id));
  };

  // Actualiza dinámicamente el porcentaje y recalcula el peso en gramos
  const handleIngredientChange = (id, field, value) => {
    setIngredientes(
      ingredientes.map((ing) => {
        if (ing.id === id) {
          const updated = { ...ing, [field]: value };
          if (field === 'porcentaje') {
            const pct = parseFloat(value) || 0;
            updated.pesoGramos = ((pct / 100) * baseVolume).toFixed(2);
          }
          return updated;
        }
        return ing;
      })
    );
  };

  // Procesa el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    try {
      const payload = {
        nombre,
        categoria,
        baseVolumeGramos: baseVolume,
        ingredientes
      };

      onSaveFormula(payload);
      setMensaje({ tipo: 'éxito', texto: '¡Fórmula registrada correctamente en el sistema!' });
      
      // Limpieza de formulario
      setNombre('');
      setIngredientes([{ id: Date.now(), nombre: '', porcentaje: 0, pesoGramos: 0 }]);
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message });
    }
  };

  // Cálculo en tiempo real del porcentaje total acumulado
  const totalPercentage = ingredientes.reduce((acc, curr) => acc + (parseFloat(curr.porcentaje) || 0), 0);

  return (
    <div className="formula-form-container" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2>Digitación de Fórmulas y Recetas de Perfumería</h2>
      <p style={{ color: '#666' }}>SymriseNexus - Módulo de Laboratorio</p>

      {mensaje.texto && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: mensaje.tipo === 'éxito' ? '#d4edda' : '#f8d7da', color: mensaje.tipo === 'éxito' ? '#155724' : '#721c24' }}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Nombre de la Fragancia:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Elixir Floral N° 5"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Concentración / Categoria:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="Parfum">Parfum (20% - 30%)</option>
              <option value="Eau de Parfum">Eau de Parfum (15% - 20%)</option>
              <option value="Eau de Toilette">Eau de Toilette (5% - 15%)</option>
              <option value="Eau de Cologne">Eau de Cologne (2% - 4%)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Base de Preparación (Gramos):</label>
            <input
              type="number"
              value={baseVolume}
              onChange={(e) => setBaseVolume(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>

        <h3>Composición de Ingredientes y Esencias</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Materia Prima / Componente</th>
              <th style={{ padding: '8px', width: '150px' }}>Porcentaje (%)</th>
              <th style={{ padding: '8px', width: '150px' }}>Peso Calculado (g)</th>
              <th style={{ padding: '8px', width: '80px' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ing) => (
              <tr key={ing.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>
                  <input
                    type="text"
                    value={ing.nombre}
                    placeholder="Ej. Esencia de Jazmín"
                    onChange={(e) => handleIngredientChange(ing.id, 'nombre', e.target.value)}
                    required
                    style={{ width: '95%', padding: '6px' }}
                  />
                </td>
                <td style={{ padding: '8px' }}>
                  <input
                    type="number"
                    step="0.01"
                    value={ing.porcentaje}
                    onChange={(e) => handleIngredientChange(ing.id, 'porcentaje', e.target.value)}
                    required
                    style={{ width: '90%', padding: '6px' }}
                  />
                </td>
                <td style={{ padding: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
                  {ing.pesoGramos} g
                </td>
                <td style={{ padding: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ing.id)}
                    style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={handleAddIngredient}
            style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
          >
            + Agregar Materia Prima
          </button>

          <div style={{ fontSize: '1.1em', fontWeight: 'bold', color: Math.abs(totalPercentage - 100) < 0.01 ? '#27ae60' : '#c0392b' }}>
            Total Mezcla: {totalPercentage.toFixed(2)}% {Math.abs(totalPercentage - 100) < 0.01 ? '✓ (Balanceado)' : '⚠ (Debe sumar 100%)'}
          </div>
        </div>

        <button
          type="submit"
          style={{ width: '100%', backgroundColor: '#27ae60', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontSize: '1.1em', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Guardar y Registrar Fórmula en SymriseNexus
        </button>
      </form>
    </div>
  );
};