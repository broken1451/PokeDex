import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public termino: string = ''
  @Output() terminoEmit: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  searchPokemon(termino: string){
    this.termino = termino;
    this.terminoEmit.emit(this.termino)
    // console.log(document.querySelector('input[type=search]'))
  }

}
