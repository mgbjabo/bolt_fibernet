import React, { useState, useEffect } from 'react';
import { Database, Edit3, Save, X, Plus, Trash2, Cable, Activity } from 'lucide-react';

interface CoreConnection {
  id: string;
  routeId: string;
  portCard1: string;
  portCard2: string;
  otdrDistance: number;
  groundDistance: number;
  totalLoss: number;
  trafficName: string;
  status: 'active' | 'idle';
}

interface CoreCard {
  id: string;
  name: string;
  location: string;
  capacity: number;
  usedPorts: number;
}

interface RouteData {
  id: string;
  name: string;
  card1: CoreCard;
  card2: CoreCard;
  connections: CoreConnection[];
}

const STORAGE_KEY = 'core_management_data';

export default function CoreManagement() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editingConnection, setEditingConnection] = useState<string | null>(null);
  const [newConnection, setNewConnection] = useState<{ [routeId: string]: Partial<CoreConnection> }>({});

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setRoutes(JSON.parse(savedData));
    } else {
      // Initialize with default data for 6 routes
      const defaultRoutes: RouteData[] = Array.from({ length: 6 }, (_, index) => ({
        id: `route-${index + 1}`,
        name: `Route ${String.fromCharCode(65 + index)}`,
        card1: {
          id: `card1-${index + 1}`,
          name: `Link ${index + 1}`,
          location: `Hub ${String.fromCharCode(65 + index)}`,
          capacity: 144,
          usedPorts: Math.floor(Math.random() * 50) + 20
        },
        card2: {
          id: `card2-${index + 1}`,
          name: `Link ${index + 2}`,
          location: `Terminal ${String.fromCharCode(65 + index)}`,
          capacity: 144,
          usedPorts: Math.floor(Math.random() * 50) + 20
        },
        connections: [
          {
            id: `conn-${index + 1}-1`,
            routeId: `route-${index + 1}`,
            portCard1: `1/${Math.floor(Math.random() * 12) + 1}`,
            portCard2: `1/${Math.floor(Math.random() * 12) + 1}`,
            otdrDistance: Math.round((Math.random() * 10 + 5) * 100) / 100,
            groundDistance: Math.round((Math.random() * 12 + 6) * 100) / 100,
            totalLoss: Math.round((Math.random() * 3 + 1) * 100) / 100,
            trafficName: `Traffic-${String.fromCharCode(65 + index)}-${Math.floor(Math.random() * 100) + 1}`,
            status: Math.random() > 0.3 ? 'active' : 'idle'
          },
          {
            id: `conn-${index + 1}-2`,
            routeId: `route-${index + 1}`,
            portCard1: `2/${Math.floor(Math.random() * 12) + 1}`,
            portCard2: `2/${Math.floor(Math.random() * 12) + 1}`,
            otdrDistance: Math.round((Math.random() * 10 + 5) * 100) / 100,
            groundDistance: Math.round((Math.random() * 12 + 6) * 100) / 100,
            totalLoss: Math.round((Math.random() * 3 + 1) * 100) / 100,
            trafficName: `Traffic-${String.fromCharCode(65 + index)}-${Math.floor(Math.random() * 100) + 1}`,
            status: Math.random() > 0.3 ? 'active' : 'idle'
          }
        ]
      }));
      setRoutes(defaultRoutes);
    }
  }, []);

  // Save data to localStorage whenever routes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
  }, [routes]);

  const updateCard = (routeId: string, cardId: string, updates: Partial<CoreCard>) => {
    setRoutes(routes.map(route => {
      if (route.id === routeId) {
        return {
          ...route,
          card1: route.card1.id === cardId ? { ...route.card1, ...updates } : route.card1,
          card2: route.card2.id === cardId ? { ...route.card2, ...updates } : route.card2
        };
      }
      return route;
    }));
  };

  const updateConnection = (routeId: string, connectionId: string, updates: Partial<CoreConnection>) => {
    setRoutes(routes.map(route => {
      if (route.id === routeId) {
        return {
          ...route,
          connections: route.connections.map(conn => 
            conn.id === connectionId ? { ...conn, ...updates } : conn
          )
        };
      }
      return route;
    }));
  };

  const addConnection = (routeId: string) => {
    const newConn: CoreConnection = {
      id: `conn-${Date.now()}`,
      routeId,
      portCard1: '1/1',
      portCard2: '1/1',
      otdrDistance: 0,
      groundDistance: 0,
      totalLoss: 0,
      trafficName: '',
      status: 'idle'
    };

    setRoutes(routes.map(route => {
      if (route.id === routeId) {
        return {
          ...route,
          connections: [...route.connections, newConn]
        };
      }
      return route;
    }));
  };

  const deleteConnection = (routeId: string, connectionId: string) => {
    setRoutes(routes.map(route => {
      if (route.id === routeId) {
        return {
          ...route,
          connections: route.connections.filter(conn => conn.id !== connectionId)
        };
      }
      return route;
    }));
  };

  const addRoute = () => {
    const newRouteIndex = routes.length;
    const newRoute: RouteData = {
      id: `route-${Date.now()}`,
      name: `Route ${String.fromCharCode(65 + newRouteIndex)}`,
      card1: {
        id: `card1-${Date.now()}`,
        name: `Link ${newRouteIndex + 1}`,
        location: `Hub ${String.fromCharCode(65 + newRouteIndex)}`,
        capacity: 144,
        usedPorts: 0
      },
      card2: {
        id: `card2-${Date.now()}`,
        name: `Link ${newRouteIndex + 2}`,
        location: `Terminal ${String.fromCharCode(65 + newRouteIndex)}`,
        capacity: 144,
        usedPorts: 0
      },
      connections: []
    };
    setRoutes([...routes, newRoute]);
  };

  const deleteRoute = (routeId: string) => {
    setRoutes(routes.filter(route => route.id !== routeId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Database className="h-8 w-8 mr-3 text-blue-600" />
              Core Management
            </h2>
            <p className="text-gray-600">Manage fiber optic core connections and routing</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={addRoute}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Route</span>
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Routes</p>
              <p className="text-2xl font-bold text-gray-900">{routes.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Routes */}
      <div className="space-y-12">
        {routes.map((route) => (
          <div key={route.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Route Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{route.name}</h3>
              <button
                onClick={() => deleteRoute(route.id)}
                className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Route</span>
              </button>
            </div>

            {/* Core Cards */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-blue-900 flex items-center">
                    <Cable className="h-5 w-5 mr-2" />
                    {editingCard === route.card1.id ? (
                      <input
                        type="text"
                        value={route.card1.name}
                        onChange={(e) => updateCard(route.id, route.card1.id, { name: e.target.value })}
                        className="bg-white border border-blue-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      route.card1.name
                    )}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {editingCard === route.card1.id ? (
                      <>
                        <button
                          onClick={() => setEditingCard(null)}
                          className="p-1 text-green-600 hover:text-green-800 rounded"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingCard(null)}
                          className="p-1 text-gray-600 hover:text-gray-800 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditingCard(route.card1.id)}
                        className="p-1 text-blue-600 hover:text-blue-800 rounded"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Location:</span>
                    {editingCard === route.card1.id ? (
                      <input
                        type="text"
                        value={route.card1.location}
                        onChange={(e) => updateCard(route.id, route.card1.id, { location: e.target.value })}
                        className="bg-white border border-blue-300 rounded px-1 text-xs w-24 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium text-blue-900">{route.card1.location}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Capacity:</span>
                    {editingCard === route.card1.id ? (
                      <input
                        type="number"
                        value={route.card1.capacity}
                        onChange={(e) => updateCard(route.id, route.card1.id, { capacity: parseInt(e.target.value) || 0 })}
                        className="bg-white border border-blue-300 rounded px-1 text-xs w-16 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium text-blue-900">{route.card1.capacity}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Used Ports:</span>
                    {editingCard === route.card1.id ? (
                      <input
                        type="number"
                        value={route.card1.usedPorts}
                        onChange={(e) => updateCard(route.id, route.card1.id, { usedPorts: parseInt(e.target.value) || 0 })}
                        className="bg-white border border-blue-300 rounded px-1 text-xs w-16 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium text-blue-900">{route.card1.usedPorts}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Available:</span>
                    <span className="font-medium text-green-600">{route.card1.capacity - route.card1.usedPorts}</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-green-900 flex items-center">
                    <Cable className="h-5 w-5 mr-2" />
                    {editingCard === route.card2.id ? (
                      <input
                        type="text"
                        value={route.card2.name}
                        onChange={(e) => updateCard(route.id, route.card2.id, { name: e.target.value })}
                        className="bg-white border border-green-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-green-500"
                      />
                    ) : (
                      route.card2.name
                    )}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {editingCard === route.card2.id ? (
                      <>
                        <button
                          onClick={() => setEditingCard(null)}
                          className="p-1 text-green-600 hover:text-green-800 rounded"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingCard(null)}
                          className="p-1 text-gray-600 hover:text-gray-800 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditingCard(route.card2.id)}
                        className="p-1 text-green-600 hover:text-green-800 rounded"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Location:</span>
                    {editingCard === route.card2.id ? (
                      <input
                        type="text"
                        value={route.card2.location}
                        onChange={(e) => updateCard(route.id, route.card2.id, { location: e.target.value })}
                        className="bg-white border border-green-300 rounded px-1 text-xs w-24 focus:ring-1 focus:ring-green-500"
                      />
                    ) : (
                      <span className="font-medium text-green-900">{route.card2.location}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Capacity:</span>
                    {editingCard === route.card2.id ? (
                      <input
                        type="number"
                        value={route.card2.capacity}
                        onChange={(e) => updateCard(route.id, route.card2.id, { capacity: parseInt(e.target.value) || 0 })}
                        className="bg-white border border-green-300 rounded px-1 text-xs w-16 focus:ring-1 focus:ring-green-500"
                      />
                    ) : (
                      <span className="font-medium text-green-900">{route.card2.capacity}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Used Ports:</span>
                    {editingCard === route.card2.id ? (
                      <input
                        type="number"
                        value={route.card2.usedPorts}
                        onChange={(e) => updateCard(route.id, route.card2.id, { usedPorts: parseInt(e.target.value) || 0 })}
                        className="bg-white border border-green-300 rounded px-1 text-xs w-16 focus:ring-1 focus:ring-green-500"
                      />
                    ) : (
                      <span className="font-medium text-green-900">{route.card2.usedPorts}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Available:</span>
                    <span className="font-medium text-blue-600">{route.card2.capacity - route.card2.usedPorts}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Connection Data Table */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-medium text-gray-900">Core Connection Data</h5>
                <button
                  onClick={() => addConnection(route.id)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Connection</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Port Card 1 → Card 2
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        OTDR Distance (km)
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ground Distance (km)
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Loss (dB)
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Traffic Name
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {route.connections.map((connection) => (
                      <tr key={connection.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {editingConnection === connection.id ? (
                            <div className="flex space-x-1">
                              <input
                                type="text"
                                value={connection.portCard1}
                                onChange={(e) => updateConnection(route.id, connection.id, { portCard1: e.target.value })}
                                className="w-16 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                              />
                              <span className="text-gray-500">→</span>
                              <input
                                type="text"
                                value={connection.portCard2}
                                onChange={(e) => updateConnection(route.id, connection.id, { portCard2: e.target.value })}
                                className="w-16 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          ) : (
                            <span className="font-mono">{connection.portCard1} → {connection.portCard2}</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {editingConnection === connection.id ? (
                            <input
                              type="number"
                              step="0.01"
                              value={connection.otdrDistance}
                              onChange={(e) => updateConnection(route.id, connection.id, { otdrDistance: parseFloat(e.target.value) || 0 })}
                              className="w-20 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                            />
                          ) : (
                            connection.otdrDistance
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {editingConnection === connection.id ? (
                            <input
                              type="number"
                              step="0.01"
                              value={connection.groundDistance}
                              onChange={(e) => updateConnection(route.id, connection.id, { groundDistance: parseFloat(e.target.value) || 0 })}
                              className="w-20 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                            />
                          ) : (
                            connection.groundDistance
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {editingConnection === connection.id ? (
                            <input
                              type="number"
                              step="0.01"
                              value={connection.totalLoss}
                              onChange={(e) => updateConnection(route.id, connection.id, { totalLoss: parseFloat(e.target.value) || 0 })}
                              className="w-20 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                            />
                          ) : (
                            <span className={connection.totalLoss > 2 ? 'text-red-600 font-medium' : 'text-green-600'}>
                              {connection.totalLoss}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {editingConnection === connection.id ? (
                            <input
                              type="text"
                              value={connection.trafficName}
                              onChange={(e) => updateConnection(route.id, connection.id, { trafficName: e.target.value })}
                              className="w-24 px-1 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                            />
                          ) : (
                            connection.trafficName
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {editingConnection === connection.id ? (
                            <select
                              value={connection.status}
                              onChange={(e) => updateConnection(route.id, connection.id, { status: e.target.value as 'active' | 'idle' })}
                              className="px-1 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="active">Active</option>
                              <option value="idle">Idle</option>
                            </select>
                          ) : (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              connection.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <Activity className="h-3 w-3 mr-1" />
                              {connection.status}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          <div className="flex items-center space-x-1">
                            {editingConnection === connection.id ? (
                              <>
                                <button
                                  onClick={() => setEditingConnection(null)}
                                  className="p-1 text-green-600 hover:text-green-800 rounded"
                                >
                                  <Save className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => setEditingConnection(null)}
                                  className="p-1 text-gray-600 hover:text-gray-800 rounded"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setEditingConnection(connection.id)}
                                className="p-1 text-blue-600 hover:text-blue-800 rounded"
                              >
                                <Edit3 className="h-3 w-3" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteConnection(route.id, connection.id)}
                              className="p-1 text-red-600 hover:text-red-800 rounded"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {route.connections.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Cable className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No connections configured for this route</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {routes.length === 0 && (
        <div className="text-center py-12">
          <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No routes configured</h3>
          <p className="text-gray-500 mb-4">Start by adding your first route to manage core connections</p>
          <button
            onClick={addRoute}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add First Route</span>
          </button>
        </div>
      )}
    </div>
  );
}