import { Test, TestingModule } from '@nestjs/testing';
import { ConexionLdapService } from './conexion-ldap.service';

describe('ConexionLdapService', () => {
  let service: ConexionLdapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConexionLdapService],
    }).compile();

    service = module.get<ConexionLdapService>(ConexionLdapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
