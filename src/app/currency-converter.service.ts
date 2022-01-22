import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CurrencyConverterService {
  readonly URL = "https://free.currconv.com/api/v7/";
  readonly APIKey = "8a137edd92ddf7308a07";

  constructor(private http : HttpClient) { }

  getCountryAndCurrency(){
    return this.http.get<any>(this.URL + "countries?apiKey=" + this.APIKey);
  }

  ConvertAmount(sourceCurrencyID : string, targetCurrencyID : string){
    return this.http.get(this.URL + "convert?q=" + sourceCurrencyID + "_" + targetCurrencyID + "&compact=ultra&apiKey=" + this.APIKey);
  }
}
