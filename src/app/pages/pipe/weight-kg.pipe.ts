import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightKg'
})
export class WeightKgPipe implements PipeTransform {

  transform(pokemon: any): number {

    // hg ÷ 10 = kg
    let pokemonhectograms = pokemon?.weight;
    let pokemonKg = pokemonhectograms / 10
    // console.log({pokemonhectograms})
    return pokemonKg;
  }

}
