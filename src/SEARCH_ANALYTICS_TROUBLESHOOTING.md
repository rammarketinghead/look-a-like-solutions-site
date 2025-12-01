# Search Analytics Troubleshooting Guide

## Issue Summary
Search queries are not appearing in the Search Analytics CMS collection or dashboard.

## Root Causes Identified

### 1. **CMS Collection Permissions** ⚠️ CRITICAL
The `searchanalytics` collection has restrictive permissions:
- **Read**: ADMIN only (prevents frontend from reading data)
- **Update**: ADMIN only (prevents updating existing records)
- **Insert**: ANYONE (allows creating new records)

**Fix**: Change permissions to allow frontend access:
- Read: ANYONE
- Update: ANYONE
- Insert: ANYONE

### 2. **Hook State Management Issue**
The `useSearchAnalytics()` hook has a potential race condition:
- `isRecording` state prevents concurrent searches from being recorded
- If a search is in progress, subsequent searches are silently ignored

**Fix**: Remove the `isRecording` guard or implement a queue system

### 3. **Missing Error Logging**
The `recordSearch()` function catches errors silently without detailed logging:
- Permission errors are not visible to developers
- Makes debugging difficult

**Fix**: Add detailed error logging with error codes

## Implementation Steps

### Step 1: Update CMS Collection Permissions
1. Go to Wix CMS Collections
2. Select "Search Analytics" collection
3. Update permissions:
   - **Read**: Change from "ADMIN" to "ANYONE"
   - **Update**: Change from "ADMIN" to "ANYONE"
   - **Insert**: Keep as "ANYONE"
4. Save changes

### Step 2: Fix Hook Race Condition
Update `src/hooks/useSearchAnalytics.ts`:
- Remove the `isRecording` guard that prevents concurrent searches
- Or implement a queue to handle multiple searches

### Step 3: Enhance Error Logging
Update `src/services/searchAnalyticsService.ts`:
- Add detailed error logging with error types
- Log permission errors specifically
- Include request/response details for debugging

## Verification Steps

1. **Test Search Recording**:
   - Open the website
   - Perform a search in the search bar
   - Check browser console for any errors
   - Wait 2-3 seconds for async operation to complete

2. **Verify Data in CMS**:
   - Go to Wix CMS Collections
   - Open "Search Analytics" collection
   - Check if new records appear after searches

3. **Check Dashboard**:
   - Navigate to `/admin/search-analytics`
   - Verify that search data is displayed
   - Check for any error messages

## Expected Behavior After Fix

✅ Search queries are recorded to CMS immediately
✅ Dashboard shows search analytics data
✅ Multiple concurrent searches are handled correctly
✅ Error messages are logged for debugging
✅ No permission errors in browser console

## Files Involved

- `/src/services/searchAnalyticsService.ts` - Records searches to CMS
- `/src/hooks/useSearchAnalytics.ts` - Provides recording hook
- `/src/components/ui/search-bar.tsx` - Calls recordSearch()
- `/src/components/ui/search-analytics-dashboard.tsx` - Displays data
- CMS Collection: `searchanalytics` - Stores search data

## Additional Notes

- Search recording is async and non-blocking
- Errors don't prevent search functionality
- Data is stored with timestamps for analytics
- User agent info is captured for device tracking
