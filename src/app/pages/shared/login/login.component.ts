import { ToastService } from 'src/src/app/services/toast.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user';
import { Login } from 'src/app/state/auth/state/auth.actions';
import { AuthState } from 'src/app/state/auth/state/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule, FormsModule,TranslateModule]
})
export class LoginComponent  {
  @Input() showback:boolean = true;

  @Output() newAccount: EventEmitter<boolean>;
  @Output() back: EventEmitter<boolean>;
  @Output() doLogin: EventEmitter<boolean>;
   
  public user:User;

  constructor(
    private store : Store,
    private toastService:ToastService,
    private translate: TranslateService
  ) {
    this.user = new User();
    this.newAccount = new EventEmitter<boolean>();
    this.back = new EventEmitter<boolean>();
    this.doLogin = new EventEmitter<boolean>();
     }

login(){
this.store.dispatch(new Login({
  email: this.user.email,
  password:this.user.password
})).subscribe({
  next:() => {
    const success = this.store.selectSnapshot(AuthState.success);
    if (success) {
      
    }else{

    }
  }
})
}
exit(){
 this.back.emit(true) 
}
createNewAccount(){
  this.newAccount.emit(true);
}
}
