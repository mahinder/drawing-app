import React from "react";
import { Save, Download, Trash2, Upload } from "lucide-react";

interface HeaderProps {
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onClear: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSave,
  onLoad,
  onExport,
  onClear,
}) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">Drawing App</h1>
          <div className="flex space-x-2">
            <button
              onClick={onSave}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 mr-1" />
              Save State
            </button>
            <button
              onClick={onLoad}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="w-4 h-4 mr-1" />
              Load State
            </button>
            <button
              onClick={onExport}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Download className="w-4 h-4 mr-1" />
              Export PNG
            </button>
            <button
              onClick={onClear}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
