import { Component, OnInit, OnDestroy } from '@angular/core';
import { CadrListService, Card } from '../cadr-list.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private cadrListService: CadrListService, private http: HttpClient) { }

  sub = new Subscription();
  title = 'kanban';

  ngOnInit() {
    this.cadrListService.get().subscribe(res => {
      this.data = res;
      this.refreshData();
    });
    
    this.sub.add(this.cadrListService.state.subscribe(state => {
      if (state.action === 'addCard') {
        this.data.push(state.card);
        this.refreshData();
      }

      if (state.action === 'removeCard') {
        this.data = this.data.filter(card => card.id !== state.card.id);
        this.refreshData();
      }

      if (state.action === 'updateCard') {
        let card = this.data.find(card => card.id !== state.card.id);
        card.state = state.card.state;
        card.text = state.card.text;
        this.refreshData();
      }

    }));

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  data: Card[] = [];

  _new = [];
  _progress = [];
  _done = [];

  refreshData() {
    this._new = this.data.filter(x => x.state === 'new');
    this._progress = this.data.filter(x => x.state === 'progress');
    this._done = this.data.filter(x => x.state === 'done');;
  }

}
