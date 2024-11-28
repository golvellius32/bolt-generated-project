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
