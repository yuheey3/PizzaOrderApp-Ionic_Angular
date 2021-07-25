import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CurrentService } from '../current/current.service';
import { History } from '../current/current.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  allHistoryList: History[];
 

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private currentService: CurrentService, public alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

    this.allHistoryList = this.currentService.getAllHistory();
    this.allHistoryList.shift();

    })
  }
}

