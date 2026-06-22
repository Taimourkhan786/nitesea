import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Helmet from './components/Helmet';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [helmetData, setHelmetData] = useState({
    title: 'NiteSea - Free Online Image Resizer Tool',
    description: 'Resize your images instantly with NiteSea. Fast, secure, and privacy-focused.',
    url: 'https://nitesea.com/',
    image: 'https://nitesea.com/logo512.png',
    keywords: 'image resizer, resize images, free image tool, online image resizer, NiteSea',
    type: 'website',
    siteName: 'NiteSea'
  });

  // Update helmet when tab changes
  useEffect(() => {
    const pageData = {
      home: {
        title: 'NiteSea - Free Online Image Resizer Tool',
        description: 'Resize your images instantly with NiteSea. Fast, secure, and privacy-focused. No uploads required.',
        url: 'https://nitesea.com/',
        image: 'https://nitesea.com/logo512.png',
        keywords: 'image resizer, resize images, free image tool, online image resizer, NiteSea',
        type: 'website'
      },
      about: {
        title: 'About NiteSea - Free Online Image Resizer Tool',
        description: 'Learn about NiteSea, the free online image resizer. Fast, secure, and 100% private. No uploads to servers.',
        url: 'https://nitesea.com/about',
        image: 'https://nitesea.com/logo512.png',
        keywords: 'about NiteSea, image resizer about, free image tool, online image resizer',
        type: 'website'
      },
      contact: {
        title: 'Contact NiteSea - Free Online Image Resizer Support',
        description: 'Contact NiteSea for support, feedback, or questions about our free online image resizer tool.',
        url: 'https://nitesea.com/contact',
        image: 'https://nitesea.com/logo512.png',
        keywords: 'contact NiteSea, image resizer support, feedback, help',
        type: 'website'
      }
    };
    setHelmetData((prevData) => ({ ...prevData, ...pageData[activeTab] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Helmet {...helmetData} />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default App;