import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Searchbar, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { fetchTasks, reorderTasks } from '@store/slices/tasksSlice';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { TaskCard } from '@components/TaskCard';
import { Task, TaskStatus, TaskPriority } from '@types/index';

export const TasksScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector((state: RootState) => state.tasks.items);
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | undefined>();
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | undefined>();

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(user.id));
    }
  }, [user]);

  const filteredTasks = tasks.filter(task => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedStatus && task.status !== selectedStatus) {
      return false;
    }
    if (selectedPriority && task.priority !== selectedPriority) {
      return false;
    }
    return true;
  });

  const handleDragEnd = ({ data }: { data: Task[] }) => {
    const from = tasks.findIndex(t => t.id === data[0].id);
    const to = filteredTasks.findIndex(t => t.id === data[0].id);
    dispatch(reorderTasks({ from, to }));
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Task>) => (
    <TaskCard
      task={item}
      onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
      onLongPress={drag}
      isActive={isActive}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Searchbar
        placeholder={t('common.search')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.filters}>
        <Chip
          selected={selectedStatus === TaskStatus.TODO}
          onPress={() =>
            setSelectedStatus(selectedStatus === TaskStatus.TODO ? undefined : TaskStatus.TODO)
          }
          style={styles.chip}>
          {t('tasks.pending')}
        </Chip>
        <Chip
          selected={selectedStatus === TaskStatus.IN_PROGRESS}
          onPress={() =>
            setSelectedStatus(
              selectedStatus === TaskStatus.IN_PROGRESS ? undefined : TaskStatus.IN_PROGRESS,
            )
          }
          style={styles.chip}>
          {t('tasks.inProgress')}
        </Chip>
        <Chip
          selected={selectedStatus === TaskStatus.COMPLETED}
          onPress={() =>
            setSelectedStatus(
              selectedStatus === TaskStatus.COMPLETED ? undefined : TaskStatus.COMPLETED,
            )
          }
          style={styles.chip}>
          {t('tasks.completed')}
        </Chip>
      </View>

      <DraggableFlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onDragEnd={handleDragEnd}
        contentContainerStyle={styles.listContent}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('CreateTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 16,
    marginBottom: 8,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
