import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() {}

  getMonths(): Observable<number[]> {
    let months: number[] = [];
    for (let tempMonth = 1; tempMonth <= 12; tempMonth++) {
      months.push(tempMonth);
    }
    return of(months);
  }

  getYears(): Observable<number[]> {
    let years: number[] = [];
    const currentYear: number = new Date().getFullYear();
    const endYear: number = currentYear + 10;
    for (let tempYear = currentYear; tempYear <= endYear; tempYear++) {
      years.push(tempYear);
    }
    return of(years);
  }
}