import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GambleTableComponent } from './gamble-table.component';

describe('GambleTableComponent', () => {
  let component: GambleTableComponent;
  let fixture: ComponentFixture<GambleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GambleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GambleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
