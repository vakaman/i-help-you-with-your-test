import { describe, it, expect } from 'vitest';
import { generators } from '../../utils/generators.js';

describe('Data Generators', () => {
  describe('CPF', () => {
    it('generates a valid formatted CPF', () => {
      const cpf = generators.cpf({ valid: true, formatted: true });
      expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    });

    it('generates an unformatted CPF', () => {
      const cpf = generators.cpf({ formatted: false });
      expect(cpf).toMatch(/^\d{11}$/);
    });
  });

  describe('CNPJ', () => {
    it('generates a valid formatted CNPJ', () => {
      const cnpj = generators.cnpj({ valid: true, formatted: true });
      expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
    });
  });

  describe('Name', () => {
    it('generates a full name', () => {
      const name = generators.name();
      expect(name.split(' ').length).toBeGreaterThanOrEqual(2);
    });

    it('generates a partial name', () => {
      const name = generators.name({ variant: 'half' });
      expect(name.split(' ').length).toBe(1);
    });
  });

  describe('Phone', () => {
    it('generates a valid E.164 phone', () => {
      const phone = generators.phone();
      expect(phone).toMatch(/^\+55\d{11}$/);
    });
  });
});
