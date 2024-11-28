import axios from 'axios';

    const llmApiUrl = 'https://llm-api.com/analyze';

    export async function getLlmAnalysis(financialData) {
      try {
        const response = await axios.post(llmApiUrl, financialData);
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
