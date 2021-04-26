import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  public pokemon!: Pokemon;
  public imgPokemon!: string;

  constructor(private pokemonService:PokemonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(({id})=> {}),
      switchMap(({id})=>{
        let idLocalstorage = JSON.parse(localStorage.getItem('pokemon') || id);
        this.imgPokemon = idLocalstorage.pic
        return this.getPokemonById(idLocalstorage.id)
      })
    ).subscribe((pokemon)=>{
      this.pokemon = pokemon;
      console.log(pokemon);
    })
  }

  getPokemonById(id:string): Observable<any>{
    return this.pokemonService.getTypePokemon(id)
  }

}
