import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon, TYPE_COLOURS } from '../interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy{

  public pokemon!: any;
  public poke!: any;
  public imgPokemon!: string;
  public imgsPokemon!: string[];
  public pokemons!: any;
  public pokemonAbilities: any[] = [];
  public pokemonstats: any[] = [];
  public totaStats!: number;
  public imgsEvolutions: string = 'https://pokeres.bastionbot.org/images/pokemon/';

  constructor(private pokemonService:PokemonService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(({id})=> {}),
      switchMap(({id})=>{
        let idLocalstorage = JSON.parse(localStorage.getItem('pokemon') || id);
        this.pokemons = idLocalstorage;
        this.imgPokemon = idLocalstorage.pic
        this.pokemonAbilities = idLocalstorage.abilities;
        this.pokemonstats = idLocalstorage.stats;
        let acumulador = 0 
         for (let i = 0; i < this.pokemonstats.length; i++) {
           const element =  this.pokemonstats[i];
           acumulador =  acumulador + element.base_stat
           this.totaStats = acumulador
         }
        return this.getPokemonById(idLocalstorage.id)
      })
    ).subscribe((pokemon)=>{
      // console.log(pokemon)
      this.pokemon = pokemon;
      this.pokemon.evolutions = [];
    })
    this.getEvolution()
  }

  ngOnDestroy(): void {
 
  }

  getPokemonById(id:string): Observable<any>{
    return this.pokemonService.getTypePokemon(id)
  }

  _getTypeColour(type: string): any {
    return `#${TYPE_COLOURS[type]}`;
  }

  getEvolution() {
    this.pokemonService.getEspiciesPokemon(this.pokemons.name).subscribe((res:any) =>{
      const id = this.getId(res.evolution_chain.url);
        this.pokemonService.getEvolution(id).subscribe(res=>{
          this.getEvolves(res.chain)
        })
    })
  }

  getId(url: string): number {
    const splitUrl = url.split('/')
    // console.log(splitUrl[splitUrl.length - 2])
    return Number(splitUrl[splitUrl.length - 2]);
  }

  getEvolves(chain: any) {
    this.pokemon.evolutions.push({
      id: this.getId(chain.species.url),
      name: chain.species.name
    });
  
    if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
    }
  }

  goToDetail(pokemon){
    // this.router.navigate(['/pokemon/details', pokemon.id])
  }

  back(){
    this.router.navigate(['/pokemon/home'])
  }

}
