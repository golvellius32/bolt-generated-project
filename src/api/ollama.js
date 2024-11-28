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
