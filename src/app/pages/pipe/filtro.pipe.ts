import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interfaces';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(pokemons: Pokemon[], page: number = 0, termino:string = ''): Pokemon[] {

    if (termino.length === 0) {
      return  pokemons.slice(page,page+6)
    }
  
    const pokeFiltrados = pokemons.filter(poke=> poke.name.includes(termino))
  
    return pokeFiltrados.slice(page,page+6)

  }

}
