import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon, TYPE_COLOURS } from '../interfaces/pokemon.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pokemon: Pokemon[] = [];
  public page: number = 0;
  public termino: string = '';
  public arrtypes: any[] = [];
  public arrAbilities: any[] = [];
  public arrStats: any[] = [];
  public arrMove: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPokemon();
  }

  getAllPokemon() {
    this.pokemonService.getAllPokemon().subscribe((pokemons) => {
      this.pokemon = pokemons;
      this.pokemon.forEach((poke, i) => {
        this.getTypePokemon(poke.id).subscribe((type: any) => {
          // console.log({type})
          this.arrtypes = type.types;
          let tipo: string[] = [];
          let abilites: string[]  = [];
          let Stats: string[]  = [];
          let moves: string[]  = [];
          this.arrAbilities = type.abilities
          this.arrStats = type.stats
          poke.move = moves
          this.arrStats.forEach(stats => {
           Stats.push(stats)
          });
          poke.stats = Stats
          this.arrAbilities.forEach(ability => {
            abilites.push(ability.ability.name)
          })
          poke.abilities = abilites;
          this.arrtypes.forEach((types) => {
            tipo.push(types.type.name);
          });
          poke.type = tipo;
        });
      });
    });
  }

  siguentes() {
    this.page = this.page + 5;
  }

  anteriores() {
    if (this.page > 0) {
      this.page = this.page - 5;
    }
  }

  searchTerm(event: string) {
    this.page = 0;
    this.termino = event;
  }

  getTypePokemon(id: string): any {
    return this.pokemonService.getTypePokemon(id);
  }

  irDetails(pokemon: Pokemon){
    localStorage.setItem('pokemon', JSON.stringify(pokemon))
    this.router.navigate(['/pokemon/details', pokemon.id])
  }


  _getTypeColour(type: string): any {
    return `#${TYPE_COLOURS[type]}`;
  }

}
