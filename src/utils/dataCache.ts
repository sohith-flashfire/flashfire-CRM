const CACHE_KEYS = {
  BOOKINGS: 'unified_data_bookings',
  USERS: 'unified_data_users',
  BOOKINGS_TIMESTAMP: 'unified_data_bookings_ts',
  USERS_TIMESTAMP: 'unified_data_users_ts',
} as const;

const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export function getCachedBookings<T>(): T[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.BOOKINGS);
    const timestamp = localStorage.getItem(CACHE_KEYS.BOOKINGS_TIMESTAMP);
    
    if (!cached || !timestamp) {
      return null;
    }

    const age = Date.now() - parseInt(timestamp, 10);
    if (age > CACHE_DURATION_MS) {
      // Cache expired, clear it
      clearBookingsCache();
      return null;
    }

    return JSON.parse(cached) as T[];
  } catch (error) {
    console.error('Error reading bookings cache:', error);
    clearBookingsCache();
    return null;
  }
}

export function setCachedBookings<T>(data: T[]): void {
  try {
    localStorage.setItem(CACHE_KEYS.BOOKINGS, JSON.stringify(data));
    localStorage.setItem(CACHE_KEYS.BOOKINGS_TIMESTAMP, Date.now().toString());
  } catch (error) {
    console.error('Error writing bookings cache:', error);
  }
}

export function getCachedUsers<T>(): T[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.USERS);
    const timestamp = localStorage.getItem(CACHE_KEYS.USERS_TIMESTAMP);
    
    if (!cached || !timestamp) {
      return null;
    }

    const age = Date.now() - parseInt(timestamp, 10);
    if (age > CACHE_DURATION_MS) {
      // Cache expired, clear it
      clearUsersCache();
      return null;
    }

    return JSON.parse(cached) as T[];
  } catch (error) {
    console.error('Error reading users cache:', error);
    clearUsersCache();
    return null;
  }
}

export function setCachedUsers<T>(data: T[]): void {
  try {
    localStorage.setItem(CACHE_KEYS.USERS, JSON.stringify(data));
    localStorage.setItem(CACHE_KEYS.USERS_TIMESTAMP, Date.now().toString());
  } catch (error) {
    console.error('Error writing users cache:', error);
  }
}

export function clearBookingsCache(): void {
  try {
    localStorage.removeItem(CACHE_KEYS.BOOKINGS);
    localStorage.removeItem(CACHE_KEYS.BOOKINGS_TIMESTAMP);
  } catch (error) {
    console.error('Error clearing bookings cache:', error);
  }
}

export function clearUsersCache(): void {
  try {
    localStorage.removeItem(CACHE_KEYS.USERS);
    localStorage.removeItem(CACHE_KEYS.USERS_TIMESTAMP);
  } catch (error) {
    console.error('Error clearing users cache:', error);
  }
}

export function clearAllCache(): void {
  clearBookingsCache();
  clearUsersCache();
}

