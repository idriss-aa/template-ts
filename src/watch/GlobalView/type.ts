export interface TimeZone {
    id: string;
    offset: number;
    name: string;
}
  
export const TIMEZONES: TimeZone[] = [
    { id: 'GMT', offset: 0, name: 'GMT (Londres)' },
    { id: 'GMT+1', offset: 1, name: 'GMT+1 (Paris)' },
    { id: 'GMT+2', offset: 2, name: 'GMT+2 (Le Caire)' },
    { id: 'GMT+3', offset: 3, name: 'GMT+3 (Moscou)' },
    { id: 'GMT+4', offset: 4, name: 'GMT+4 (Dubaï)' },
    { id: 'GMT+5', offset: 5, name: 'GMT+5 (Karachi)' },
    { id: 'GMT-5', offset: -5, name: 'GMT-5 (New York)' },
    { id: 'GMT-8', offset: -8, name: 'GMT-8 (Los Angeles)' },
];