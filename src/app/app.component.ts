import { IGreeting } from './blocks/interfaces/IGreeting';
import { GreetingsService } from './blocks/services/greetings.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  greetings: IGreeting[] = []
  message: FormControl = new FormControl('')

  constructor(
    private _greetingsService: GreetingsService,
    private _matSnackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {

    this.loadGreetings()
  }

  addGreeting() {

    let msg = this.message.value
    this._greetingsService
      .createGreeting(msg)
      .then(({ data }) => {

        if (data && data.addGreeting) {
          this._matSnackBar.open('Greeting deleted.', 'CLOSE', { duration: 4000 });
          this.message.setValue("")
        }
      })
  }

  loadGreetings() {

    this._greetingsService
      .getGreetings()
      .subscribe(({ data, loading }) => {
        if (data && data.greetings) {
          this.greetings = data.greetings
        }
      })
  }

  deleteGreeting(id) {
    this._greetingsService
      .deleteGreeting(id)
      .then(({ data }) => {

        if (data && data.deleteGreeting)
          this._matSnackBar.open('Greeting deleted.', 'CLOSE', { duration: 4000 });
        else
          this._matSnackBar.open('An error occurred', 'CLOSE', { duration: 4000, });
      })
  }
}
