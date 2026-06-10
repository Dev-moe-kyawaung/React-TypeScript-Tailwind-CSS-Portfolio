import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import GitHubSocial from './pages/GitHubSocial';
import Contact from './pages/Contact';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Router>
        <div className="min-h-screen bg-bg-dark text-text-primary">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/github-social" element={<GitHubSocial />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
