import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductSearchProps {
  onAddProduct: (product: Product) => void;
}

export function ProductSearch({ onAddProduct }: ProductSearchProps) {
  const [articleId, setArticleId] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const searchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://cdn0.it4profit.com/s3/cms/feeds/google_55_128_ru.xml');
      const text = await response.text();
      // Parse XML and find product by ID
      // This is a simplified version - you'll need to implement proper XML parsing
      if (text.includes(articleId)) {
        // Mock product for demonstration
        const newProduct = {
          id: articleId,
          title: 'Sample Product',
          price: '100.00 KZT',
          quantity: 1,
          brand: 'Sample Brand',
          image: 'https://example.com/image.jpg'
        };
        setProduct(newProduct);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={articleId}
            onChange={(e) => setArticleId(e.target.value)}
            placeholder="Enter article ID"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={searchProduct}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Searching...' : <Search className="h-5 w-5" />}
        </button>
      </div>

      {product && (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-4">
            <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
            <div>
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
            </div>
          </div>
          <button
            onClick={() => {
              onAddProduct(product);
              setProduct(null);
              setArticleId('');
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}