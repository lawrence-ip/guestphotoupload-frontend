// Frontend Configuration
const CONFIG = {
  // Backend API URL
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://your-backend-domain.com',
  
  // Frontend URL (for redirects and sharing)
  FRONTEND_URL: window.location.origin,
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    LOGIN: '/api/login',
    REGISTER: '/api/register',
    LOGOUT: '/api/logout',
    USER: '/api/user',
    OAUTH_STATUS: '/api/oauth/status',
    
    // OAuth routes
    GOOGLE_AUTH: '/auth/google',
    FACEBOOK_AUTH: '/auth/facebook',
    
    // Token management
    TOKENS: '/api/tokens',
    TOKEN_INFO: '/api/tokens',
    
    // File upload
    UPLOAD: '/api/upload',
    UPLOADS: '/api/uploads',
    
    // Subscription
    SUBSCRIPTION: '/api/subscription',
    PRICING: '/api/pricing',
    CHECKOUT: '/api/create-checkout-session',
    PORTAL: '/api/create-portal-session',
    
    // Stats and health
    STATS: '/api/stats',
    HEALTH: '/api/health',
    
    // Google Drive
    DRIVE_STATUS: '/api/drive/status'
  },
  
  // Default options for fetch requests
  FETCH_OPTIONS: {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

// Helper function to make API calls
function apiCall(endpoint, options = {}) {
  const url = CONFIG.API_BASE_URL + endpoint;
  const fetchOptions = {
    ...CONFIG.FETCH_OPTIONS,
    ...options,
    headers: {
      ...CONFIG.FETCH_OPTIONS.headers,
      ...(options.headers || {})
    }
  };
  
  return fetch(url, fetchOptions);
}

// Helper function for form data uploads
function apiUpload(endpoint, formData) {
  const url = CONFIG.API_BASE_URL + endpoint;
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
}