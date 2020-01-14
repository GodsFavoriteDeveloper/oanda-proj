export interface Rates {
  _id: string;
  complete: boolean;
  volume: number;
  time: string;
  bid: {
    o: number;
    h: number;
    l: number;
    c: number;
  };
}
