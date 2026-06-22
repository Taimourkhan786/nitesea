import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navStyles = {
    nav: {
      backgroundColor: '#1a1a2e',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    logo: {
      color: '#00d9ff',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none'
    },
    link: {
      color: '#fff',
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      transition: 'all 0.3s ease',
      borderRadius: '5px'
    },
    activeLink: {
      color: '#00d9ff',
      backgroundColor: 'rgba(0, 217, 255, 0.1)'
    }
  };

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.container}>
        <div style={navStyles.logo} onClick={() => setActiveTab('home')}>
          <img 
            src="/favicon.png" 
            alt="NiteSea Logo"
            style={{ width: '50px', height: 'auto', borderRadius: '10px' }}
          />  
          NiteSea
        </div>
        <ul style={navStyles.navLinks}>
          {['home', 'about', 'contact'].map((tab) => (
            <li
              key={tab}
              style={{
                ...navStyles.link,
                ...(activeTab === tab ? navStyles.activeLink : {})
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;