import api from './api';

const requestWithdrawal = (withdrawalData) => api.post('/withdrawals/request', withdrawalData);
const getPendingWithdrawals = (groupId) => api.get(`/withdrawals/pending/${groupId}`);
const processWithdrawal = (withdrawalId, actionData) => api.post(`/withdrawals/${withdrawalId}/action`, actionData);
const getUserWithdrawals = () => api.get('/withdrawals/user');
const getGroupWithdrawals = (groupId) => api.get(`/withdrawals/group/${groupId}`);
const getAvailableBalance = (groupId) => api.get(`/withdrawals/user/available-balance/${groupId}`);

export default {
  requestWithdrawal,
  getPendingWithdrawals,
  processWithdrawal,
  getUserWithdrawals,
  getGroupWithdrawals,
  getAvailableBalance,
};