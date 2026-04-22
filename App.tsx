import { useState, useEffect, useMemo } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import { useTasks } from './hooks/useTasks';
import { Task, TaskFormData, TaskStatus } from './types';

export default function App() {
  const { tasks, loading, addTask, updateTask, deleteTask, moveTask } = useTasks();

  const [loaderVisible, setLoaderVisible] = useState(true);
  const [appVisible, setAppVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading) {
      const hideLoader = setTimeout(() => {
        setLoaderVisible(false);
        setTimeout(() => setAppVisible(true), 300);
      }, 800);
      return () => clearTimeout(hideLoader);
    }
  }, [loading]);

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const q = searchQuery.toLowerCase();

    const exactMatches = tasks.filter(t => t.title.toLowerCase() === q);
    const titleMatches = tasks.filter(
      t => t.title.toLowerCase().includes(q) && t.title.toLowerCase() !== q
    );
    const descriptionMatches = tasks.filter(
      t => !t.title.toLowerCase().includes(q) && t.description.toLowerCase().includes(q)
    );
    const categoryMatches = tasks.filter(
      t =>
        !t.title.toLowerCase().includes(q) &&
        !t.description.toLowerCase().includes(q) &&
        t.category.toLowerCase().includes(q)
    );

    return [...exactMatches, ...titleMatches, ...descriptionMatches, ...categoryMatches];
  }, [tasks, searchQuery]);

  const handleOpenAdd = (status: TaskStatus = 'todo') => {
    setEditTask(null);
    setDefaultStatus(status);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setDefaultStatus(task.status);
    setModalOpen(true);
  };

  const handleSave = async (formData: TaskFormData) => {
    if (editTask) {
      await updateTask(editTask.id, formData);
    } else {
      await addTask(formData);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <>
      <Loader visible={loaderVisible} />

      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f766e 0%, #164e63 25%, #083344 50%, #0c2d3a 75%, #0f766e 100%)',
          transition: 'opacity 0.5s ease',
          opacity: appVisible ? 1 : 0,
        }}
      >
        <Navbar
          onAddTask={() => handleOpenAdd('todo')}
          taskCount={tasks.length}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />

        <main
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '1.5rem 1rem 3rem',
          }}
        >
          {currentPage === 'home' && (
            <div
              style={{
                transition: 'all 0.6s ease',
                opacity: appVisible ? 1 : 0,
                transform: appVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <HomePage tasks={tasks} onNavigate={setCurrentPage} />
            </div>
          )}

          {currentPage === 'workspace' && (
            <>
              <div
                style={{
                  marginBottom: '1.5rem',
                  transition: 'all 0.6s ease',
                  opacity: appVisible ? 1 : 0,
                  transform: appVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <h1
                  style={{
                    color: '#f8fafc',
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 800,
                    fontFamily: 'system-ui, sans-serif',
                    letterSpacing: '-0.03em',
                    margin: '0 0 0.375rem',
                  }}
                >
                  Lets Cook😋
                </h1>
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '0.9375rem',
                    fontFamily: 'system-ui, sans-serif',
                    margin: 0,
                  }}
                >
                  Manage your tasks across columns &mdash; drag and drop to update status
                </p>
              </div>

              <div
                style={{
                  transition: 'all 0.6s ease 0.1s',
                  opacity: appVisible ? 1 : 0,
                  transform: appVisible ? 'translateY(0)' : 'translateY(20px)',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(22,78,99,0.8)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    padding: '0 1rem',
                    gap: '0.75rem',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search tasks by title or description..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#f1f5f9',
                      fontSize: '0.9375rem',
                      fontFamily: 'system-ui, sans-serif',
                      padding: '0.875rem 0',
                      caretColor: '#3b82f6',
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        fontSize: '1.25rem',
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {searchQuery && (
                <div
                  style={{
                    marginBottom: '1rem',
                    color: '#64748b',
                    fontSize: '0.875rem',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  Showing{' '}
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>
                    {filteredTasks.length}
                  </span>{' '}
                  result{filteredTasks.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
                </div>
              )}

              <div
                style={{
                  transition: 'all 0.6s ease 0.2s',
                  opacity: appVisible ? 1 : 0,
                  transform: appVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <KanbanBoard
                  tasks={filteredTasks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onMove={moveTask}
                  onAddToColumn={handleOpenAdd}
                />
              </div>
            </>
          )}

          {currentPage === 'about' && (
            <div
              style={{
                transition: 'all 0.6s ease',
                opacity: appVisible ? 1 : 0,
                transform: appVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <AboutPage onNavigate={setCurrentPage} />
            </div>
          )}

          {currentPage === 'contact' && (
            <div
              style={{
                transition: 'all 0.6s ease',
                opacity: appVisible ? 1 : 0,
                transform: appVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <ContactPage onNavigate={setCurrentPage} />
            </div>
          )}

          {currentPage === 'help' && (
            <div
              style={{
                transition: 'all 0.6s ease',
                opacity: appVisible ? 1 : 0,
                transform: appVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <HelpPage onNavigate={setCurrentPage} />
            </div>
          )}
        </main>
      </div>

      <TaskModal
        open={modalOpen}
        editTask={editTask}
        defaultStatus={defaultStatus}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0f766e; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.18); }
        input::placeholder, textarea::placeholder { color: #475569; }
        select option { background: #0f172a; }
      `}</style>
    </>
  );
}
