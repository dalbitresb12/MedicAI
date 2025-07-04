# constants.py
APP_NAME = "Clinica MedicalIA"
TITLE = "MedicalIA API"
DESCRIPTION = """
¡Bienvenido a la documentación de la API REST de la Clinica MedicalIA!


### Autenticación
Actualmente, esta API si requiere autenticación para proteger los puntos finales con mecanismos de autorización, aunque falta la correcta implementacion de la habilitacion por correo.

### Manejo de errores
La API proporciona mensajes de error significativos y códigos de estado HTTP para ayudarlo a comprender qué salió mal. Los códigos de estado comunes incluyen:
- **200 OK**: la solicitud fue exitosa.
- **201 Creado**: Se creó un nuevo recurso correctamente.
- **400 Solicitud incorrecta**: La solicitud no era válida o no se pudo atender de otra manera.
- **404 No encontrado**: No se pudo encontrar el recurso solicitado.
- **422 Entidad no procesable**: La solicitud estaba bien formada, pero no se pudo seguir debido a errores semánticos, como errores de validación en el cuerpo de la solicitud.
- **500 Error interno del servidor**: Se produjo un error en el servidor.

Explore los puntos finales a continuación para ver cómo puede integrar nuestra API en su aplicación. ¡Que disfrute codificando!
"""
CONTACT = {
    "name": "Anderson Velasquez",
    "url": "https://www.linkedin.com/in/johan-huanca-nina-a76a2b204",
    "email": "andersonvelezca@gmail.com",
}
LICENSE_INFO = {
    "name": "MIT",
    "url": "https://opensource.org/licenses/MIT",
}
SWAGGER_UI_PARAMETERS = {"syntaxHighlight.theme": "obsidian"}
SWAGGER_FAVICON_URL = "https://example.com/your-favicon.ico" 