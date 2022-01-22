import { Component } from '@angular/core';
import { CurrencyConverterService } from './currency-converter.service';
import { CountryCodeFullObj } from './CountryCurrencyModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  AmountToBeConverted : any = null;
  ConvertedAmount : any = null;
  source! : CountryCodeFullObj;
  target!: CountryCodeFullObj;
  arr : any[] = [];
  displayResult : boolean = false;

  constructor(private service : CurrencyConverterService) { }

   ngOnInit() {
    this.service.getCountryAndCurrency().subscribe(
      data => {
          Object.values(data.results).forEach(val =>{
             this.arr.push(val);         
           });
          this.arr.sort((t1, t2) => {
          const name1 = t1.name.toLowerCase();
          const name2 = t2.name.toLowerCase();
          if (name1 > name2) { return 1; }
          if (name1 < name2) { return -1; }
          return 0;
        });
      });
  }

  swap(){
    let temp : CountryCodeFullObj;
    temp = this.source;
    this.source = this.target;
    this.target = temp;

    this.ConvertedAmount=0;
  }

  convert(){
    if(this.target === undefined){
      alert('Please enter a currency type which should be converted');
      return;
    }
    if(this.source === undefined){
      alert('Please enter a currency type to be converted');
      return;
    }
    if(this.AmountToBeConverted<=0){
      alert('Please enter an amount greater than 0');
      return;
    }
    this.service.ConvertAmount(this.source.currencyId, this.target.currencyId).subscribe(
      data => {
        Object.values(data).forEach(val =>{
          this.ConvertedAmount = this.AmountToBeConverted*val;
        });
      });
      this.displayResult = true;
  }
}
