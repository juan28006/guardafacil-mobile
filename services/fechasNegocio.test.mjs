import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DESFASE_UTC_COLOMBIA_HORAS, obtenerOpcionesFechaNegocio } from './fechasNegocio.js';

describe('fechas del negocio en hora de Colombia', () => {
  it('usa el desfase UTC-5 para determinar el día actual', () => {
    assert.equal(DESFASE_UTC_COLOMBIA_HORAS, -5);
    assert.equal(
      obtenerOpcionesFechaNegocio(new Date('2026-11-06T04:30:00Z'))[0].valor,
      '2026-11-05'
    );
    assert.equal(
      obtenerOpcionesFechaNegocio(new Date('2026-11-06T05:30:00Z'))[0].valor,
      '2026-11-06'
    );
  });

  it('ofrece diez fechas consecutivas y las etiqueta en el día del negocio', () => {
    const opciones = obtenerOpcionesFechaNegocio(new Date('2026-12-31T12:00:00Z'));

    assert.equal(opciones.length, 10);
    assert.deepEqual(
      opciones.slice(0, 3).map((opcion) => opcion.valor),
      ['2026-12-31', '2027-01-01', '2027-01-02']
    );
    assert.equal(opciones[0].etiqueta, '31/12/2026');
  });
});
