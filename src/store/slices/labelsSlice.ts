import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Label } from '@types/index';
import * as labelService from '@services/labelService';

interface LabelsState {
  items: Label[];
  loading: boolean;
  error: string | null;
}

const initialState: LabelsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchLabels = createAsyncThunk('labels/fetchLabels', async (userId: string) => {
  return await labelService.getUserLabels(userId);
});

export const createLabel = createAsyncThunk(
  'labels/createLabel',
  async (label: Omit<Label, 'id'>) => {
    return await labelService.createLabel(label);
  },
);

export const updateLabel = createAsyncThunk(
  'labels/updateLabel',
  async ({ id, updates }: { id: string; updates: Partial<Label> }) => {
    return await labelService.updateLabel(id, updates);
  },
);

export const deleteLabel = createAsyncThunk('labels/deleteLabel', async (id: string) => {
  await labelService.deleteLabel(id);
  return id;
});

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createLabel.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateLabel.fulfilled, (state, action) => {
        const index = state.items.findIndex(label => label.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        state.items = state.items.filter(label => label.id !== action.payload);
      });
  },
});

export default labelsSlice.reducer;
