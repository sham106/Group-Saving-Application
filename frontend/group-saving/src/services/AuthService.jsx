// src/services/authService.js
export const auth = {
    currentUser: null,
    roles: {},
  
    onAuthStateChanged(callback) {
      // In a real app, this would connect to your auth backend
      const handleAuthChange = () => {
        callback(this.currentUser);
      };
  
      // Simulate auth state persistence
      const user = JSON.parse(localStorage.getItem('groupSaveUser'));
      if (user) {
        this.currentUser = user;
        this.roles[user.uid] = user.role;
      }
  
      window.addEventListener('storage', handleAuthChange);
      return () => window.removeEventListener('storage', handleAuthChange);
    },
  
    async login(email, password) {
      // Simulate API call
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('groupSaveUsers') || '[]');
          const user = users.find(u => u.email === email && u.password === password);
          
          if (user) {
            this.currentUser = user;
            this.roles[user.uid] = user.role;
            localStorage.setItem('groupSaveUser', JSON.stringify(user));
            resolve(user);
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 500);
      });
    },
  
    async signup(userData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('groupSaveUsers') || '[]');
          if (users.some(u => u.email === userData.email)) {
            reject(new Error('Email already exists'));
            return;
          }
  
          const newUser = {
            ...userData,
            uid: `user_${Date.now()}`,
            role: 'member', // Default role
            createdAt: new Date().toISOString()
          };
  
          users.push(newUser);
          localStorage.setItem('groupSaveUsers', JSON.stringify(users));
          this.currentUser = newUser;
          this.roles[newUser.uid] = newUser.role;
          localStorage.setItem('groupSaveUser', JSON.stringify(newUser));
          resolve(newUser);
        }, 500);
      });
    },
  
    logout() {
      this.currentUser = null;
      localStorage.removeItem('groupSaveUser');
    },
  
    isAdmin() {
      return this.currentUser?.role === 'admin';
    },
  
    isMember() {
      return this.currentUser?.role === 'member';
    }
  };