import api from './api';

const contribute = (contributionData) => api.post('/transactions/contribute', contributionData);
const getGroupTransactions = (groupId) => api.get(`/transactions/group/${groupId}/transactions`);
const getUserTransactions = () => api.get('/transactions/user/transactions');
const getGroupStats = (groupId) => api.get(`/transactions/group/${groupId}/stats`);

export default {
  contribute,
  getGroupTransactions,
  getUserTransactions,
  getGroupStats,
};