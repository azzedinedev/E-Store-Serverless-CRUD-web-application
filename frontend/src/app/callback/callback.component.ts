import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-callback',
  template: `
  <p>
    Loading...
  </p>
`,
styles: []

})
export class CallbackComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.handleAuthentication();
  
  }

}
