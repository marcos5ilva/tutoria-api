export class TimeConverter {
  public hourToMinute(time: string): any {
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minutes;
    return timeInMinutes;
  }
}
