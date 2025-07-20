import { Component, EventEmitter, Output } from '@angular/core';
import { BigTitle } from '../../shared/directives/big-title';

@Component({
  selector: 'app-navbar',
  imports: [BigTitle],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  @Output() activeSection= new EventEmitter<string>();

  navigate(section: string) {
    this.activeSection.emit(section);
  }
}
