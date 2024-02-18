import Navbar from '@/components/navbar';
import React from 'react';

const products = [
  { id: 1, name: 'Product 1', price: 19.99 },
  { id: 2, name: 'Product 2', price: 29.99 },
  { id: 3, name: 'Product 3', price: 39.99 },
];

function ProductDisplay() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-28">
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 border rounded-md">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              {/* Add more details / features */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
