import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus, TaskPriority } from '@types/index';
import * as taskService from '@services/taskService';

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
  filter: {
    status?: TaskStatus;
    priority?: TaskPriority;
    labels?: string[];
    search?: string;
  };
  sortBy: 'dueDate' | 'priority' | 'createdAt' | 'order';
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
  filter: {},
  sortBy: 'order',
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId: string) => {
  return await taskService.getUserTasks(userId);
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Omit<Task, 'id'>) => {
  return await taskService.createTask(task);
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    return await taskService.updateTask(id, updates);
  },
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await taskService.deleteTask(id);
  return id;
});

export const bulkUpdateTasks = createAsyncThunk(
  'tasks/bulkUpdate',
  async (updates: Array<{ id: string; updates: Partial<Task> }>) => {
    return await taskService.bulkUpdateTasks(updates);
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TasksState['filter']>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilter: state => {
      state.filter = {};
    },
    setSortBy: (state, action: PayloadAction<TasksState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [removed] = state.items.splice(from, 1);
      state.items.splice(to, 0, removed);
      state.items.forEach((task, index) => {
        task.order = index;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      })
      .addCase(bulkUpdateTasks.fulfilled, (state, action) => {
        action.payload.forEach(updatedTask => {
          const index = state.items.findIndex(task => task.id === updatedTask.id);
          if (index !== -1) {
            state.items[index] = updatedTask;
          }
        });
      });
  },
});

export const { setFilter, clearFilter, setSortBy, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
