import sys
try:
    import pypdf
    print("pypdf available")
except ImportError:
    print("pypdf NOT available")

try:
    import fitz # PyMuPDF
    print("pymupdf available")
except ImportError:
    print("pymupdf NOT available")

try:
    import pdfminer
    print("pdfminer available")
except ImportError:
    print("pdfminer NOT available")
