import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heightMeter',
})
export class HeightMeterPipe implements PipeTransform {
  transform(pokemon: any): number {
    let pokemonDecimeter = pokemon?.height;
    let pokemonMeter: number = pokemonDecimeter / 10;
    // console.log({pokemonMeter})
    return pokemonMeter;
  }
}
