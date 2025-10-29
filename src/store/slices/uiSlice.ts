import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  calendarView: 'month' | 'week' | 'day';
  sidebarOpen: boolean;
  onboardingCompleted: boolean;
}

const initialState: UiState = {
  calendarView: 'month',
  sidebarOpen: false,
  onboardingCompleted: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCalendarView: (state, action: PayloadAction<UiState['calendarView']>) => {
      state.calendarView = action.payload;
    },
    toggleSidebar: state => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    completeOnboarding: state => {
      state.onboardingCompleted = true;
    },
  },
});

export const { setCalendarView, toggleSidebar, completeOnboarding } = uiSlice.actions;
export default uiSlice.reducer;
