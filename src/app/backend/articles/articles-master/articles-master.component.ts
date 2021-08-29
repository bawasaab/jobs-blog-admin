import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../../services/article.service";
import Swal from 'sweetalert2';
import { ConstantService } from '../../../services/constant.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from "../../../interfaces/article";

@Component({
    selector: 'app-articles-master',
    templateUrl: './articles-master.component.html',
    styleUrls: ['./articles-master.component.css']
})
export class ArticlesMasterComponent implements OnInit {   

    constructor() {}

    ngOnInit(): void {}
}
