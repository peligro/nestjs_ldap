import { Test, TestingModule } from '@nestjs/testing';
import { PerfilesModulosController } from './perfiles_modulos.controller';

describe('PerfilesModulosController', () => {
  let controller: PerfilesModulosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilesModulosController],
    }).compile();

    controller = module.get<PerfilesModulosController>(PerfilesModulosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
