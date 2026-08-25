<?php
header("Access-Control-Allow-Origin: *"); // Permitir acceso desde FlutterFlow
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

// Asegura que existan los campos (con fallback vacío)
$nombre = $data['nombre'] ?? '';
$numero = $data['numero'] ?? '';
$correo = $data['correo'] ?? '';
$mensaje = $data['mensaje'] ?? '';

// Configura los datos del correo
$destino = "once11.cl@gmail.com"; // Reemplaza con el correo que creaste en cPanel
$asunto = "Nuevo mensaje del formulario WEB";

// Cuerpo del mensaje
$contenido = "Nombre: $nombre\n";
$contenido .= "Número: $numero\n";
$contenido .= "Correo: $correo\n";
$contenido .= "Mensaje:\n$mensaje\n";

// Encabezados
$headers = "From: 11ONCE WEB once11.cl@gmail.com\r\n"; // El nombre que quieres mostrar y tu correo creado en cPanel
$headers .= "Reply-To: $correo\r\n"; // Para que al responder vaya al correo del usuario
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Enviar el correo
if (mail($destino, $asunto, $contenido, $headers)) {
    echo "Ok";
} else {
    http_response_code(500);
    echo "Error al enviar el mensaje.";
}
?>
