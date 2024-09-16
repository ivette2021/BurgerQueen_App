import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventType, Router, RoutesRecognized } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { UserOrderService } from 'src/app/services/user-order.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule, LoginComponent],
})
export class ToolbarComponent implements OnInit {

  public showBack: boolean;
  public showInfoUser: boolean;

  constructor(
    private router: Router,
    private navController: NavController,
    public userOrderService: UserOrderService
  ) {
    this.showBack = false;
    this.showInfoUser = false;
  }
  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event.type == EventType.RoutesRecognized)
    ).subscribe({
      next: (event: RoutesRecognized) => {
        this.showBack = event.state.root.firstChild.data['showBack'];
      }
    })
  }

  goBack() {
    this.navController.back();
  }

  logout(){

  }

  showPanelInfoUser(){
    this.showInfoUser = true;
  }

}
