import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedNotes } from './pinned-notes';

describe('PinnedNotes', () => {
  let component: PinnedNotes;
  let fixture: ComponentFixture<PinnedNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinnedNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinnedNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
