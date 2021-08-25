import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'jobs-blog-admin';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.router.events.subscribe((event) => {

            if (event instanceof NavigationStart) {
                console.log('event.url', event.url);
                let body = document.getElementsByTagName('body')[0];
                if( event.url == '/login' ) {
                    body.classList.add("login-page");   //add the class
                } else {
                    body.classList.remove("login-page");   //remove the class
                }
            }
        });
    }

    ngOnInit(): void {
    }
}
