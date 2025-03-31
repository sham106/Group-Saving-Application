import api from './api';

const createGroup = (groupData) => api.post('/groups/', groupData);
const getGroups = () => api.get('/groups/');
const getGroupDetails = (groupId) => api.get(`/groups/${groupId}`);
const joinGroup = (inviteData) => api.post('/groups/join', inviteData);
const leaveGroup = (groupId) => api.post(`/groups/${groupId}/leave`);
const getGroupMembers = (groupId) => api.get(`/groups/${groupId}/members`);
const addGroupMember = (groupId, email) => api.post(`/groups/${groupId}/members`, { email });
const makeAdmin = (groupId, userId) => api.post(`/groups/${groupId}/admin/${userId}`);

export default {
  createGroup,
  getGroups,
  getGroupDetails,
  joinGroup,
  leaveGroup,
  getGroupMembers,
  addGroupMember,
  makeAdmin,
};