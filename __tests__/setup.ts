// Set required env vars before any module imports
process.env.ADMIN_SESSION_SECRET = "test-secret-at-least-32-chars-long-for-hmac";
process.env.NEWSLETTER_UNSUBSCRIBE_SECRET = "test-newsletter-secret-32-chars-min";
