import { Component, Input } from '@angular/core';
import { IActor, IValidation } from '../../models/service_models';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
  @Input() actor: IValidation | undefined;
}
