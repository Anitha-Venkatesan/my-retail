import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('root', () => {
    it('should call getHello from App Service', () => {
      const getHelloSpy = jest
        .spyOn(appService, 'getHello')
        .mockReturnValue('test hello');
      const actual = appController.getHello();
      expect(getHelloSpy).toHaveBeenCalled();
      expect(actual).toEqual('test hello');
    });
  });
});
