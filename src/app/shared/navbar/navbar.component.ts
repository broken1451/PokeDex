import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public termino!: string;
  @Input() showInput: boolean = true;
  @Output() terminoEmit: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  searchPokemon(termino: string) {
    if (termino == '') {
      this.termino = termino;
      this.terminoEmit.emit(this.termino.toLowerCase());
      return;
    } else {
      this.termino = termino;
      this.terminoEmit.emit(this.termino.toLowerCase());
    }
  }
}
