import { DateTime } from 'luxon'

const fechaLimite = DateTime.fromISO('2026-04-04T16:15:42')

const actualizarCuenta = () => {
    const ahora = DateTime.now()

    const diferencia = fechaLimite.diff(ahora, [
        'days',
        'hours',
        'minutes',
        'seconds',
    ]);

    const { days, hours, minutes, seconds } = diferencia.toObject();
    console.log(`${days} días y ${hours}:${minutes}:${Math.floor(seconds)}`);
};

setInterval(actualizarCuenta, 1000);