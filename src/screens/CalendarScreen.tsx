import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons, Title, FAB } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { setCalendarView } from '@store/slices/uiSlice';
import { useTheme } from '@/contexts/ThemeContext';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { format } from 'date-fns';

export const CalendarScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const calendarView = useSelector((state: RootState) => state.ui.calendarView);
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [markedDates, setMarkedDates] = useState<any>({});

  useEffect(() => {
    const marked: any = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateKey = format(new Date(task.dueDate), 'yyyy-MM-dd');
        if (!marked[dateKey]) {
          marked[dateKey] = { marked: true, dots: [] };
        }
        marked[dateKey].dots.push({
          color: getPriorityColor(task.priority),
        });
      }
    });
    setMarkedDates(marked);
  }, [tasks]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return theme.colors.error;
      case 'high':
        return theme.colors.warning;
      case 'medium':
        return theme.colors.info;
      default:
        return theme.colors.success;
    }
  };

  const calendarTheme = {
    backgroundColor: theme.colors.background,
    calendarBackground: theme.colors.surface,
    textSectionTitleColor: theme.colors.text,
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: '#ffffff',
    todayTextColor: theme.colors.primary,
    dayTextColor: theme.colors.text,
    textDisabledColor: theme.colors.disabled,
    dotColor: theme.colors.primary,
    selectedDotColor: '#ffffff',
    arrowColor: theme.colors.primary,
    monthTextColor: theme.colors.text,
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 14,
  };

  const renderCalendar = () => {
    switch (calendarView) {
      case 'month':
        return (
          <Calendar
            current={selectedDate}
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={{
              ...markedDates,
              [selectedDate]: {
                ...markedDates[selectedDate],
                selected: true,
                selectedColor: theme.colors.primary,
              },
            }}
            markingType="multi-dot"
            theme={calendarTheme}
          />
        );
      case 'week':
        return (
          <CalendarList
            current={selectedDate}
            onDayPress={day => setSelectedDate(day.dateString)}
            horizontal
            pagingEnabled
            calendarWidth={350}
            markedDates={markedDates}
            markingType="multi-dot"
            theme={calendarTheme}
          />
        );
      case 'day':
        return (
          <Agenda
            selected={selectedDate}
            items={{}}
            renderEmptyData={() => (
              <View style={styles.emptyDate}>
                <Title>{t('calendar.noTasks')}</Title>
              </View>
            )}
            theme={calendarTheme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SegmentedButtons
        value={calendarView}
        onValueChange={value => dispatch(setCalendarView(value as any))}
        buttons={[
          { value: 'month', label: t('calendar.month') },
          { value: 'week', label: t('calendar.week') },
          { value: 'day', label: t('calendar.day') },
        ]}
        style={styles.segmentedButtons}
      />

      {renderCalendar()}

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() =>
          navigation.navigate('CreateTask', { initialDate: new Date(selectedDate) })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedButtons: {
    margin: 16,
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
