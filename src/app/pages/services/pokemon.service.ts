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
    const params = new HttpParams().set('limit', '151');
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
      const pic = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
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

 
  getEspiciesPokemon(name: string) {
    return this.httpClient.get(`${URL}/pokemon-species/${name}`);
  }

  getEvolution(id: number): Observable<any> {
    return this.httpClient.get(`${URL}/evolution-chain/${id}`);
  }

  // https://pokeapi.co/api/v2/move/{id or name}/
  getMoves(id: string): Observable<any> {
    return this.httpClient.get(`${URL}/move/${id}`);
  }
}
