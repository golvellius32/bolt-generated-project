import React from 'react';

    function NavigationBar() {
      return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md">
          <ul className="flex justify-between items-center py-4">
            <li>
              <a href="#finance-api" className="text-blue-500 hover:text-blue-700">
                Finance API
              </a>
            </li>
            <li>
              <a href="#llm" className="text-blue-500 hover:text-blue-700">
                LLM
              </a>
            </li>
            <li>
              <a href="#ticker-set" className="text-blue-500 hover:text-blue-700">
                Ticker Set
              </a>
            </li>
          </ul>
        </nav>
      );
    }

    export default NavigationBar;
