import { useState, useEffect } from 'react';

/**
 * Custom Hook para gestionar el estado global y las operaciones CRUD 
 * de las fórmulas de perfumería y órdenes de producción de SymriseNexus.
 * 
 * @returns {Object} Estado de fórmulas, órdenes y funciones de manipulación.
 */
export const usePerfumeFormulas = () => {
  const [formulas, setFormulas] = useState([]);
  const [productionOrders, setProductionOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial de datos desde el backend o almacenamiento local
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Simulación de carga desde API REST / Servlet de Perfumería
        const initialFormulas = [
          {
            id: 'F-101',
            nombre: 'Aqua Cítrica Oriental',
            categoria: 'Eau de Parfum',
            notasSalida: 'Bergamota, Mandarina',
            notasCorazon: 'Jazmín, Lavanda',
            notasFondo: 'Ámbar, Madera de Cedro',
            densidad: 0.85,
            ingredientes: [
              { id: 1, nombre: 'Aceite Esencial Bergamota', porcentaje: 15, pesoGramos: 150 },
              { id: 2, nombre: 'Absoluto de Jazmín', porcentaje: 10, pesoGramos: 100 },
              { id: 3, nombre: 'Fijador Ámbar', porcentaje: 5, pesoGramos: 50 },
              { id: 4, nombre: 'Alcohol Desnaturalizado 96°', porcentaje: 70, pesoGramos: 700 }
            ]
          }
        ];

        const initialOrders = [
          {
            id: 'OP-2026-001',
            formulaId: 'F-101',
            formulaNombre: 'Aqua Cítrica Oriental',
            lote: 'LT-8842',
            volumenLitros: 50,
            operario: 'Yamid Mendoza',
            estado: 'En Mezcla', // 'Pendiente', 'En Mezcla', 'Control de Calidad', 'Completado'
            fechaCreacion: '2026-11-06'
          }
        ];

        setFormulas(initialFormulas);
        setProductionOrders(initialOrders);
      } catch (err) {
        setError('Error al cargar la información del laboratorio de perfumería.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  /**
   * Registra una nueva fórmula de perfumería verificando que la suma de porcentajes sea 100%.
   */
  const addFormula = (newFormula) => {
    const totalPorcentaje = newFormula.ingredientes.reduce((sum, item) => sum + Number(item.porcentaje), 0);
    
    if (Math.abs(totalPorcentaje - 100) > 0.01) {
      throw new Error(`La suma de porcentajes de la fórmula debe ser exactamente 100%. Actual: ${totalPorcentaje}%`);
    }

    const formulaWithId = {
      ...newFormula,
      id: `F-${Date.now().toString().slice(-3)}`
    };

    setFormulas((prev) => [...prev, formulaWithId]);
    return formulaWithId;
  };

  /**
   * Cambia el estado de una orden de producción en el tablero.
   */
  const updateOrderStatus = (orderId, newStatus) => {
    setProductionOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, estado: newStatus } : order
      )
    );
  };

  return {
    formulas,
    productionOrders,
    loading,
    error,
    addFormula,
    updateOrderStatus
  };
};