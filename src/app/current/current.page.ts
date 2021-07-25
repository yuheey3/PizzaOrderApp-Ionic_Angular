import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';
import { Pizza } from '../home/home.model';

@Component({
  selector: 'app-current',
  templateUrl: './current.page.html',
  styleUrls: ['./current.page.scss'],
})
export class CurrentPage implements OnInit {
  allPizzalist : Pizza[];
  totalQty: number;
  totalPrice: number;

  constructor(private activatedRoute: ActivatedRoute, private homesService: HomeService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      //const recipeID = paramMap.get('recipeId');
      this.allPizzalist = this.homesService.getAllPizzas();
      this.allPizzalist.shift();
    
      this.totalQty = 0;
      this.totalPrice = 0;

      for (let x = 0; x < this.allPizzalist.length; x++) {
        this.totalQty += this.allPizzalist[x].qty; 
        this.totalPrice += this.allPizzalist[x].total;
    }
    })
  }

}

