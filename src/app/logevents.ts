export class LogEvent {
  private timestamp: string;
  private milliseconds: number;
  private page: string;
  private event: string;
  private module_index: any;

  constructor(
    timestamp: string,
    milliseconds: number,
    page: string,
    event: string,
    module_index: any
  ) {
    this.timestamp = timestamp;
    this.milliseconds = milliseconds;
    this.page = page;
    this.event = event;
    this.module_index = module_index;
  }
}
