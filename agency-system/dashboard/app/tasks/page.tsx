'use client';

import { ArrowLeft, Plus, Circle, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  client: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  description?: string;
}

const initialTasks: Record<string, Task[]> = {
  todo: [
    {
      id: 1,
      title: 'Create social media content calendar',
      client: 'Dr Nyla Clinic',
      assignee: 'Social Media Manager',
      priority: 'high',
      dueDate: '2026-01-25',
      description: 'Plan next month content for Instagram and Facebook'
    },
    {
      id: 2,
      title: 'Set up Google Ads campaign',
      client: 'Dr Nyla Clinic',
      assignee: 'Paid Ads Specialist',
      priority: 'high',
      dueDate: '2026-01-26'
    },
    {
      id: 3,
      title: 'Send weekly outreach messages',
      client: 'New Business',
      assignee: 'You',
      priority: 'medium',
      dueDate: '2026-01-23'
    },
    {
      id: 4,
      title: 'Follow up on proposal - Beauty Clinic',
      client: 'Prospect',
      assignee: 'You',
      priority: 'high',
      dueDate: '2026-01-23'
    }
  ],
  inProgress: [
    {
      id: 5,
      title: 'Monthly report for Dr Nyla Clinic',
      client: 'Dr Nyla Clinic',
      assignee: 'Account Manager',
      priority: 'medium',
      dueDate: '2026-01-24'
    },
    {
      id: 6,
      title: 'Design ad creatives',
      client: 'Dr Nyla Clinic',
      assignee: 'Designer',
      priority: 'high',
      dueDate: '2026-01-23'
    }
  ],
  review: [
    {
      id: 7,
      title: 'Review campaign performance',
      client: 'Dr Nyla Clinic',
      assignee: 'You',
      priority: 'medium',
      dueDate: '2026-01-23'
    }
  ],
  done: [
    {
      id: 8,
      title: 'Kickoff call with Emma',
      client: 'Dr Nyla Clinic',
      assignee: 'You',
      priority: 'high',
      dueDate: '2026-01-22'
    },
    {
      id: 9,
      title: 'Contract signed',
      client: 'Dr Nyla Clinic',
      assignee: 'You',
      priority: 'high',
      dueDate: '2026-01-22'
    }
  ]
};

export default function TasksPage() {
  const [tasks] = useState(initialTasks);

  const columns = [
    { id: 'todo', title: 'To Do', icon: Circle, color: 'slate' },
    { id: 'inProgress', title: 'In Progress', icon: Clock, color: 'blue' },
    { id: 'review', title: 'Review', icon: AlertCircle, color: 'orange' },
    { id: 'done', title: 'Done', icon: CheckCircle, color: 'green' }
  ];

  const totalTasks = Object.values(tasks).reduce((sum, col) => sum + col.length, 0);
  const doneTasks = tasks.done.length;
  const inProgressTasks = tasks.inProgress.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Task Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {totalTasks} total tasks • {inProgressTasks} in progress • {doneTasks} completed
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
              <Plus className="w-5 h-5" />
              New Task
            </button>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const Icon = column.icon;
            const columnTasks = tasks[column.id as keyof typeof tasks];

            return (
              <div key={column.id} className="flex flex-col">
                {/* Column Header */}
                <div className="bg-white dark:bg-slate-800 rounded-t-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 text-${column.color}-500`} />
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {column.title}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-sm font-medium">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Column Body */}
                <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-b-xl border-x border-b border-slate-200 dark:border-slate-700 p-4 space-y-3 min-h-[600px]">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-slate-400 dark:text-slate-500 text-sm">No tasks</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const priorityColors = {
    low: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  };

  const dueDate = new Date(task.dueDate);
  const today = new Date();
  const isOverdue = dueDate < today;
  const isDueSoon = !isOverdue && (dueDate.getTime() - today.getTime()) < 2 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow cursor-pointer group">
      {/* Priority Badge */}
      <div className="flex items-start justify-between mb-2">
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
        {isOverdue && (
          <span className="text-red-500 text-xs font-medium">Overdue</span>
        )}
        {isDueSoon && !isOverdue && (
          <span className="text-orange-500 text-xs font-medium">Due Soon</span>
        )}
      </div>

      {/* Task Title */}
      <h4 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Client Tag */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
          {task.client}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm border-t border-slate-200 dark:border-slate-700 pt-3">
        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <User className="w-4 h-4" />
          <span className="text-xs">{task.assignee}</span>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">
          {dueDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
}
