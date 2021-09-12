import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesDownloadLinksComponent } from './articles-download-links.component';

describe('ArticlesDownloadLinksComponent', () => {
  let component: ArticlesDownloadLinksComponent;
  let fixture: ComponentFixture<ArticlesDownloadLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesDownloadLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesDownloadLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
