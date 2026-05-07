export function parseFrenchDateFallback(dateStr: string, timeStr: string): Date | null {
    const moisMap: Record<string, number> = {
      janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
      juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
    };
    const parts = dateStr.trim().split(/\s+/);
    const dayNum = parseInt(parts[1], 10);
    const monthName = parts[2]?.toLowerCase();
    const year = parseInt(parts[3], 10);
    const month = moisMap[monthName ?? ""];
  
    if (isNaN(dayNum) || month === undefined || isNaN(year)) return null;
  
    let hour = 0;
    let minute = 0;
    const timeMatch = timeStr.match(/(\d+)[h:](\d+)?/);
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10);
      minute = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    }
    return new Date(year, month, dayNum, hour, minute);
  }