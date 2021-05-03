import { Output, Pipe, PipeTransform, EventEmitter } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interfaces';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  @Output() pokemons: EventEmitter<Pokemon[]> = new EventEmitter<Pokemon[]>();


  transform(pokemons: Pokemon[], page: number = 0, termino:string = ''): Pokemon[] {
  
    if (termino.length === 0) {
      return  pokemons.slice(page,page+6)
    }
  
    const pokeFiltrados = pokemons.filter(poke=> {
     return poke.name.includes(termino)
    })
     
    if (pokeFiltrados.length == 0) {
      this.pokemons.emit(pokeFiltrados)
      return []
    }

    return pokeFiltrados.slice(page,page+6)

  }

}
