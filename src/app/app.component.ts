import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Ashu', 'Kumar'];
  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray ([])
    })
    this.signupForm.patchValue({
      'userData' : {
        'email' : 'sushma2@gmail.com'
      },
      'hobbies' : []
    })
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control : FormControl) : {[s : string] : boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden' : true};
    }
    //should not pass 
    // return {'nameIsForbidden' : false};
    return null;
  }

  forbiddenEmails(control : FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any> ((res, rej) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          res({'emailIsForbidden' : true})
        }
        else{
          res(null);
        }
      } , 2222);
    });
    return promise;
  }
}
