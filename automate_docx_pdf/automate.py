import warnings
warnings.filterwarnings("ignore", category=UserWarning)

from docxtpl import DocxTemplate
from PyPDF2 import PdfMerger
import docx2pdf
import os


def generate_docx():
    for name in NAMES:
        context = eval("{" + CONTEXT + "}")
        context["name"] = name
        filename_docx = f"output/docx/{name}.docx"
        doc.render(context)
        doc.save(filename_docx)
        print(f"✴️  DOCX saved: {name}")

def convert_pdf():
    docx2pdf.convert("output/docx", "output/pdf")
    print("✅ All DOCX files in 'output/docx' folder converted to PDF folder!")


def merge_pdfs():
    merger = PdfMerger()
    pdf_files = sorted(os.listdir("output/pdf"))
    for file in pdf_files:
        if file.endswith(".pdf"):
            filepath = os.path.join("output/pdf", file)
            merger.append(filepath)
            print(f"✴️  Added to merge: {file}")
    output_path = "output/merged/merged_output.pdf"
    merger.write(output_path)
    merger.close()
    print(f"✅ Merged PDF saved as: {output_path}")

if __name__ == "__main__":
    file = open("config.txt", "r").read().split("<cut>")
    TEMPLATE = file[0].strip()
    CONTEXT = file[1].strip()
    NAMES = file[2].strip().splitlines()
    doc = DocxTemplate(f"templates/{TEMPLATE}")
    os.makedirs("output/docx", exist_ok=True)
    os.makedirs("output/pdf", exist_ok=True)
    os.makedirs("output/merged", exist_ok=True)
    generate_docx()
    convert_pdf()
    merge_pdfs()
    print("✅ All Task Completed!")
