# Financial Advice Generation Tool

    This project is a React application that allows users to fetch financial data from the SIMFIN API, select an LLM (Language Model) for analysis, and receive a summary and recommendation based on the financial data.

    ## Project Structure

    ```
    /financial-advice-tool
    ├── node_modules/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   ├── simfin.js
    │   │   └── ollama.js
    │   ├── App.jsx
    │   ├── FinanceAPIPage.jsx
    │   ├── LLMPage.jsx
    │   ├── NavigationBar.jsx
    │   ├── TickerSetPage.jsx
    │   └── main.jsx
    ├── package.json
    └── README.md
    ```

    ## Files and Methods

    ### `public/index.html`
    - **Description**: Sets up the basic HTML structure with a link to Tailwind CSS and includes the main entry point (`main.jsx`).

    ### `src/main.jsx`
    - **Description**: Renders the `App` component.

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
    ```

    ### `src/App.jsx`
    - **Description**: Manages the state of `financialData` and renders the navigation bar, LLM page, and Ticker Set page.

    ```jsx
    import React, { useState } from 'react';
    import NavigationBar from './NavigationBar';
    import FinanceAPIPage from './FinanceAPIPage';
    import LLMPage from './LLMPage';
    import TickerSetPage from './TickerSetPage';

    function App() {
      const [financialData, setFinancialData] = useState(null);

      return (
        <div>
          <NavigationBar />
          <div className="mt-16 p-4">
            <FinanceAPIPage />
            <LLMPage financialData={financialData} />
            <TickerSetPage setFinancialData={setFinancialData} />
          </div>
        </div>
      );
    }

    export default App;
    ```

    ### `src/NavigationBar.jsx`
    - **Description**: Implements a fixed navigation bar with links to different configuration pages.

    ```jsx
    import React from 'react';

    function NavigationBar() {
      return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md">
          <ul className="flex justify-between items-center py-4 px-4">
            <li>
              <a href="#finance-api" className="text-blue-500 hover:text-blue-700">Finance API</a>
            </li>
            <li>
              <a href="#llm" className="text-blue-500 hover:text-blue-700">LLM</a>
            </li>
            <li>
              <a href="#ticker-set" className="text-blue-500 hover:text-blue-700">Ticker Set</a>
            </li>
          </ul>
        </nav>
      );
    }

    export default NavigationBar;
    ```

    ### `src/FinanceAPIPage.jsx`
    - **Description**: Placeholder for configuring the finance API and setting the API key.

    ```jsx
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
    ```

    ### `src/TickerSetPage.jsx`
    - **Description**: Allows users to specify the ticker, quarter, and year, and fetches financial data using the SIMFIN API.

    ```jsx
    import React, { useState } from 'react';
    import SimFin from '../api/simfin';

    function TickerSetPage({ setFinancialData }) {
      const [tickerConfig, setTickerConfig] = useState({
        ticker: '',
        quarter: '',
        year: ''
      });
      const [apiKey, setApiKey] = useState('');

      const handleChange = (e) => {
        const { name, value } = e.target;
        setTickerConfig(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleApiKeyChange = (e) => {
        setApiKey(e.target.value);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const simfin = new SimFin(apiKey);
          const data = await simfin.getFinancials(tickerConfig.ticker, tickerConfig.year, tickerConfig.quarter);
          setFinancialData(data);
          console.log('Financial Data:', data);
        } catch (error) {
          console.error(error);
        }
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
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-gray-700 font-bold mb-2">API Key:</label>
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                value={apiKey}
                onChange={handleApiKeyChange}
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
    ```

    ### `src/LLMPage.jsx`
    - **Description**: Allows users to select an LLM (SIMFIN or Ollama) and processes the financial data for analysis and recommendation.

    ```jsx
    import React, { useState, useEffect } from 'react';
    import SimFin from '../api/simfin';
    import Ollama from '../api/ollama';

    function LLMPage({ financialData }) {
      const [llmAnalysis, setLlmAnalysis] = useState('');
      const [llmRecommendation, setLlmRecommendation] = useState('');
      const [selectedLLM, setSelectedLLM] = useState('simfin');

      useEffect(() => {
        if (financialData) {
          analyzeFinancials(financialData);
        }
      }, [financialData, selectedLLM]);

      const analyzeFinancials = async (data) => {
        let analysis = '';
        let recommendation = '';

        if (selectedLLM === 'simfin') {
          // Mock SIMFIN analysis
          const balanceSheet = data.balance;
          const cashFlow = data.cashFlow;
          const derivedMetrics = data.derived;

          analysis += "Based on the provided financial information, here is a summary of the company's finances:\n\n";

          // Balance Sheet Summary
          analysis += "1. Balance Sheet:\n";
          analysis += `   - Total Assets: ${balanceSheet.Assets["Total Assets"]}\n`;
          analysis += `   - Total Liabilities: ${balanceSheet.Liabilities["Total Liabilities"]}\n`;
          analysis += `   - Total Equity: ${balanceSheet.Equity["Total Equity"]}\n\n`;

          // Cash Flow Summary
          analysis += "2. Cash Flow:\n";
          analysis += `   - Net Cash from Operating Activities: ${cashFlow["Operating Activities"]["Net Cash from Operating Activities"]}\n`;
          analysis += `   - Net Cash from Investing Activities: ${cashFlow["Investing Activities"]["Net Cash from Investing Activities"]}\n`;
          analysis += `   - Net Cash from Financing Activities: ${cashFlow["Financing Activities"]["Net Cash from Financing Activities"]}\n`;
          analysis += `   - Net Change in Cash: ${cashFlow.NetChange["Net Change in Cash"]}\n\n`;

          // Profitability Metrics Summary
          analysis += "3. Profitability Metrics:\n";
          analysis += `   - Gross Profit Margin: ${derivedMetrics["Profitability Metrics"]["Gross Profit Margin"]}%\n`;
          analysis += `   - Operating Margin: ${derivedMetrics["Profitability Metrics"]["Operating Margin"]}%\n`;
          analysis += `   - Net Profit Margin: ${derivedMetrics["Profitability Metrics"]["Net Profit Margin"]}%\n`;
          analysis += `   - Return on Equity: ${derivedMetrics["Profitability Metrics"]["Return on Equity"]}%\n`;
          analysis += `   - Return on Assets: ${derivedMetrics["Profitability Metrics"]["Return on Assets"]}%\n`;
          analysis += `   - Return on Invested Capital: ${derivedMetrics["Profitability Metrics"]["Return On Invested Capital"]}%\n\n`;

          recommendation = "The company has a strong balance sheet with a significant amount of assets compared to its liabilities, indicating a healthy financial position. The company generated positive cash flow from its operating activities but had negative cash flow from investing and financing activities, resulting in a decrease in cash during the period. The company has healthy profitability metrics, indicating efficient operations and good returns on investment.";
        } else if (selectedLLM === 'ollama') {
          // Use Ollama for analysis
          const ollama = new Ollama();
          const prompt = `Analyze the following financial data:\n\n${JSON.stringify(financialData, null, 2)}`;
          try {
            const response = await ollama.chat([{ role: 'user', content: prompt }], 'gpt-3.5-turbo');
            analysis = response;
            recommendation = "Based on the Ollama analysis, here is a recommendation.";
          } catch (error) {
            console.error(error);
            analysis = "Error analyzing financial data with Ollama.";
            recommendation = "No recommendation available.";
          }
        }

        setLlmAnalysis(analysis);
        setLlmRecommendation(recommendation);
      };

      return (
        <div>
          <h2>LLM Analysis and Recommendation</h2>
          <div className="mb-4">
            <label htmlFor="llmSelect" className="block text-gray-700 font-bold mb-2">Select LLM:</label>
            <select
              id="llmSelect"
              value={selectedLLM}
              onChange={(e) => setSelectedLLM(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="simfin">SIMFIN</option>
              <option value="ollama">Ollama</option>
            </select>
          </div>
          {llmAnalysis ? (
            <>
              <p>{llmAnalysis}</p>
              <p><strong>Recommendation:</strong> {llmRecommendation}</p>
            </>
          ) : (
            <p>No financial data provided for analysis.</p>
          )}
        </div>
      );
    }

    export default LLMPage;
    ```

    ### `src/api/simfin.js`
    - **Description**: Handles all interactions with the SIMFIN API.

    ```jsx
    import axios from 'axios';

    class SimFin {
      constructor(apiKey) {
        this.url = "https://backend.simfin.com/api/v3";
        this.apiKey = apiKey;
      }

      async _getCompanyStatements(ticker, statement, fyear, period) {
        const headers = {
          "Authorization": `api-key ${this.apiKey}`,
          "Accept": "application/json",
        };
        const params = {
          ticker: ticker,
          statements: statement,
          fyear: fyear,
          period: period,
        };
        try {
          const response = await axios.get(`${this.url}/companies/statements/compact`, { headers, params });
          return response.data;
        } catch (error) {
          console.error(`Request failed with status code: ${error.response.status}, response: ${error.response.data}`);
          throw error;
        }
      }

      _extractFinancialData(jsonData) {
        if (!jsonData || !jsonData[0] || !jsonData[0]["statements"]) {
          throw new Error("No data found");
        }
        const data = jsonData[0]["statements"][0]['data'][0];
        const extractedData = {};
        const columns = jsonData[0]["statements"][0]['columns'];
        for (let index = 0; index < columns.length; index++) {
          extractedData[columns[index]] = data[index];
        }
        return extractedData;
      }

      _buildSummaryJson(extractedData, categories) {
        const summaryJson = {};
        for (const [category, keys] of Object.entries(categories)) {
          summaryJson[category] = {};
          for (const key of keys) {
            let value = extractedData.get(key);
            if (value === null || value === undefined) {
              value = "N/A";
            } else if (typeof value === 'number') {
              value = value.toLocaleString();
            }
            summaryJson[category][key] = value;
          }
        }
        return summaryJson;
      }

      async getDerived(ticker, fyear, period) {
        const data = await this._getCompanyStatements(ticker, "derived", fyear, period);
        const extractedData = this._extractFinancialData(data);
        const columnMap = {
          "Profitability Metrics": [
            "EBITDA",
            "Gross Profit Margin",
            "Operating Margin",
            "Net Profit Margin",
            "Return on Equity",
            "Return on Assets",
            "Return On Invested Capital",
          ],
          "Liquidity Metrics": ["Current Ratio"],
          "Solvency Metrics": [
            "Total Debt",
            "Liabilities to Equity Ratio",
            "Debt Ratio",
          ],
          "Cash Flow Metrics": [
            "Free Cash Flow",
            "Free Cash Flow to Net Income",
            "Cash Return On Invested Capital",
          ],
          "Other Important Metrics": [
            "Piotroski F-Score",
            "Net Debt / EBITDA",
            "Dividend Payout Ratio",
          ],
          "Metadata": ["Report Date"],
        };
        return this._buildSummaryJson(extractedData, columnMap);
      }

      async getCashFlow(ticker, fyear, period) {
        const data = await this._getCompanyStatements(ticker, "cf", fyear, period);
        const extractedData = this._extractFinancialData(data);
        const columnMap = {
          "Operating Activities": [
            "Change in Working Capital",
            "Net Cash from Operating Activities",
          ],
          "Investing Activities": [
            "Acquisition of Fixed Assets & Intangibles",
            "Net Cash from Investing Activities",
          ],
          "Financing Activities": [
            "Dividends Paid",
            "Cash from (Repayment of) Debt",
            "Net Cash from Financing Activities",
          ],
          "Net Change": ["Net Change in Cash"],
          "Metadata": ["Report Date", "Publish Date", "Source"],
        };
        return this._buildSummaryJson(extractedData, columnMap);
      }

      async getProfitLoss(ticker, fyear, period) {
        const data = await this._getCompanyStatements(ticker, "pl", fyear, period);
        const extractedData = this._extractFinancialData(data);
        const categories = {
          "Income": ["Revenue", "Gross Profit"],
          "Expenses": [
            "Operating Expenses",
          ],
          "Profitability": ["Operating Income (Loss)", "Pretax Income (Loss)"],
          "Metadata": ["Report Date", "Publish Date", "Source"],
        };
        return this._buildSummaryJson(extractedData, categories);
      }

      async getBalanceSheet(ticker, fyear, period) {
        const data = await this._getCompanyStatements(ticker, "bs", fyear, period);
        const extractedData = this._extractFinancialData(data);
        const categories = {
          "Assets": [
            "Cash, Cash Equivalents & Short Term Investments",
            "Accounts & Notes Receivable",
            "Inventories",
            "Other Short Term Assets",
            "Total Current Assets",
            "Total Noncurrent Assets",
            "Total Assets",
          ],
          "Liabilities": [
            "Accounts Payable",
            "Short Term Debt",
            "Total Current Liabilities",
            "Long Term Debt",
            "Total Noncurrent Liabilities",
            "Total Liabilities",
          ],
          "Equity": [
            "Common Stock",
            "Retained Earnings",
            "Total Equity",
          ],
          "Summary": ["Total Liabilities & Equity"],
          "Metadata": ["Report Date", "Publish Date", "Source"],
        };
        return this._buildSummaryJson(extractedData, categories);
      }

      async getFinancials(ticker, fyear, period) {
        const balanceJson = await this.getBalanceSheet(ticker, fyear, period);
        const cashFlowJson = await this.getCashFlow(ticker, fyear, period);
        const derivedJson = await this.getDerived(ticker, fyear, period);
        const profitLossJson = await this.getProfitLoss(ticker, fyear, period);
        return {
          balance: balanceJson,
          cashFlow: cashFlowJson,
          derived: derivedJson,
          profitLoss: profitLossJson,
        };
      }
    }

    export default SimFin;
    ```

    ### `src/api/ollama.js`
    - **Description**: Handles all interactions with the Ollama API.

    ```jsx
    import axios from 'axios';

    class Ollama {
      constructor() {
        this.base_url = "http://localhost:11434";
      }

      async chat(messages, model, temperature=0.0) {
        const url = `${this.base_url}/api/chat`;
        const headers = {
          "Content-Type": "application/json",
        };

        const data = {
          model: model,
          messages: messages,
          temperature: temperature,
          stream: false,
        };

        try {
          const response = await axios.post(url, data, { headers });
          return response.data.message.content;
        } catch (error) {
          console.error(`Request failed with status code: ${error.response.status}, response: ${error.response.data}`);
          throw error;
        }
      }

      async embeddings(prompt) {
        const url = `${this.base_url}/api/embeddings`;
        const headers = {
          "Content-Type": "application/json",
        };

        const data = {
          prompt: prompt,
          model: "nomic-embed-text",
        };

        try {
          const response = await axios.post(url, data, { headers });
          return response.data.embedding;
        } catch (error) {
          console.error(`Request failed with status code: ${error.response.status}, response: ${error.response.data}`);
          throw error;
        }
      }

      async analyze_image(image_path, model, prompt) {
        const fs = require('fs');
        const base64Image = fs.readFileSync(image_path, { encoding: 'base64' });

        const url = `${this.base_url}/api/generate`;
        const headers = {
          "Content-Type": "application/json",
        };

        const data = {
          model: model,
          prompt: prompt,
          images: [base64Image],
          stream: false,
        };

        try {
          const response = await axios.post(url, data, { headers });
          return response.data.response;
        } catch (error) {
          console.error(`Request failed with status code: ${error.response.status}, response: ${error.response.data}`);
          throw error;
        }
      }
    }

    export default Ollama;
    ```

  <boltAction type="start">
    npm run dev
