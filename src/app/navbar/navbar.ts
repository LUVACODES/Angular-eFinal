import { Component } from '@angular/core';
import { BigTitle } from '../../shared/directives/big-title';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ RouterModule,BigTitle],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
