import React, { useState } from 'react';

    function TickerSetPage() {
      const [tickerConfig, setTickerConfig] = useState({
        ticker: '',
        quarter: '',
        year: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setTickerConfig(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // Fetch financial data based on the specified inputs
        console.log('Ticker Configuration:', tickerConfig);
      };

      return (
        <div>
          <h2>Ticker Set</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="ticker" className="block text-gray-700 font-bold mb-2">Ticker:</label>
              <input
                type="text"
                id="ticker"
                name="ticker"
                value={tickerConfig.ticker}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quarter" className="block text-gray-700 font-bold mb-2">Quarter:</label>
              <input
                type="text"
                id="quarter"
                name="quarter"
                value={tickerConfig.quarter}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="block text-gray-700 font-bold mb-2">Year:</label>
              <input
                type="text"
                id="year"
                name="year"
                value={tickerConfig.year}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Fetch Financial Data
            </button>
          </form>
        </div>
      );
    }

    export default TickerSetPage;
