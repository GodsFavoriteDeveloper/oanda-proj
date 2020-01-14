import { Rates } from './models/rates.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const reload = interval(5000);

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://localhost:3000/rates';
  private rawRatesData = new Subject<Rates[]>();


  constructor(private http: HttpClient) { }

  loadData() {
    return this.http.get<{message: string, candles: any}>(this.url).pipe(
      tap((res) => {
        this.rawRatesData.next(res.candles);
        // console.log(this.rawRatesData);
      }),
      map((res) => {
        return res.candles.map(candle => {
          // Format date from ISO date to timestamp to match required format in Highcharts
          let initTime = new Date(candle.time);
          let formattedTime = initTime.getTime();
          // Change format from array of objects to array of arrays
          return [
            +formattedTime,
            +candle.bid.c,
            +candle.bid.h,
            +candle.bid.l,
            +candle.bid.o
          ];
        });
      }),
    );
  }

  getUpdatedRatesRawListener() {
    return this.rawRatesData.asObservable();
  }

}
