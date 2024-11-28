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
