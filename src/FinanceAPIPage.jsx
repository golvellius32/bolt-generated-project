import React, { useState } from 'react';

    function FinanceAPIPage() {
      const [apiConfig, setApiConfig] = useState({
        financeApi: '',
        apiKey: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setApiConfig(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // Save the API configuration settings
        console.log('API Configuration:', apiConfig);
      };

      return (
        <div>
          <h2>Finance API Configuration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="financeApi" className="block text-gray-700 font-bold mb-2">Finance API:</label>
              <input
                type="text"
                id="financeApi"
                name="financeApi"
                value={apiConfig.financeApi}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-gray-700 font-bold mb-2">API Key:</label>
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                value={apiConfig.apiKey}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Configuration
            </button>
          </form>
        </div>
      );
    }

    export default FinanceAPIPage;
