import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface HelpPageProps {
  onNavigate: (page: string) => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'How do I create a new task?',
    answer: 'Click the "Add Task" button in the navbar or use the "Add" button in any column on the Kanban board. Fill in the task details including title, description, status, priority, and category, then click save.',
  },
  {
    id: '2',
    question: 'How do I move tasks between columns?',
    answer: 'Simply drag and drop tasks between the "To Do", "In Progress", and "Done" columns. Your changes are saved automatically.',
  },
  {
    id: '3',
    question: 'Can I search for tasks?',
    answer: 'Yes! Use the search bar in the workspace to find tasks by title, description, or category. The search results update in real-time as you type.',
  },
  {
    id: '4',
    question: 'How do I set task priority?',
    answer: 'When creating or editing a task, you can set the priority level to "low", "medium", or "high". High priority tasks are highlighted in red for visibility.',
  },
  {
    id: '5',
    question: 'Can I edit existing tasks?',
    answer: 'Yes, click on any task card to open it in edit mode. You can update the title, description, priority, status, and category.',
  },
  {
    id: '6',
    question: 'How do I view my completion percentage?',
    answer: 'Go to the Home page to see your overall task completion percentage, number of tasks in progress, and tasks waiting to be started.',
  },
  {
    id: '7',
    question: 'What are task categories?',
    answer: 'Categories help you organize tasks by type. You can assign tasks to different categories like "work", "personal", "shopping", or "other" to better organize your workflow.',
  },
  {
    id: '8',
    question: 'Can I delete tasks?',
    answer: 'Yes, you can delete a task by clicking on it and selecting the delete option. Please note that deleted tasks cannot be recovered.',
  },
];

export default function HelpPage({ onNavigate }: HelpPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          I will be there for you🫂
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '1rem',
            fontFamily: 'system-ui, sans-serif',
            margin: 0,
          }}
        >
          Find answers to common questions about TaskFlow
        </p>
      </div>

      <div
        style={{
          maxWidth: '800px',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            background: 'rgba(22,78,99,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              color: '#f8fafc',
              fontSize: '1.25rem',
              fontWeight: 700,
              margin: '0 0 0.75rem',
            }}
          >
            Quick Start Guide
          </h2>
          <ol
            style={{
              color: '#cbd5e1',
              fontSize: '0.9375rem',
              lineHeight: '1.8',
              margin: 0,
              paddingLeft: '1.5rem',
            }}
          >
            <li style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: '#e0f2fe' }}>Create a task</strong> by clicking "Add Task" and filling in the details
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: '#e0f2fe' }}>Organize</strong> your tasks using drag and drop across columns
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: '#e0f2fe' }}>Track progress</strong> by moving tasks to "In Progress" and "Done"
            </li>
            <li>
              <strong style={{ color: '#e0f2fe' }}>Monitor completion</strong> on the Home page to see your progress percentage
            </li>
          </ol>
        </div>

        <h2
          style={{
            color: '#f8fafc',
            fontSize: '1.25rem',
            fontWeight: 700,
            margin: '0 0 1.5rem',
          }}
        >
          Frequently Asked Questions
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'linear-gradient(135deg, rgba(22,78,99,0.8) 0%, rgba(15,118,110,0.6) 100%)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <h3
                  style={{
                    color: '#f8fafc',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    margin: 0,
                    textAlign: 'left',
                  }}
                >
                  {item.question}
                </h3>
                <ChevronDown
                  size={20}
                  color="#64748b"
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0)',
                    flexShrink: 0,
                    marginLeft: '1rem',
                  }}
                />
              </button>

              {expandedId === item.id && (
                <div
                  style={{
                    padding: '0 1.25rem 1.25rem',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    color: '#cbd5e1',
                    fontSize: '0.9375rem',
                    lineHeight: '1.6',
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: 'rgba(22,78,99,0.5)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: '#f8fafc',
            fontSize: '1.25rem',
            fontWeight: 700,
            margin: '0 0 0.5rem',
          }}
        >
          Still Have Questions?
        </h2>
        <p
          style={{
            color: '#64748b',
            fontSize: '0.9375rem',
            margin: '0 0 1.5rem',
          }}
        >
          Contact our support team and we'll be happy to help
        </p>
        <button
          onClick={() => onNavigate('contact')}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.75rem 1.5rem',
            fontSize: '0.9375rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
          }}
        >
          Contact Support
        </button>
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
