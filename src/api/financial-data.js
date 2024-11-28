import axios from 'axios';

    const financeApiUrl = 'https://finance-api.com/data';

    export async function getFinancialData() {
      try {
        const response = await axios.get(financeApiUrl);
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
