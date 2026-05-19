import { DataStore } from '../../shared/types';
import { initialData } from './initialData';

// 内存存储（实际项目中应该使用数据库）
let dataStore: DataStore = { ...initialData };

export const getData = (): DataStore => dataStore;

export const updateData = (newData: Partial<DataStore>) => {
  dataStore = { ...dataStore, ...newData };
};

export const resetData = () => {
  dataStore = { ...initialData };
};
