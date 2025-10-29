import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Task } from '@types/index';
import { format } from 'date-fns';

export const exportToExcel = async (tasks: Task[], filename: string = 'tasks.xlsx') => {
  try {
    const data = tasks.map(task => ({
      Title: task.title,
      Description: task.description || '',
      Status: task.status,
      Priority: task.priority,
      'Due Date': task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
      Labels: task.labels.join(', '),
      'Created At': format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm'),
      'Completed At': task.completedAt ? format(new Date(task.completedAt), 'yyyy-MM-dd HH:mm') : '',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
    
    await RNFS.writeFile(path, wbout, 'base64');
    
    await Share.open({
      url: `file://${path}`,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      filename,
    });

    return path;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};

export const exportToCSV = async (tasks: Task[], filename: string = 'tasks.csv') => {
  try {
    const headers = ['Title', 'Description', 'Status', 'Priority', 'Due Date', 'Labels', 'Created At'];
    const rows = tasks.map(task => [
      task.title,
      task.description || '',
      task.status,
      task.priority,
      task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
      task.labels.join('; '),
      format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm'),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
    await RNFS.writeFile(path, csv, 'utf8');

    await Share.open({
      url: `file://${path}`,
      type: 'text/csv',
      filename,
    });

    return path;
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
};

export const importFromCSV = async (filePath: string): Promise<Partial<Task>[]> => {
  try {
    const content = await RNFS.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

    const tasks: Partial<Task>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
      if (values.length < headers.length) continue;

      const task: Partial<Task> = {
        title: values[0],
        description: values[1],
        status: values[2] as any,
        priority: values[3] as any,
        dueDate: values[4] ? new Date(values[4]) : undefined,
        labels: values[5] ? values[5].split(';').map(l => l.trim()) : [],
      };

      tasks.push(task);
    }

    return tasks;
  } catch (error) {
    console.error('Error importing from CSV:', error);
    throw error;
  }
};
