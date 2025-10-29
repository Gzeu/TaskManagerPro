import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Title } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useTheme } from '@/contexts/ThemeContext';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { DashboardStats, TaskStatus, TaskPriority } from '@types/index';

const screenWidth = Dimensions.get('window').width;

export const DashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme();
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    completionRate: 0,
    productivityTrend: [],
    tasksByPriority: {} as Record<TaskPriority, number>,
    tasksByStatus: {} as Record<TaskStatus, number>,
  });

  useEffect(() => {
    calculateStats();
  }, [tasks]);

  const calculateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
    const pending = tasks.filter(t => t.status === TaskStatus.TODO).length;
    const overdue = tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== TaskStatus.COMPLETED,
    ).length;

    const tasksByPriority = {
      [TaskPriority.LOW]: tasks.filter(t => t.priority === TaskPriority.LOW).length,
      [TaskPriority.MEDIUM]: tasks.filter(t => t.priority === TaskPriority.MEDIUM).length,
      [TaskPriority.HIGH]: tasks.filter(t => t.priority === TaskPriority.HIGH).length,
      [TaskPriority.URGENT]: tasks.filter(t => t.priority === TaskPriority.URGENT).length,
    };

    const tasksByStatus = {
      [TaskStatus.TODO]: pending,
      [TaskStatus.IN_PROGRESS]: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      [TaskStatus.COMPLETED]: completed,
      [TaskStatus.ARCHIVED]: tasks.filter(t => t.status === TaskStatus.ARCHIVED).length,
    };

    setStats({
      totalTasks: total,
      completedTasks: completed,
      pendingTasks: pending,
      overdueTasks: overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      productivityTrend: [],
      tasksByPriority,
      tasksByStatus,
    });
  };

  const pieData = [
    {
      name: t('tasks.completed'),
      population: stats.completedTasks,
      color: theme.colors.success,
      legendFontColor: theme.colors.text,
    },
    {
      name: t('tasks.pending'),
      population: stats.pendingTasks,
      color: theme.colors.warning,
      legendFontColor: theme.colors.text,
    },
    {
      name: t('tasks.overdue'),
      population: stats.overdueTasks,
      color: theme.colors.error,
      legendFontColor: theme.colors.text,
    },
  ];

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Title>{t('dashboard.title')}</Title>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodyLarge">{t('dashboard.totalTasks')}</Text>
            <Text variant="headlineLarge" style={{ color: theme.colors.primary }}>
              {stats.totalTasks}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodyLarge">{t('dashboard.completedTasks')}</Text>
            <Text variant="headlineLarge" style={{ color: theme.colors.success }}>
              {stats.completedTasks}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodyLarge">{t('dashboard.pendingTasks')}</Text>
            <Text variant="headlineLarge" style={{ color: theme.colors.warning }}>
              {stats.pendingTasks}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodyLarge">{t('dashboard.overdueTasks')}</Text>
            <Text variant="headlineLarge" style={{ color: theme.colors.error }}>
              {stats.overdueTasks}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>{t('dashboard.completionRate')}</Title>
          <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
            {stats.completionRate.toFixed(1)}%
          </Text>
        </Card.Content>
      </Card>

      {stats.totalTasks > 0 && (
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title>{t('dashboard.overview')}</Title>
            <PieChart
              data={pieData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  statCard: {
    width: '48%',
    margin: '1%',
    marginBottom: 8,
  },
  chartCard: {
    margin: 16,
    marginTop: 8,
  },
});
