export const DESFASE_UTC_COLOMBIA_HORAS = -5;

const MILISEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

export const obtenerOpcionesFechaNegocio = (ahora = new Date()) => {
  const fechaNegocio = new Date(
    ahora.getTime() + DESFASE_UTC_COLOMBIA_HORAS * 60 * 60 * 1000
  );
  const inicioDiaUtc = Date.UTC(
    fechaNegocio.getUTCFullYear(),
    fechaNegocio.getUTCMonth(),
    fechaNegocio.getUTCDate()
  );

  return Array.from({ length: 10 }, (_, indice) => {
    const fecha = new Date(inicioDiaUtc + indice * MILISEGUNDOS_POR_DIA);
    const valor = [
      fecha.getUTCFullYear(),
      String(fecha.getUTCMonth() + 1).padStart(2, '0'),
      String(fecha.getUTCDate()).padStart(2, '0'),
    ].join('-');

    return {
      valor,
      etiqueta: new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(fecha),
    };
  });
};
