from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition
from app.domain.model.appointment import Appointment
from app.core.config import settings
from app.crosscutting.logging import get_logger
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import base64

logger = get_logger(__name__)

class EmailService:
    def __init__(self):
        self.api_key = settings.sendgrid_api_key
        self.sender_email = settings.email_sender

    def generate_pdf(self, appointment: Appointment) -> bytes:
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4
        y = height - 50

        p.setFont("Helvetica-Bold", 16)
        p.drawCentredString(width / 2, y, "Confirmación de Cita Médica")
        y -= 50

        p.setFont("Helvetica", 12)
        p.drawString(50, y, f"Paciente: {appointment.patient_full_name}")
        y -= 20
        p.drawString(50, y, f"Edad: {appointment.patient_age}")
        y -= 20
        p.drawString(50, y, f"Médico: Dr. {appointment.medic_full_name}")
        y -= 20
        p.drawString(50, y, f"Especialidad: {appointment.specialty}")
        y -= 20
        p.drawString(50, y, f"Fecha: {appointment.day}")
        y -= 20
        p.drawString(50, y, f"Hora: {appointment.hour.strftime('%H:%M')}")

        y -= 40
        p.setFont("Helvetica-Oblique", 10)
        p.drawString(50, y, "Por favor, acuda 10 minutos antes de su cita.")
        p.drawString(50, y - 15, "Gracias por confiar en Clínica MedicAI.")
        p.showPage()
        p.save()

        buffer.seek(0)
        return buffer.read()

    def sendConfirmationEmail(self, appointment: Appointment):
        subject = " Confirmación de Cita Médica"
        to = appointment.patient_email

        logo_url = "http://127.0.0.1:8000/static/logo/logo.JPG"  # Usa un logo en hosting público en producción

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }}
                .container {{
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 40px auto;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }}
                .header {{
                    text-align: center;
                    margin-bottom: 30px;
                }}
                .header img {{
                    width: 100px;
                }}
                .header h2 {{
                    color: #0b5ed7;
                }}
                .details {{
                    font-size: 16px;
                    color: #333;
                }}
                .details strong {{
                    color: #0b5ed7;
                }}
                .footer {{
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 30px;
                    border-top: 1px solid #ddd;
                    padding-top: 10px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="{logo_url}" alt="Logo Clínica" />
                    <h2>Confirmación de Cita Médica</h2>
                </div>
                <div class="details">
                    <p>Estimado/a <strong>{appointment.patient_full_name}</strong>,</p>
                    <p>Su cita ha sido registrada exitosamente con el Dr. <strong>{appointment.medic_full_name}</strong>, especialista en <strong>{appointment.specialty}</strong>.</p>
                    <p>
                        📅 <strong>Fecha:</strong> {appointment.day.strftime('%Y-%m-%d')}<br>
                        🕒 <strong>Hora:</strong> {appointment.hour.strftime('%H:%M')}
                    </p>
                    <p>Por favor, acuda 10 minutos antes de su cita.</p>
                    <p>Gracias por confiar en <strong>Clínica MedicAI</strong>.</p>
                    <p><strong>RECUERDA CANCELAR EN LA RECEPCIÓN O POR YAPE 92456812</strong>.</p>
                </div>
                <div class="footer">
                    Este correo fue generado automáticamente, por favor no responda a este mensaje.
                </div>
            </div>
        </body>
        </html>
        """

        try:
            message = Mail(
                from_email=self.sender_email,
                to_emails=to,
                subject=subject,
                html_content=html_content
            )

            # ➕ Adjuntar PDF
            pdf_bytes = self.generate_pdf(appointment)
            encoded_pdf = base64.b64encode(pdf_bytes).decode()

            attachment = Attachment(
                FileContent(encoded_pdf),
                FileName("confirmacion_cita.pdf"),
                FileType("application/pdf"),
                Disposition("attachment")
            )

            message.attachment = attachment

            sg = SendGridAPIClient(self.api_key)
            response = sg.send(message)
            logger.info(f"Correo enviado a {to}. Status Code: {response.status_code}")

        except Exception as e:
            logger.error(f"Error al enviar correo con SendGrid: {e}")
