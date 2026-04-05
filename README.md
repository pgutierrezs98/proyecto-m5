# TaskFlow

TaskFlow es una aplicación web simple para gestionar tareas personales. Permite crear, listar, actualizar y eliminar tareas, con funcionalidades adicionales como cuenta regresiva para fechas límite, integración con geolocalización y clima, y persistencia de datos en localStorage.

## Características

- **Gestión de Tareas**: Crear, editar estado (pendiente/completada), eliminar tareas.
- **Cuenta Regresiva**: Muestra el tiempo restante hasta la fecha límite de cada tarea.
- **Geolocalización y Clima**: Obtiene la ubicación del usuario y muestra el clima actual en la barra superior.
- **Persistencia**: Las tareas se guardan en localStorage del navegador.
- **Interfaz Responsiva**: Usa Bootstrap para una experiencia de usuario moderna y adaptable.
- **Manejo de Fechas**: Utiliza Luxon para manipulación avanzada de fechas.

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6 Modules)
- **Framework CSS**: Bootstrap 5.3.8
- **Librerías JavaScript**:
  - Luxon (para manejo de fechas)
- **APIs**:
  - Geolocation API (navegador)
  - OpenWeatherMap API (para datos de clima)
- **Almacenamiento**: localStorage

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/taskflow.git
   cd taskflow
   ```

2. Instala las dependencias (si usas un gestor de paquetes, aunque este proyecto no requiere Node.js para ejecutar):
   ```bash
   npm install
   ```
   Nota: Este proyecto es puro frontend, por lo que no requiere servidor. Solo abre `index.html` en un navegador.

3. Obtén una API Key de OpenWeatherMap:
   - Regístrate en [OpenWeatherMap](https://openweathermap.org/api).
   - Reemplaza `API_KEY` en `assets/js/api/Weather.js` con tu clave.

4. Abre `index.html` en tu navegador preferido.

## Uso

1. **Crear Tarea**: Ingresa una descripción y opcionalmente una fecha límite en el formulario.
2. **Ver Tareas**: Las tareas se listan en la sección derecha, con cuenta regresiva y botones para eliminar o cambiar estado.
3. **Clima**: La barra superior muestra el clima basado en tu ubicación (requiere permisos de geolocalización).
4. **Persistencia**: Las tareas se guardan automáticamente en localStorage.

## Estructura del Proyecto

```
taskflow/
├── index.html                 # Archivo principal HTML
├── package.json               # Configuración de dependencias (opcional para frontend puro)
├── README.md                  # Este archivo
└── assets/
    └── js/
        ├── fechas-luxon.js    # Ejemplo de uso de Luxon para fechas
        ├── script.js          # Lógica principal de la aplicación
        ├── api/
        │   ├── Geolocalization.js  # Manejo de geolocalización
        │   └── Weather.js          # Integración con API de clima
        └── classes/
            ├── GestorTareas.js     # Clase para gestionar tareas
            └── Tarea.js            # Clase Tarea
```

## Contribución

Si deseas contribuir:
1. Haz un fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Notas Adicionales

- Asegúrate de permitir la geolocalización en tu navegador para la funcionalidad de clima.
- La aplicación funciona offline una vez cargada, gracias a localStorage.
- Para desarrollo, puedes usar un servidor local simple como `python -m http.server` o Live Server en VS Code.