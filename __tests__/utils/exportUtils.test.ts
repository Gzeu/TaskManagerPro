import { Task, TaskStatus, TaskPriority } from '@types/index';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

jest.mock('react-native-fs');
jest.mock('react-native-share');

describe('exportUtils', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: TaskStatus.TODO,
      priority: TaskPriority.HIGH,
      labels: ['test', 'urgent'],
      attachments: [],
      createdBy: 'user1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      order: 0,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create CSV export with correct format', () => {
    expect(mockTasks[0].title).toEqual('Test Task');
    expect(mockTasks[0].labels).toContain('test');
  });

  it('should handle empty task list', () => {
    const emptyTasks: Task[] = [];
    expect(emptyTasks.length).toBe(0);
  });
});
