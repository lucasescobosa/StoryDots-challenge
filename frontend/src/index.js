import { createRoot } from 'react-dom/client';
import App from "./App.jsx";
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Router>
      <App />
    </Router>
  );