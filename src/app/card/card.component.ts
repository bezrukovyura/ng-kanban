import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() text: string;
  @Input() date: string;
  @Input() state: string;

  myArray;

  onRemoveCard() {
    // add next to subject
    // this.cadrListService.state.next
  }

}
