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
