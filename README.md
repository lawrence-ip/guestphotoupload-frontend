# GuestStory Frontend

This is the frontend application for GuestStory - a photo collection service.

## Features

- Modern HTML5/CSS3/JavaScript frontend
- Responsive design for mobile and desktop
- API-based communication with backend
- OAuth integration support
- Real-time dashboard updates
- Guest photo upload interface

## Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   This will start a live server on `http://localhost:3001`

3. **Backend Configuration**:
   Ensure the backend is running on `http://localhost:3000` or update the API URL in `config.js`

## File Structure

```
├── index.html          # Landing page with auth routing
├── login.html          # User login page
├── register.html       # User registration page
├── dashboard.html      # Main dashboard for authenticated users
├── upload-guest.html   # Guest photo upload page
├── config.js           # Frontend configuration and API helpers
├── css/
│   └── style.css      # Main stylesheet
└── package.json       # Dependencies and scripts
```

## Configuration

The frontend automatically detects the environment:

- **Development**: When hostname is `localhost`, uses `http://localhost:3000` as backend
- **Production**: Uses the configured production backend URL

To change the backend URL, modify `config.js`:

```javascript
const CONFIG = {
  API_BASE_URL: 'https://your-backend-domain.com',
  // ... other config
};
```

## Pages

### Index (/)
- Landing page that checks authentication status
- Redirects to dashboard if authenticated, login if not

### Login (/login.html)
- Email/password authentication
- OAuth login buttons (Google, Facebook)
- Redirects to dashboard on success

### Register (/register.html)
- New user registration
- Similar OAuth options

### Dashboard (/dashboard.html)
- User statistics display
- Create upload links
- Manage existing upload links
- Copy links and generate QR codes

### Upload Guest (/upload-guest.html?token=...)
- Public upload interface for guests
- Drag-and-drop photo upload
- Progress indicators
- Success/error handling

## API Integration

All API calls use the `apiCall()` helper function from `config.js`:

```javascript
// GET request
const response = await apiCall('/api/user');

// POST request
const response = await apiCall('/api/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

// File upload
const response = await apiUpload('/api/upload/token', formData);
```

## Production Deployment

### Static File Hosting

The frontend is a static HTML/CSS/JS application that can be deployed to:

- **Netlify**:
  1. Connect your GitHub repository
  2. Set build command: `npm run build`
  3. Set publish directory: `.` (root)
  4. Deploy automatically on commits

- **Vercel**:
  1. Connect GitHub repository
  2. Vercel auto-detects static site
  3. Deploy with zero configuration

- **AWS S3 + CloudFront**:
  1. Upload files to S3 bucket
  2. Enable static website hosting
  3. Configure CloudFront for global CDN

- **Traditional Web Hosting**:
  1. Upload all files to web hosting directory
  2. Ensure proper MIME types for JS/CSS
  3. Configure redirects if needed

### Configuration for Production

1. **Update Backend URL** in `config.js`:
   ```javascript
   API_BASE_URL: 'https://your-backend-domain.com'
   ```

2. **CORS Configuration**: Ensure your backend allows requests from your frontend domain

3. **HTTPS**: Use HTTPS for production (required for OAuth)

4. **Environment Variables**: Some hosting platforms support environment variable injection

### Build Process

No build process is required as this is a static site. However, you can:

1. **Minification**: Use tools like Terser for JavaScript and csso for CSS
2. **Bundling**: Use webpack or Rollup for production bundling
3. **Optimization**: Compress images and other assets

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used (fetch, async/await, arrow functions)
- Mobile responsive design

## Development Commands

- `npm run dev` - Start development server with live reload
- `npm start` - Start production server
- `npm run build` - Placeholder for build process
- `npm run preview` - Preview built application

## Authentication Flow

1. User visits any page
2. Frontend checks authentication via `/api/user`
3. If authenticated: continue to requested page
4. If not authenticated: redirect to `/login.html`
5. After login: redirect to `/dashboard.html`

## Security Considerations

- All API calls include credentials (cookies)
- CSRF protection via same-origin policy
- Input validation and XSS prevention
- Secure file upload handling
- OAuth state verification

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured for your frontend domain
- Check that credentials are included in requests

### Authentication Issues
- Verify session cookies are being sent
- Check backend session configuration
- Ensure HTTPS in production

### Upload Problems
- Verify file size limits
- Check supported file types
- Ensure backend upload endpoint is accessible