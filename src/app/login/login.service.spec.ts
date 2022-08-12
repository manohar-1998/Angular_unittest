import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('Login Service', () => {
  let loginService: LoginService;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  beforeEach(() => {
    // configureTestingModule is  Same as Angular NG Module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });
    loginService = TestBed.inject(LoginService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

//   Used to check there are no pending requests present after each testcases.
  afterEach(() => {
    httpController.verify();
  });

  it('Login Service is created', () => {
    expect(loginService).toBeDefined();
  });

  it('calling login()', () => {
    const testData = true;
    const inputData = {
      username: 'admin',
      password: 'admin',
    };

    loginService
      .login(inputData)
      .then((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne('login');

    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('call login() failed', () => {
    const emsg = 'status 500 error';
    const inputData = {
      username: 'admin',
      password: 'admin',
    };

    loginService.login(inputData).then(
        // Success Callback used for Force failing in jasmine
      () => fail('should have failed with the 500 error'),
        // Error callback
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpController.expectOne('login');

    expect(req.request.method).toEqual('POST');

    req.flush(emsg, { status: 500, statusText: 'Server Error' });
  });
});