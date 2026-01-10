# PostHog post-wizard report

The wizard has completed a deep integration of your Dev Events project. PostHog has been integrated using the recommended `instrumentation-client.ts` approach for Next.js 16.x, which provides automatic initialization on the client side. A reverse proxy has been configured through Next.js rewrites to improve tracking reliability and reduce ad-blocker interference. Error tracking and exception capture are enabled by default, and automatic pageview tracking is configured using PostHog's latest defaults.

## Files Created

| File | Purpose |
|------|---------|
| `.env` | Environment variables for PostHog API key and host |
| `instrumentation-client.ts` | Client-side PostHog initialization |
| `posthog-setup-report.md` | This setup report |

## Files Modified

| File | Changes |
|------|---------|
| `next.config.ts` | Added rewrites for PostHog reverse proxy and skipTrailingSlashRedirect |
| `components/ExploreBtn.tsx` | Added `explore_events_clicked` event capture |
| `components/EventCard.tsx` | Added `event_card_clicked` event capture with event details |
| `components/Navbar.tsx` | Added `nav_link_clicked` and `logo_clicked` event captures |

## Events Instrumented

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the 'Explore Events' button on the homepage to scroll to the events section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details, includes event title, slug, location, date, and time | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicked a navigation link in the header navbar, includes link name and href | `components/Navbar.tsx` |
| `logo_clicked` | User clicked the logo/brand link in the navbar | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/282048/dashboard/1012725) - Core metrics dashboard for Dev Events

### Insights
- [Event Card Clicks Over Time](https://us.posthog.com/project/282048/insights/fR3QAayk) - Track how many times users click on event cards
- [Navigation Link Clicks](https://us.posthog.com/project/282048/insights/tziK2Vst) - Track clicks on navigation links, broken down by link name
- [Explore Events Button Clicks](https://us.posthog.com/project/282048/insights/O08utmG1) - Track engagement with the Explore Events CTA
- [Most Popular Events](https://us.posthog.com/project/282048/insights/yiVN23qq) - See which events are most clicked by users
- [Homepage to Event Detail Funnel](https://us.posthog.com/project/282048/insights/iHdjZyWa) - Conversion funnel from pageview to exploring events to clicking an event

## Configuration Details

- **PostHog Host**: https://us.i.posthog.com (via reverse proxy at `/ingest`)
- **Error Tracking**: Enabled (`capture_exceptions: true`)
- **Debug Mode**: Enabled in development environment
- **Pageview Tracking**: Automatic (using defaults: '2025-05-24')
