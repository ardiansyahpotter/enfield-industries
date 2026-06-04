// Simulated authentication functionality

// Check if user is logged in
export function isLoggedIn() {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem('user') !== null;
}

// Get the current logged in user
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const userJson = window.sessionStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}

// Check if the current user is an admin
export function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// Login user
export function login(email, password, users) {
  if (typeof window === 'undefined') return false;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Store user info in session storage (without password)
    const { password: _, ...userWithoutPassword } = user;
    window.sessionStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return true;
  }
  
  return false;
}

// Logout user
export function logout() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem('user');
}

// Check if user has permission for a specific action
export function hasPermission(action, resourceOwnerId = null) {
  const user = getCurrentUser();
  
  if (!user) return false;
  
  // Admin has all permissions
  if (user.role === 'admin') return true;
  
  // For projects, check if user is the responsible person
  if (action === 'edit-project' && resourceOwnerId === user.id) {
    return true;
  }
  
  // Default permissions for regular users
  const userPermissions = {
    'view-projects': true,
    'view-services': true,
    'view-transactions': true,
    'view-reports': false,
    'manage-users': false
  };
  
  return userPermissions[action] || false;
}