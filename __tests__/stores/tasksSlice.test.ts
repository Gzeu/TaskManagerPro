import tasksReducer, {
  setFilter,
  clearFilter,
  setSortBy,
  reorderTasks,
} from '@store/slices/tasksSlice';
import { TaskStatus, TaskPriority } from '@types/index';

describe('tasksSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
    filter: {},
    sortBy: 'order' as const,
  };

  it('should handle initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFilter', () => {
    const actual = tasksReducer(
      initialState,
      setFilter({ status: TaskStatus.COMPLETED }),
    );
    expect(actual.filter.status).toEqual(TaskStatus.COMPLETED);
  });

  it('should handle clearFilter', () => {
    const stateWithFilter = {
      ...initialState,
      filter: { status: TaskStatus.COMPLETED },
    };
    const actual = tasksReducer(stateWithFilter, clearFilter());
    expect(actual.filter).toEqual({});
  });

  it('should handle setSortBy', () => {
    const actual = tasksReducer(initialState, setSortBy('priority'));
    expect(actual.sortBy).toEqual('priority');
  });

  it('should handle reorderTasks', () => {
    const stateWithTasks = {
      ...initialState,
      items: [
        { id: '1', title: 'Task 1', order: 0 } as any,
        { id: '2', title: 'Task 2', order: 1 } as any,
        { id: '3', title: 'Task 3', order: 2 } as any,
      ],
    };
    const actual = tasksReducer(stateWithTasks, reorderTasks({ from: 0, to: 2 }));
    expect(actual.items[0].id).toEqual('2');
    expect(actual.items[2].id).toEqual('1');
  });
});
