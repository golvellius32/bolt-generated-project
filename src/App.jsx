import React from 'react';
    import NavigationBar from './NavigationBar';
    import FinanceAPIPage from './FinanceAPIPage';
    import LLMPage from './LLMPage';
    import TickerSetPage from './TickerSetPage';

    function App() {
      return (
        <div>
          <NavigationBar />
          <div className="mt-16 p-4">
            <FinanceAPIPage />
            <LLMPage />
            <TickerSetPage />
          </div>
        </div>
      );
    }

    export default App;
