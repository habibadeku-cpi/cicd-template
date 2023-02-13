import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Spinner from './components/Spinner';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
