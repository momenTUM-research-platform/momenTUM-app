export interface Pvt {
  type: 'pvt';
  id: string;
  trials: number;
  min_waiting: number;
  max_waiting: number;
  show: boolean;
  max_reaction: number;
  exit: boolean;
}
