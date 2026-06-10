from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def create_resume_pdf(content, filename):

    pdf = canvas.Canvas(
        filename,
        pagesize=letter
    )

    y = 750

    for line in content.split("\n"):

        pdf.drawString(
            40,
            y,
            line[:100]
        )

        y -= 20

        if y < 50:

            pdf.showPage()

            y = 750

    pdf.save()