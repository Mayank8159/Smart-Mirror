// app/page.tsx (Server Component)

import SmartMirrorUI from '../components/SmartMirrorUI/SmartMirrorUI';
// 🚨 NEW IMPORT: Import the dynamically loaded components from the Client Component
import { 
  DynamicClockComponent, 
  DynamicWeatherComponent,
  DynamicNewsComponent,
  DynamicCalendarComponent
} from '@/components/DynamicLoader'; 

/**
 * Server Component: Orchestrates the layout and component loading.
 * It passes the dynamically loaded components (which are now proper React components)
 * to the SmartMirrorUI layout.
 */
export default function HomePage() {
  return (
    <SmartMirrorUI
      // Pass the imported dynamic components as props
      ClockComponent={DynamicClockComponent}
      WeatherComponent={DynamicWeatherComponent}
      NewsComponent={DynamicNewsComponent}
      CalendarComponent={DynamicCalendarComponent}
    />
  );
}