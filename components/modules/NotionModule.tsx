
import React, { useState } from 'react';
import { analyzeTasks } from '../../services/geminiService';
import { Task } from '../../types';

const NotionModule: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addTask = () => {
    if (!newTaskTitle) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      status: 'todo',
      deadline: newTaskDeadline || 'Không có hạn'
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDeadline('');
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const handleAnalyze = async () => {
    if (tasks.length === 0) return;
    setLoading(true);
    try {
      const suggestions = await analyzeTasks(tasks);
      setAiSuggestions(suggestions || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
            <span>📈</span> Quản lý công việc
          </h3>
          <div className="space-y-3 mb-6">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Tiêu đề công việc..."
              className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={newTaskDeadline}
                onChange={(e) => setNewTaskDeadline(e.target.value)}
                className="flex-1 p-3 bg-slate-50 border rounded-xl text-sm outline-none"
              />
              <button
                onClick={addTask}
                className="px-6 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700"
              >
                Thêm
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto max-h-[400px]">
            {tasks.map(task => (
              <div key={task.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={task.status === 'done'} 
                    onChange={() => updateStatus(task.id, task.status === 'done' ? 'todo' : 'done')}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className={`text-sm font-semibold ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {task.title}
                    </div>
                    <div className="text-[10px] text-slate-400">Hạn: {task.deadline}</div>
                  </div>
                </div>
                <button onClick={() => removeTask(task.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  ✕
                </button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm italic">
                Chưa có công việc nào được thêm.
              </div>
            )}
          </div>
          
          <button
            onClick={handleAnalyze}
            disabled={tasks.length === 0 || loading}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang phân tích năng suất...' : '⚡ AI Tối ưu hiệu suất'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-slate-800">💡 Gợi ý của AI</h3>
          {aiSuggestions ? (
            <div className="prose prose-slate prose-sm max-w-none text-slate-600 overflow-y-auto max-h-[500px]">
              {aiSuggestions}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
               <span className="text-4xl mb-4">🤖</span>
               <p className="text-sm font-medium">Bấm "AI Tối ưu hiệu suất" để nhận đề xuất.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotionModule;
