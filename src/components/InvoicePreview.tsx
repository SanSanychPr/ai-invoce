import React from 'react';
import { Invoice } from '../types';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const total = invoice.items.reduce((sum, item) => {
    const price = parseFloat(item.price.split(' ')[0]);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="w-[210mm] h-[297mm] bg-white p-8 shadow-lg mx-auto">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-600">#{invoice.number}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">Date: {invoice.date}</p>
          <p className="text-gray-600">Due Date: {invoice.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-semibold mb-2">From:</h2>
          <div className="text-gray-700">
            <p className="font-medium">{invoice.sender.name}</p>
            <p>{invoice.sender.address}</p>
            <p>{invoice.sender.phone}</p>
            <p>{invoice.sender.email}</p>
            <p>Tax ID: {invoice.sender.taxId}</p>
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">To:</h2>
          <div className="text-gray-700">
            <p className="font-medium">{invoice.recipient.name}</p>
            <p>{invoice.recipient.address}</p>
            <p>{invoice.recipient.phone}</p>
            <p>{invoice.recipient.email}</p>
            <p>Tax ID: {invoice.recipient.taxId}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left py-2">Item</th>
            <th className="text-left py-2">Brand</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => {
            const price = parseFloat(item.price.split(' ')[0]);
            const itemTotal = price * item.quantity;
            return (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-2">{item.title}</td>
                <td className="py-2">{item.brand}</td>
                <td className="text-right py-2">{item.price}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">{itemTotal.toFixed(2)} KZT</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td colSpan={4} className="text-right py-2">Total:</td>
            <td className="text-right py-2">{total.toFixed(2)} KZT</td>
          </tr>
        </tfoot>
      </table>

      {invoice.notes && (
        <div className="mb-8">
          <h2 className="font-semibold mb-2">Notes:</h2>
          <p className="text-gray-700">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}