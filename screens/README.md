# Screens Module Structure

## Overview
The monolithic `screens.js` has been refactored into a modular, organized structure with separate files for each screen component, shared components, data, and styles.

## Directory Structure

```
screens/
├── index.js                    # Barrel export for easy imports
├── constants.js                # Colors (C), Fonts (F), Navigation (NAV)
├── styles.js                   # All StyleSheet definitions
│
├── HomeScreen.js               # Home/Navigation screen
├── NotificationsScreen.js       # Notifications screen
├── ProfileScreen.js             # Profile/Chat screen
├── NewListScreen.js             # Contact list creation screen
├── ReportSentScreen.js          # Report form & modal screen
├── SettingsScreen.js            # Notification settings screen
│
├── components/
│   ├── NotificationItem.js      # Reusable notification card component
│   └── ToggleRow.js             # Reusable settings toggle row component
│
└── data/
    ├── notifications.js         # Mock notifications data
    ├── messages.js              # Mock starred messages data
    └── contacts.js              # Mock contacts data
```

## Usage

### Import All Screens (from screens/index.js)
```javascript
import {
  HomeScreen,
  Screen1_Notifications,
  Screen2_Profile,
  Screen3_NewList,
  Screen4_ReportSent,
  Screen5_Settings,
  C,
  NAV,
  styles,
} from './screens';
```

### Import Individual Screen
```javascript
import { Screen1_Notifications } from './screens/NotificationsScreen';
```

### Import Components
```javascript
import { NotificationItem } from './screens/components/NotificationItem';
import { ToggleRow } from './screens/components/ToggleRow';
```

### Import Data
```javascript
import { notifToday, notifEarlier } from './screens/data/notifications';
import { starredMessages } from './screens/data/messages';
import { contacts } from './screens/data/contacts';
```

## Benefits of This Structure

1. **Modularity** - Each screen is independent and can be maintained separately
2. **Reusability** - Shared components and styles are centralized
3. **Scalability** - Easy to add new screens or components
4. **Organization** - Data, components, and styles are logically separated
5. **Maintainability** - Smaller, focused files are easier to understand and update
6. **Testing** - Individual screens and components can be tested in isolation
