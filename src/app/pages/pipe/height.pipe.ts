import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'heightFeet'
})
export class HeightPipe implements PipeTransform {

  private _types = { 'cm': 0.01, 'dm': 0.1, 'm': 1 };
  private _feetPerMeter: number = 3.28084; 
  private _inchesPerFeet: number = 12


  transform(pokemon: any, type: string): string {

    
    // let pokemonDecimeter = pokemon?.height
    // let pokemonMeter: number = pokemonDecimeter / 10
    
    // return pokemonMeter;
    let meters = this.getMeters(pokemon?.height, type)
    let feet = meters * this._feetPerMeter
    // console.log({feet})
    let roundedFeet =  Math.floor(feet)
    // console.log({roundedFeet})
    let inches =  Math.round((feet - roundedFeet) * this._inchesPerFeet);
    // console.log({inches})0
    return `${roundedFeet}' ${_.padStart(inches.toString(), 2, '0')}"`;
  }
  
  
  getMeters(value: number, type: string): number {
    let conversion = this._types[type];
    if (conversion == null) {
       throw new Error('Could not find type');
    } else {
      // console.log({conversion})
      // console.log({value, type})
      // console.log(value * conversion)
      return value * conversion;
    }
  }


}
