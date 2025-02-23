import { Test, TestingModule } from '@nestjs/testing';
import { PerfilesModulosService } from './perfiles_modulos.service';

describe('PerfilesModulosService', () => {
  let service: PerfilesModulosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilesModulosService],
    }).compile();

    service = module.get<PerfilesModulosService>(PerfilesModulosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
