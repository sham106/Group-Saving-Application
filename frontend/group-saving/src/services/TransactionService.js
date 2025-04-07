import api from './api';

export const contributeToGroup = async (contributionData) => {
  try {
    const response = await api.post('/api/transactions/contribute', contributionData);
    return response.data;
  } catch (error) {
    throw new Error(error.errors ? Object.values(error.errors).join(' ') : error.error || 'Failed to contribute');
  }
};

export const getGroupTransactions = async (groupId, page = 1, perPage = 20) => {
  try {
    const response = await api.get(`/api/transactions/group/${groupId}/transactions`, {
      params: { page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.error || 'Failed to fetch group transactions');
  }
};

export const getUserTransactions = async (page = 1, perPage = 20) => {
  try {
    const response = await api.get('/api/transactions/user/transactions', {
      params: { page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.error || 'Failed to fetch user transactions');
  }
};

export const getGroupStats = async (groupId) => {
  try {
    const response = await api.get(`/api/transactions/group/${groupId}/stats`);
    return response.data;
  } catch (error) {
    throw new Error(error.error || 'Failed to fetch group statistics');
  }
};