import base64
from functools import cached_property
from io import BytesIO

from postmark import PMMail
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from app.core.config import settings
from app.crosscutting.logging import get_logger
from app.domain.model.appointment import Appointment

logger = get_logger(__name__)


class EmailService:
    def __init__(self):
        self.api_key = settings.postmark_api_key
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
        logo_url = settings.public_logo_url
        html_content = self._appointment_confirmation_template.format(
            **{
                "logo_url": logo_url,
                "patient_full_name": appointment.patient_full_name,
                "medic_full_name": appointment.medic_full_name,
                "specialty": appointment.specialty,
                "day": appointment.day.strftime("%Y-%m-%d"),
                "hour": appointment.hour.strftime("%H:%M"),
            }
        )

        try:
            pdf_bytes = self.generate_pdf(appointment)
            encoded_pdf = base64.b64encode(pdf_bytes).decode()

            message = PMMail(
                api_key=self.api_key,
                sender=self.sender_email,
                to=to,
                subject=subject,
                html_body=html_content,
                attachments=[
                    ("confirmacion_cita.pdf", encoded_pdf, "application/pdf")
                ],
            )
            message.send()
        except Exception as e:
            logger.error(f"Error al enviar correo: {e}")

    @cached_property
    def _appointment_confirmation_template(self) -> str:
        import importlib.resources

        return importlib.resources.read_text(
            f"{__name__}.email", "appointment-confirmation.template.html"
        )


print(__name__)
