import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-content',
  templateUrl: './articles-content.component.html',
  styleUrls: ['./articles-content.component.css']
})
export class ArticlesContentComponent implements OnInit {

    config!: object;

  constructor() { }

  ngOnInit(): void {
    this.config = {
        height: 500,
        // toolbar: true,
        // toolbar: 'undo redo | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect | bullist numlist | outdent indent',
        toolbar: [
            'code | undo redo | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect | bullist numlist | outdent indent | bold italic underline strikethrough | forecolor backcolor | superscript subscript | removeformat | h1 h2 h3 | indent outdent | link image emoticons charmap hr | print preview media fullpage | fullscreen',
        ],
        
        // menubar: true,
        // menubar: [
        // 	'favs file edit view insert format tools table help'
        // ],

        quickbars_insert_toolbar: true,
        // image_advtab: true,
        // paste_data_images: true,
        // automatic_uploads: false,
        // quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
        // block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre',
        // contextmenu: 'link image table',

        // plugins: `print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons`,
        plugins: [
            'code',
            'print',
            'preview',
            'importcss',
            'searchreplace',
            'autolink',
            'autosave',
            'save',
            'directionality',
            'visualblocks',
            'visualchars',
            'fullscreen',
            'image',
            'link',
            'media',
            'template',
            'codesample',
            'table',
            'charmap',
            'hr',
            'pagebreak',
            'nonbreaking',
            'anchor',
            'toc',
            'insertdatetime',
            'advlist',
            'lists',
            'wordcount',
            'imagetools',
            'textpattern',
            'noneditable',
            'help',
            'charmap',
            'quickbars',
            'emoticons',
            'fullscreen'
        ],

        mobile: {
            // plugins: `print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media  template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons`
            plugins: [
                'print',
                'preview',
                'importcss',
                'searchreplace',
                'autolink',
                'autosave',
                'save',
                'directionality',
                'visualblocks',
                'visualchars',
                'fullscreen',
                'image',
                'link',
                'media',
                'template',
                'codesample',
                'table',
                'charmap',
                'hr',
                'pagebreak',
                'nonbreaking',
                'anchor',
                'toc',
                'insertdatetime',
                'advlist',
                'lists',
                'wordcount',
                'textpattern',
                'noneditable',
                'help',
                'charmap',
                'quickbars',
                'emoticons',
                'imagetools',
                'fullscreen'
            ]
        },
    };
  }

}
