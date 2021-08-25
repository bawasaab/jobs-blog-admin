import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-backend-sidebar',
  templateUrl: './backend-sidebar.component.html',
  styleUrls: ['./backend-sidebar.component.css']
})
export class BackendSidebarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
      
    Swal.fire({
        title: 'Are you sure to Sign Out?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `YES`,
        denyButtonText: `NO`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Sign out successfull!', '', 'success');
            this.router.navigateByUrl(`/`);
        } else if (result.isDenied) {
          Swal.fire('Sign out denied!', '', 'info');
        }
      })
  }

}
