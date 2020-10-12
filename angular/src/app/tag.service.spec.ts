import { TestBed } from '@angular/core/testing';

import { TagService } from './shared/services/tag.service';

describe('TagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagService = TestBed.get(TagService);
    expect(service).toBeTruthy();
  });
});
