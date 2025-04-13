import React, { useState, useEffect } from 'react';
import axios from 'axios';
import placeholderImage from '../assets/placeholder.png';
import { Slider } from '@mui/material';

function Catalog() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Function to fetch data from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/posts/get', {
          params: {
            title: filter,
            page: currentPage - 1, // adjust for 0-indexing at backend
            minPrice: priceRange[0],
            maxPrice: priceRange[1]
          },
        });
        setItems(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      } catch (err) {
        console.error(err);
        setItems([]);
        setTotalPages(0);
      }
    };
    fetchItems();
  }, [filter, priceRange, currentPage]);

  // Handler for slider change
  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      {/* Filters */}
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Filters</h2>
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:space-x-6 space-y-4 md:space-y-0">
        {/* Title Filter */}
        <div className="flex-1">
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Filter by title..."
            value={filter}
            onChange={(e) => {
              setCurrentPage(1);
              setFilter(e.target.value);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Price Range Filter */}
        <div className="flex-1">
          <label className="block font-medium mb-1 text-gray-700">Price Range: LEK {priceRange[0]} – LEK {priceRange[1]}</label>
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            max={1000}
            step={1}
            valueLabelPrecision={0}
            className="w-full"
            sx={{ color: '#4CAF50' }} // Green color for the slider
          />
        </div>
      </div>

      {/* Catalog Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-green-700">Catalog Items</h2>
      </div>

      {/* Catalog Items */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <img
                  src={item.image ? URL.createObjectURL(new Blob([item.image])) : placeholderImage}
                  alt={item.title}
                  className="max-w-[250px] h-auto object-contain rounded-md"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-bold text-green-500">{item.price} USD</p>
              <p className="text-sm text-gray-500">{item.userName}</p>
              <p className="text-xs text-gray-400">{new Date(item.createdDate).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">No results found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-4 flex justify-center space-x-2 items-center">
          {totalPages > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Previous
            </button>
          )}
          <span className="text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
          {totalPages > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Catalog;
