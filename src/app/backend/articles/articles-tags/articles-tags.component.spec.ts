import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTagsComponent } from './articles-tags.component';

describe('ArticlesTagsComponent', () => {
  let component: ArticlesTagsComponent;
  let fixture: ComponentFixture<ArticlesTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
