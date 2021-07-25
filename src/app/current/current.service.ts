import { Injectable } from '@angular/core';
import { History } from './current.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {

  private history: History = 
    {    id:'h1',
         qty:1,
         total: 1,
        // date: new Date("Fri Dec 08 2020 07:44:57"),
        date:'d'
     }
   ;

   private histories: History[] = [
    {    id:'h1',
         qty:1,
         total: 1,
         //date: new Date("Fri Dec 08 2020 07:44:57"),
         date:'d'
     }
   ];

   


   getAllHistory() {
    return [...this.histories];
  }
  getHistory(){
    return this.history;
  }
  pushHistory(h: History){
    this.histories.push(h);
  }
}
