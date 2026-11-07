// Operaciones del personal (gestor / administrador). Los permisos los valida la API.
import { peticion } from './apiClient';
import { actualizarCacheUsuario } from './offlineDb';
import { leerConCache, validarSesion } from './zonasService';

export const obtenerTodasLasReservas = (usuarioId) => (
  leerConCache(usuarioId, 'reservas_gestion', () => peticion('GET', '/reservas'))
);

export const eliminarReserva = async (usuarioId, reservaId) => {
  validarSesion(usuarioId);
  const respuesta = await peticion('DELETE', `/reservas/${encodeURIComponent(reservaId)}`);
  validarSesion(usuarioId);

  try {
    await actualizarCacheUsuario(usuarioId, 'reservas_gestion', (reservas) => {
      if (!Array.isArray(reservas)) {
        throw new Error('La caché de reservas de gestión tiene un formato inválido.');
      }
      return reservas.filter((reserva) => reserva.id !== reservaId);
    });
  } catch (error) {
    console.error('La reserva se eliminó en el servidor, pero no se pudo actualizar la caché:', error);
    const cacheError = new Error(
      'La reserva se eliminó, pero no se pudo actualizar la caché local. Vuelve a cargar la lista.'
    );
    cacheError.serverConfirmed = true;
    throw cacheError;
  }

  return respuesta;
};

export const obtenerUsuarios = (usuarioId) => (
  leerConCache(usuarioId, 'usuarios', () => peticion('GET', '/usuarios'))
);

export const cambiarRolUsuario = async (usuarioId, uidObjetivo, rol) => {
  validarSesion(usuarioId);
  return peticion('PATCH', `/usuarios/${encodeURIComponent(uidObjetivo)}/rol`, { cuerpo: { rol } });
};

export const actualizarUsuario = async (usuarioId, uidObjetivo, cambios) => {
  validarSesion(usuarioId);
  return peticion('PATCH', `/usuarios/${encodeURIComponent(uidObjetivo)}`, { cuerpo: cambios });
};

export const eliminarUsuario = async (usuarioId, uidObjetivo) => {
  validarSesion(usuarioId);
  return peticion('DELETE', `/usuarios/${encodeURIComponent(uidObjetivo)}`);
};
