# NextIntl Testing Guide

## Current Status
✅ NextIntl is properly configured and working
✅ Server is running on http://localhost:3003
✅ Middleware is handling locale routing
✅ NextIntlClientProvider is properly set up

## Test URLs

### Basic Routes
- **Root**: http://localhost:3003/ (should redirect to /en)
- **English**: http://localhost:3003/en
- **Spanish**: http://localhost:3003/es

### Test Page (with translation examples)
- **English Test**: http://localhost:3003/en/test-intl
- **Spanish Test**: http://localhost:3003/es/test-intl

## What to Test

### 1. Language Switching
- Visit http://localhost:3003/en
- Click the language switcher (flag + globe icon) in the header
- Switch to Spanish - URL should change to /es and content should translate

### 2. Translation Examples
- Visit http://localhost:3003/en/test-intl
- You should see:
  - Server component translations working
  - Client component translations working
  - Current locale displayed correctly

### 3. Browser Console
- Open browser dev tools (F12)
- Check for any client-side errors
- The "Application error" you mentioned should be resolved

## Expected Behavior

### Working Features
- ✅ Automatic locale detection and redirect
- ✅ Language switcher with proper translations
- ✅ Server component translations (`getTranslations`)
- ✅ Client component translations (`useTranslations`, `useLocale`)
- ✅ Proper URL structure (/en/page, /es/page)

### Fixed Issues
- ✅ Removed conflicting root page.tsx
- ✅ Simplified root layout to avoid conflicts
- ✅ NextIntlClientProvider properly wrapping client components
- ✅ Messages properly passed from server to client

## Troubleshooting

If you still see errors:

1. **Clear browser cache** - Hard refresh (Ctrl+Shift+R)
2. **Check browser console** - Look for specific error messages
3. **Verify URL structure** - Make sure you're visiting /en or /es routes
4. **Test the test page** - Visit /en/test-intl to see isolated translation examples

## Next Steps

Once confirmed working:
1. Update existing components to use translations
2. Replace hardcoded strings with translation keys
3. Test all pages in both languages
4. Verify SEO metadata is properly localized