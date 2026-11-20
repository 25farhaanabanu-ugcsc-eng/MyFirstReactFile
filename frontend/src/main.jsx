import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
function Sample() {
  return (
    <div>
      <h2>Name:S.Farhaana Banu</h2>
      <h2>Class:B.sc.Computer Science</h2>
    </div>
  )
}
export default Sample

