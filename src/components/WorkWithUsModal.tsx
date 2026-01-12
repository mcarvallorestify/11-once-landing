import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface WorkWithUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkWithUsModal = ({ open, onOpenChange }: WorkWithUsModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validatePDF = (file: File): boolean => {
    return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!validatePDF(selectedFile)) {
      toast({
        title: "Archivo no válido",
        description: "Por favor, selecciona solo archivos PDF.",
        variant: "destructive",
      });
      return;
    }
    setFile(selectedFile);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileSelect(selectedFile);
      }
    },
    [handleFileSelect]
  );

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "Archivo requerido",
        description: "Por favor, selecciona un archivo PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Subir el PDF a la API
      const formData = new FormData();
      formData.append("pdf", file);

      const uploadResponse = await fetch("https://pdv.restify.cl/media/subirpdf.php", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Error al subir el archivo PDF");
      }

      const uploadResult = await uploadResponse.text();
      
      // La API debería retornar la URL del PDF
      // Si retorna JSON, parsearlo, si no, usar el texto directamente
      let pdfUrl: string;
      try {
        const jsonResult = JSON.parse(uploadResult);
        pdfUrl = jsonResult.url || jsonResult.url_pdf || jsonResult.data?.url || uploadResult;
      } catch {
        pdfUrl = uploadResult.trim();
      }

      // Validar que tenemos una URL válida
      if (!pdfUrl || pdfUrl.length === 0) {
        throw new Error("No se recibió una URL válida del servidor");
      }

      // Enviar la URL por correo usando el mismo formato que el formulario de contacto
      const emailResponse = await fetch("https://11once.cl/correos/enviar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: "Solicitud de Trabajo - Nuevo Currículum",
          correo: "noreply@11once.cl",
          numero: "",
          mensaje: `Se ha recibido un nuevo currículum para trabajar con nosotros.\n\nURL del PDF: ${pdfUrl}`,
        }),
      });

      const emailResult = await emailResponse.text();

      if (emailResponse.ok && emailResult.trim() === "Ok") {
        toast({
          title: "¡Currículum enviado!",
          description: "Gracias por tu interés. Revisaremos tu solicitud pronto.",
        });
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onOpenChange(false);
      } else {
        throw new Error("Error al enviar el correo");
      }
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      toast({
        title: "Error al enviar",
        description: "No se pudo procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Trabaja con nosotros</DialogTitle>
          <DialogDescription>
            Sube tu currículum en formato PDF para que podamos conocerte mejor.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Zona de arrastrar y soltar */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors
              ${isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}
              ${file ? "border-primary bg-primary/5" : ""}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
            {file ? (
              <div className="space-y-2">
                <FileText className="w-12 h-12 mx-auto text-primary" />
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="mt-2"
                >
                  <X className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Arrastra tu PDF aquí o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Solo archivos PDF
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Botón de enviar */}
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!file || isUploading}
            className="w-full"
            variant="default"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Currículum
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkWithUsModal;

