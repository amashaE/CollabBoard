# Calendar / Deadlines

Calendar / Deadlines feature for the CollabBoard team task board.

## Files
- `Calendar.jsx` - Calendar UI and deadline display
- `Calendar.css` - Styling and responsive layout
- `initialDeadlin.js` - Initial mock deadline data
- `App.jsx` - Example entry point
- `README.md` - Documentation

## Features
- Monthly calendar view
- Previous/next month navigation
- Tasks displayed on deadline dates
- Priority indicators
- Upcoming deadlines
- Responsive layout

## Integration
If the main project already has an `App.jsx`, do not replace the team's existing file. Import the Calendar component into the existing App instead:

```jsx
import Calendar from "./components/Calendar/Calendar";
```

Then render `<Calendar />`.

The sample data can later be replaced with the group's shared `mockData.js` or backend data.
