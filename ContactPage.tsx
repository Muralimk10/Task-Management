import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export default function ContactPage({ }: ContactPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div
      style={{
        animation: 'fadeIn 0.5s ease',
      }}
    >
      <div
        style={{
          marginBottom: '2rem',
        }}
      >
        <h1
          style={{
            color: '#f8fafc',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 800,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '-0.03em',
            margin: '0 0 0.5rem',
          }}
        >
          Get in Touch🤗
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '1rem',
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
          }}
        >
          Have questions or feedback? We'd love to hear from you
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(22,78,99,0.8) 0%, rgba(15,118,110,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  color: '#e0f2fe',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  background: 'rgba(15,118,110,0.4)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8,
                  padding: '0.75rem',
                  color: '#f1f5f9',
                  fontSize: '0.9375rem',
                  fontFamily: 'system-ui, sans-serif',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.background = 'rgba(15,118,110,0.6)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.background = 'rgba(15,118,110,0.4)';
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  color: '#e0f2fe',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  background: 'rgba(15,118,110,0.4)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8,
                  padding: '0.75rem',
                  color: '#f1f5f9',
                  fontSize: '0.9375rem',
                  fontFamily: 'system-ui, sans-serif',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.background = 'rgba(15,118,110,0.6)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.background = 'rgba(15,118,110,0.4)';
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  color: '#e0f2fe',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                style={{
                  width: '100%',
                  background: 'rgba(15,118,110,0.4)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8,
                  padding: '0.75rem',
                  color: '#f1f5f9',
                  fontSize: '0.9375rem',
                  fontFamily: 'system-ui, sans-serif',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.background = 'rgba(15,118,110,0.6)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.background = 'rgba(15,118,110,0.4)';
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: submitted
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!submitted) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!submitted) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }
              }}
            >
              <Send size={18} />
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'rgba(22,78,99,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  borderRadius: 8,
                  padding: '0.75rem',
                  display: 'flex',
                }}
              >
                <Mail size={24} color="#fff" />
              </div>
              <div>
                <h3
                  style={{
                    color: '#f8fafc',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 0.25rem',
                  }}
                >
                  Email
                </h3>
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '0.9375rem',
                    margin: 0,
                  }}
                >
                  muralimk.s10@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(22,78,99,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: 8,
                  padding: '0.75rem',
                  display: 'flex',
                }}
              >
                <Phone size={24} color="#fff" />
              </div>
              <div>
                <h3
                  style={{
                    color: '#f8fafc',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 0.25rem',
                  }}
                >
                  Phone
                </h3>
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '0.9375rem',
                    margin: 0,
                  }}
                >
                  +91 12345-67890
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(22,78,99,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: 8,
                  padding: '0.75rem',
                  display: 'flex',
                }}
              >
                <MapPin size={24} color="#fff" />
              </div>
              <div>
                <h3
                  style={{
                    color: '#f8fafc',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 0.25rem',
                  }}
                >
                  Address
                </h3>
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '0.9375rem',
                    margin: 0,
                  }}
                >
                  Dubai main road,nearby to the bus stop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
