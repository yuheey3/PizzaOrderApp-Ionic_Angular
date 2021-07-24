import { Injectable } from '@angular/core';
import { Topping,Size, Pizza } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
  private toppings: Topping[] = [
    { id:'t1',
         title:'Vegetables',
         price: 1
     },
     {
       id: 't2',
     title:'Meatballs',
     price:2
     },
     { id:'t3',
         title:'Peperony',
         price:1.5
     },
     {
       id: 't4',
     title:'Mushrooms',
     price:2.5
     }
   ];

   private sizes: Size[] = [
    { id:'t1',
         title:'Large',
         price:1
     },
     {
       id: 't2',
     title:'Medium',
     price:1.5
     },
     { id:'t3',
         title:'Small',
         price:2
     },
     {
       id: 't4',
     title:'Party',
     price:2.5
     }
   ];

   private pizzas: Pizza[] = [
     {
       id:'p1',
       qty:0,
       topping:'initial',
       size: 'initial',
       total:0
     }
   ];

   private pizza: Pizza = {
    id:'p1',
    qty:0,
    topping:'initial',
    size: 'initial',
    total:0
   }


   getAllPizzas() {
    return [...this.pizzas];
  }

  getPizza() {
    return this.pizza;
  }
   getAllToppings() {
     return [...this.toppings];
   }

   getTopping(toppingId){
     return {...this.toppings.find(
       topping => { return topping.id === toppingId; }
       )
     }
   }

   getToppingByName(toppingName){
    return {...this.toppings.find(
      topping => { return topping.title === toppingName; }
      )
    }
  }

   getAllSizes() {
    return [...this.sizes];
  }

  getSize(sizeId){
    return {...this.sizes.find(
      size => { return size.id === sizeId; }
      )
    }
  }

  getSizeByName(sizeName){
    return {...this.sizes.find(
      size => { return size.title === sizeName; }
      )
    }
  }
}






  