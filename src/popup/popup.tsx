import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../assets/tailwind.css';

function render() {
    document.body.innerHTML = '<div id="root"></div>';
    const root = createRoot(document.getElementById('root'));
    root.render(<App/>)
}

render();
