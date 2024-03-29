import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOfComponentsComponent } from './group-of-components.component';

describe('GroupOfComponentsComponent', () => {
  let component: GroupOfComponentsComponent;
  let fixture: ComponentFixture<GroupOfComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupOfComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupOfComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
