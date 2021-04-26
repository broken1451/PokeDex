import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonResponse } from '../interfaces/pokemon.interfaces';
import { map } from 'rxjs/operators';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getAllPokemon(): Observable<Pokemon[]> {
    const params = new HttpParams().set('limit', '100');
    return this.httpClient
      .get<PokemonResponse>(`${URL}/pokemon`, { params })
      .pipe(
        map((pokemon) => {
          return this.pokemonSmall(pokemon);
        })
      );
  }

  private pokemonSmall(res: PokemonResponse): Pokemon[] {
    const pokemon: Pokemon[] = res.results.map((poke) => {
      const urlArr = poke.url.split('/');
      const id = urlArr[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      let type = '';
      return {
        id,
        name: poke.name,
        pic: pic,
        type,
      };
    });
    return pokemon;
  }

  getTypePokemon(id: string) {
    return this.httpClient.get<PokemonResponse>(`${URL}/pokemon/${id}`);
  }
}
