import { Rates } from './models/rates.model';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts/highstock';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rates: Rates[];
  closingArray: number[] = [];
  lowArray: number[] = [];
  highArray: number[] = [];
  latestHighPrice: number;
  latestLowPrice: number;
  averageClosingPrice: number;
  averageHighPrice: number;
  averageLowPrice: number;

  constructor(private data: DataService) {


  }

  ngOnInit() {
    this.getDataFromService();
    setInterval(() => {
      this.closingArray = [];
      this.lowArray = [];
      this.highArray = [];
      // this.averageClosingPrice = 0;
      this.getDataFromService();
  }, 5000);
    this.data.getUpdatedRatesRawListener().subscribe((data) => {
      this.rates = data;
      // Math.max(...this.rates)
      this.latestHighPrice = this.rates[99].bid.h;
      this.latestLowPrice = this.rates[99].bid.l;

      let total = 0;
      for (let item of this.rates) {
        this.closingArray.push(+item.bid.c);
        this.lowArray.push(+item.bid.l);
        this.highArray.push(+item.bid.h);
      }

      let av = this.closingArray.reduce((x, y) => x + y);
      let high = this.highArray.reduce((x, y) => x + y);
      let low = this.lowArray.reduce((x, y) => x + y);

      this.averageClosingPrice = av / 100;
      this.averageHighPrice = high / 100;
      this.averageLowPrice = low / 100;


  });
  }

  getDataFromService() {
    // Get data from Node API (MongoDB)
    this.data.loadData()
    .subscribe((res) => {
      // console.log(res);
      // Load chart with API Response
      this.loadChart(res);
    });
  }

  loadChart(data) {
    let myChart = HighCharts.stockChart('highcharts', {
      rangeSelector: {
        selected: 1
    },

    title: {
        text: 'OANDA Live Reports'
    },

    series: [{
        type: 'candlestick',
        name: 'AAPL Stock Price',
        data: data,
        dataGrouping: {

        }
    }]
    });
  }
}
