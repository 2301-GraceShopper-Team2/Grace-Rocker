import React from 'react';

import Footer from '../features/footer/Footer';
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div className="container">
      <header>
        <Navbar />
      </header>
      <body>
        <AppRoutes />
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
