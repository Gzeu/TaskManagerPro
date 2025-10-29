import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Card, Text, Chip, IconButton } from 'react-native-paper';
import { Task, TaskPriority } from '@types/index';
import { useTheme } from '@/contexts/ThemeContext';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onLongPress?: () => void;
  isActive?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onLongPress, isActive }) => {
  const { theme } = useTheme();

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT:
        return theme.colors.error;
      case TaskPriority.HIGH:
        return theme.colors.warning;
      case TaskPriority.MEDIUM:
        return theme.colors.info;
      default:
        return theme.colors.success;
    }
  };

  const priorityColor = getPriorityColor(task.priority);

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <Card
        style={[
          styles.card,
          { borderLeftColor: priorityColor, borderLeftWidth: 4 },
          isActive && styles.activeCard,
        ]}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
              {task.title}
            </Text>
            <IconButton
              icon={task.status === 'completed' ? 'check-circle' : 'checkbox-blank-circle-outline'}
              size={24}
              iconColor={task.status === 'completed' ? theme.colors.success : theme.colors.outline}
            />
          </View>

          {task.description && (
            <Text variant="bodyMedium" style={styles.description} numberOfLines={2}>
              {task.description}
            </Text>
          )}

          <View style={styles.footer}>
            <View style={styles.labels}>
              {task.labels.slice(0, 2).map((label, index) => (
                <Chip key={index} compact style={styles.labelChip}>
                  {label}
                </Chip>
              ))}
              {task.labels.length > 2 && (
                <Chip compact style={styles.labelChip}>
                  +{task.labels.length - 2}
                </Chip>
              )}
            </View>

            {task.dueDate && (
              <View style={styles.dateContainer}>
                <Icon
                  name="calendar-clock"
                  size={16}
                  color={
                    new Date(task.dueDate) < new Date()
                      ? theme.colors.error
                      : theme.colors.text
                  }
                />
                <Text
                  variant="bodySmall"
                  style={[
                    styles.dueDate,
                    new Date(task.dueDate) < new Date() && { color: theme.colors.error },
                  ]}>
                  {format(new Date(task.dueDate), 'MMM dd')}
                </Text>
              </View>
            )}
          </View>

          {task.attachments.length > 0 && (
            <View style={styles.attachments}>
              <Icon name="paperclip" size={16} color={theme.colors.text} />
              <Text variant="bodySmall" style={styles.attachmentCount}>
                {task.attachments.length} attachment{task.attachments.length > 1 ? 's' : ''}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  activeCard: {
    opacity: 0.7,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 12,
    opacity: 0.7,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labels: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  labelChip: {
    marginRight: 4,
    height: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    marginLeft: 4,
  },
  attachments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  attachmentCount: {
    marginLeft: 4,
  },
});
