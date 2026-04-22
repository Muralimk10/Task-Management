import { useState, useEffect } from 'react';
import { CheckSquare, Menu, X, Plus, LayoutDashboard, Home, Info, Mail, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onAddTask: () => void;
  taskCount: number;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export default function Navbar({ onAddTask, taskCount, onNavigate, currentPage }: NavbarProps) {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled
          ? 'rgba(15,118,110,0.95)'
          : 'rgba(15,118,110,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.4s ease',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: visible ? 1 : 0,
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(59,130,246,0.4)',
            }}
          >
            <CheckSquare size={18} color="#fff" />
          </div>
          <div>
            <span
              style={{
                color: '#f8fafc',
                fontWeight: 700,
                fontSize: '1.125rem',
                letterSpacing: '-0.02em',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              TaskFlow
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="nav-desktop"
        >
          <button
            onClick={() => onNavigate?.('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.875rem',
              borderRadius: 8,
              background: currentPage === 'home' ? 'rgba(59,130,246,0.2)' : 'transparent',
              color: currentPage === 'home' ? '#60a5fa' : '#94a3b8',
              fontSize: '0.875rem',
              fontFamily: 'system-ui, sans-serif',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'home') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'home') {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Home size={15} />
            <span style={{ marginLeft: 4 }}>Home</span>
          </button>
          <button
            onClick={() => onNavigate?.('workspace')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.875rem',
              borderRadius: 8,
              background: currentPage === 'workspace' ? 'rgba(59,130,246,0.2)' : 'transparent',
              color: currentPage === 'workspace' ? '#60a5fa' : '#94a3b8',
              fontSize: '0.875rem',
              fontFamily: 'system-ui, sans-serif',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'workspace') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'workspace') {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <LayoutDashboard size={15} />
            <span style={{ marginLeft: 4 }}>Workspace</span>
          </button>
          <button
            onClick={() => onNavigate?.('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.875rem',
              borderRadius: 8,
              background: currentPage === 'about' ? 'rgba(59,130,246,0.2)' : 'transparent',
              color: currentPage === 'about' ? '#60a5fa' : '#94a3b8',
              fontSize: '0.875rem',
              fontFamily: 'system-ui, sans-serif',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'about') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'about') {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Info size={15} />
            <span style={{ marginLeft: 4 }}>About</span>
          </button>
          <button
            onClick={() => onNavigate?.('contact')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.875rem',
              borderRadius: 8,
              background: currentPage === 'contact' ? 'rgba(59,130,246,0.2)' : 'transparent',
              color: currentPage === 'contact' ? '#60a5fa' : '#94a3b8',
              fontSize: '0.875rem',
              fontFamily: 'system-ui, sans-serif',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'contact') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'contact') {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Mail size={15} />
            <span style={{ marginLeft: 4 }}>Contact</span>
          </button>
          <button
            onClick={() => onNavigate?.('help')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.875rem',
              borderRadius: 8,
              background: currentPage === 'help' ? 'rgba(59,130,246,0.2)' : 'transparent',
              color: currentPage === 'help' ? '#60a5fa' : '#94a3b8',
              fontSize: '0.875rem',
              fontFamily: 'system-ui, sans-serif',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'help') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'help') {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <HelpCircle size={15} />
            <span style={{ marginLeft: 4 }}>Help</span>
          </button>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginLeft: '1rem',
              paddingLeft: '1rem',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span
              style={{
                background: 'rgba(59,130,246,0.15)',
                color: '#60a5fa',
                border: '1px solid rgba(59,130,246,0.2)',
                padding: '0.25rem 0.625rem',
                borderRadius: 99,
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {taskCount} tasks
            </span>
            <button
              onClick={onAddTask}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
                boxShadow: '0 0 20px rgba(59,130,246,0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 28px rgba(59,130,246,0.5)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(59,130,246,0.35)';
              }}
            >
              <Plus size={15} />
              Add Task
            </button>
          </div>
        </div>

        <button
          className="nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#94a3b8',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'none',
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            background: 'rgba(15,118,110,0.98)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            animation: 'slideDown 0.2s ease',
          }}
          className="nav-mobile-menu"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <button
              onClick={() => { onNavigate?.('home'); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.75rem',
                background: currentPage === 'home' ? 'rgba(59,130,246,0.2)' : 'transparent',
                color: currentPage === 'home' ? '#60a5fa' : '#cbd5e1',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.2s ease',
              }}
            >
              <Home size={16} />
              Home
            </button>
            <button
              onClick={() => { onNavigate?.('workspace'); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.75rem',
                background: currentPage === 'workspace' ? 'rgba(59,130,246,0.2)' : 'transparent',
                color: currentPage === 'workspace' ? '#60a5fa' : '#cbd5e1',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.2s ease',
              }}
            >
              <LayoutDashboard size={16} />
              Workspace
            </button>
            <button
              onClick={() => { onNavigate?.('about'); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.75rem',
                background: currentPage === 'about' ? 'rgba(59,130,246,0.2)' : 'transparent',
                color: currentPage === 'about' ? '#60a5fa' : '#cbd5e1',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.2s ease',
              }}
            >
              <Info size={16} />
              About
            </button>
            <button
              onClick={() => { onNavigate?.('contact'); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.75rem',
                background: currentPage === 'contact' ? 'rgba(59,130,246,0.2)' : 'transparent',
                color: currentPage === 'contact' ? '#60a5fa' : '#cbd5e1',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.2s ease',
              }}
            >
              <Mail size={16} />
              Contact
            </button>
            <button
              onClick={() => { onNavigate?.('help'); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.75rem',
                background: currentPage === 'help' ? 'rgba(59,130,246,0.2)' : 'transparent',
                color: currentPage === 'help' ? '#60a5fa' : '#cbd5e1',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.2s ease',
              }}
            >
              <HelpCircle size={16} />
              Help
            </button>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
            <span
              style={{
                color: '#94a3b8',
                fontSize: '0.875rem',
                fontFamily: 'system-ui, sans-serif',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              {taskCount} tasks total
            </span>
            <button
              onClick={() => { onAddTask(); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              <Plus size={15} />
              Add New Task
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
