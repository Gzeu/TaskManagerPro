import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Team } from '@types/index';
import * as teamService from '@services/teamService';

interface TeamsState {
  items: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async (userId: string) => {
  return await teamService.getUserTeams(userId);
});

export const createTeam = createAsyncThunk('teams/createTeam', async (team: Omit<Team, 'id'>) => {
  return await teamService.createTeam(team);
});

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async ({ id, updates }: { id: string; updates: Partial<Team> }) => {
    return await teamService.updateTeam(id, updates);
  },
);

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        const index = state.items.findIndex(team => team.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default teamsSlice.reducer;
