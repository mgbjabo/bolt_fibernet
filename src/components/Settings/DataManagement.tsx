import React, { useState } from 'react';
import { 
  Database, Download, Upload, Trash2, RefreshCw, 
  Settings, Save, AlertTriangle, CheckCircle, 
  FileText, HardDrive, Clock, Users
} from 'lucide-react';

export default function DataManagement() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [lastBackup, setLastBackup] = useState('2024-02-20T10:30:00Z');

  const handleExportData = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger a file download
      alert('Data export completed successfully!');
    }, 2000);
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false);
      alert('Data import completed successfully!');
      event.target.value = ''; // Reset file input
    }, 2000);
  };

  const handleBackupData = async () => {
    // Simulate backup process
    const now = new Date().toISOString();
    setLastBackup(now);
    alert('Backup created successfully!');
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      // In a real app, this would clear the data
      alert('Data cleared successfully!');
    }
  };

  const dataStats = {
    totalRoutes: 6,
    totalTickets: 4,
    totalAssets: 5,
    totalActivities: 17,
    databaseSize: '2.4 MB',
    lastSync: '2024-02-20T14:30:00Z'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Database className="h-8 w-8 mr-3 text-blue-600" />
              Data Management
            </h2>
            <p className="text-gray-600">Manage application data, backups, and system settings</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Database Size</p>
            <p className="text-2xl font-bold text-gray-900">{dataStats.databaseSize}</p>
          </div>
        </div>
      </div>

      {/* Data Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Routes</p>
              <p className="text-2xl font-bold text-gray-900">{dataStats.totalRoutes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Trouble Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{dataStats.totalTickets}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <HardDrive className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Network Assets</p>
              <p className="text-2xl font-bold text-gray-900">{dataStats.totalAssets}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Activities</p>
              <p className="text-2xl font-bold text-gray-900">{dataStats.totalActivities}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Export/Import Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <RefreshCw className="h-5 w-5 mr-2 text-blue-600" />
            Data Export & Import
          </h3>

          <div className="space-y-4">
            {/* Export Data */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Export Data</h4>
                  <p className="text-sm text-gray-600">Download all application data as JSON</p>
                </div>
                <Download className="h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={handleExportData}
                disabled={isExporting}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isExporting
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </>
                )}
              </button>
            </div>

            {/* Import Data */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Import Data</h4>
                  <p className="text-sm text-gray-600">Upload and restore data from JSON file</p>
                </div>
                <Upload className="h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  disabled={isImporting}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <button
                  disabled={isImporting}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isImporting
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isImporting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Importing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Choose File to Import</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Backup & Maintenance Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Save className="h-5 w-5 mr-2 text-green-600" />
            Backup & Maintenance
          </h3>

          <div className="space-y-4">
            {/* Last Backup Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-900">Last Backup</h4>
              </div>
              <p className="text-sm text-green-700">
                {new Date(lastBackup).toLocaleString()}
              </p>
            </div>

            {/* Create Backup */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Create Backup</h4>
                  <p className="text-sm text-gray-600">Create a backup of current data</p>
                </div>
                <Save className="h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={handleBackupData}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Create Backup</span>
              </button>
            </div>

            {/* Clear Data */}
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-red-900">Clear All Data</h4>
                  <p className="text-sm text-red-700">Permanently delete all application data</p>
                </div>
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <button
                onClick={handleClearData}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-gray-600" />
          System Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Application Version</h4>
            <p className="text-sm text-gray-600">v1.0.0</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Last Synchronization</h4>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-600">
                {new Date(dataStats.lastSync).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Storage Usage</h4>
            <div className="flex items-center space-x-2">
              <HardDrive className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-600">{dataStats.databaseSize} used</p>
            </div>
          </div>
        </div>

        {/* Storage Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Storage Usage</span>
            <span className="text-sm text-gray-500">24% of 10 MB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
        </div>
      </div>

      {/* Data Management Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Data Management Tips
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Regular backups are recommended before major system updates</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Export data periodically for external storage and compliance</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Imported data will overwrite existing records with matching IDs</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Clear data operation is irreversible - ensure you have backups</span>
          </li>
        </ul>
      </div>
    </div>
  );
}