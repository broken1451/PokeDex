import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightlbs'
})
export class WeightlbsPipe implements PipeTransform {

  private _types = {'cg': 0.01, 'dg': 0.1, 'g': 1, 'dag': 10, 'hg': 100, 'kg': 1000};
  private _poundPerGram: number = 0.00220462;


  transform(pokemon: any, type: string): string {
    let grams = this.getGrams(pokemon?.weight, type)
    let pounds = grams * this._poundPerGram;
    // console.log( {pounds})
    return `${pounds.toFixed(1)} lbs`;
  }

  getGrams(value: number, type: string): number {
    let conversion = this._types[type];
    if (conversion == null) {
      throw new Error('Could not find type');
    } else {
      // console.log( {value, conversion})
      // console.log( value * conversion)
      return value * conversion;
    }
  }

}
