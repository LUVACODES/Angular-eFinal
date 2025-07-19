import { Component } from '@angular/core';
import { BigTitle } from '../../shared/directives/big-title';

@Component({
  selector: 'app-toolbar',
  imports: [BigTitle],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {

}
