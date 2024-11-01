import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import { FileDown } from 'lucide-react';
import { CompanyForm } from './components/CompanyForm';
import { ProductSearch } from './components/ProductSearch';
import { InvoicePreview } from './components/InvoicePreview';
import { Company, Product, Invoice } from './types';

const emptyCompany: Company = {
  name: '',
  address: '',
  phone: '',
  email: '',
  taxId: '',
};

const initialInvoice: Invoice = {
  number: `INV-${Date.now()}`,
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  sender: emptyCompany,
  recipient: emptyCompany,
  items: [],
  notes: '',
};

function App() {
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const { toPDF, targetRef } = usePDF({
    filename: `invoice-${invoice.number}.pdf`,
    page: { format: 'a4' }
  });

  const handleAddProduct = (product: Product) => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, product],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => toPDF()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <FileDown className="h-5 w-5 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <div className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <CompanyForm
                title="Sender Information"
                company={invoice.sender}
                onChange={(sender) => setInvoice((prev) => ({ ...prev, sender }))}
              />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <CompanyForm
                title="Recipient Information"
                company={invoice.recipient}
                onChange={(recipient) => setInvoice((prev) => ({ ...prev, recipient }))}
              />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
              <ProductSearch onAddProduct={handleAddProduct} />
              
              {invoice.items.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Added Products</h3>
                  <div className="space-y-2">
                    {invoice.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.price}</p>
                        </div>
                        <button
                          onClick={() => {
                            setInvoice((prev) => ({
                              ...prev,
                              items: prev.items.filter((_, i) => i !== index),
                            }));
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
                  <input
                    type="text"
                    value={invoice.number}
                    onChange={(e) => setInvoice((prev) => ({ ...prev, number: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={invoice.date}
                      onChange={(e) => setInvoice((prev) => ({ ...prev, date: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                      type="date"
                      value={invoice.dueDate}
                      onChange={(e) => setInvoice((prev) => ({ ...prev, dueDate: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    value={invoice.notes}
                    onChange={(e) => setInvoice((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div ref={targetRef}>
            <InvoicePreview invoice={invoice} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;