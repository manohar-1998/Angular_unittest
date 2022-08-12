import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer } from 'rxjs';
import { HomeService } from './home.service';

describe('Home Service', () => {
  let homeService: HomeService;
  let httpClientSpy: { get: jasmine.Spy };
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    homeService = TestBed.inject(HomeService);
  });

  it('is created', () => {
    expect(homeService).toBeDefined();
  });

//   Use of fakeAsync in test cases, ui methods will execute before actual calls, so we have to use some operators in jasmine to test   as expected

  it('call getCities()', fakeAsync(() => {
    const testData = [
      {
        name: 'trulli',
        image: 'pic_trulli.jpg',
        alt: 'Italian Trulli',
      },
      {
        name: 'chania',
        image: 'img_chania.jpg',
        alt: 'Chania',
      },
    ];

    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(testData)));

    homeService.getCities().then((data) => {
      expect(data).toEqual(testData);
    });
    // Tick will be used if we use fakeAsync
    tick(); 
  }));

});