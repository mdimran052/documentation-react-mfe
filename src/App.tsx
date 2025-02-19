import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const fetchMarkdown = async (path: string) => {
      const response = await fetch(path);
      const text = await response.text();
      setMarkdown(text);
    };

    setCurrentPath(window.location.pathname);
    console.log('currentPath',currentPath);
    if (currentPath === '/documentation') {
      fetchMarkdown('/documentation/Frameworks.md');
    } else if (currentPath === '/libraries') {
      fetchMarkdown('/documentation/Libraries.md');
    } else {
      setMarkdown('');
    }
  }, [currentPath]);

  return (
   <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/" onClick={() => setCurrentPath('/')}>Home</Link>
              </li>
              <li>
                <Link to="/documentation" onClick={() => setCurrentPath('/documentation')}>Documentation</Link>
              </li>
              <li>
                <Link to="/libraries" onClick={() => setCurrentPath('/libraries')}>Libraries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<h1>Welcome to the Documentation Site</h1>} />
            <Route path="/documentation" element={<ReactMarkdown>{markdown}</ReactMarkdown>} />
            <Route path="/libraries" element={<ReactMarkdown>{markdown}</ReactMarkdown>} />
          </Routes>
        </Router>
      </div>
    
  );
}

export default App;
