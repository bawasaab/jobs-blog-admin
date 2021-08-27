import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-articles-master',
    templateUrl: './articles-master.component.html',
    styleUrls: ['./articles-master.component.css']
})
export class ArticlesMasterComponent implements OnInit {

    loginForm!: FormGroup;
    submitted = false;


    constructor(
        private formBuilder: FormBuilder,
    ) { }


    ngOnInit(): void {

        

        this.loginForm = this.formBuilder.group({
			description: ['', [Validators.required]],
		});
        
    }

    // convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		let in_data = this.loginForm.value;
		console.log('in_data.description', in_data.description);
  
		// stop here if form is invalid
		if (this.loginForm.invalid) {
		  return;
		}
	}

}
