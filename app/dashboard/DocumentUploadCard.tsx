import { CheckCircle2, FileText, Loader2, Trash2, Upload } from "lucide-react";

type Props = {
  title: string;
  description: string;
  fileName?: string | null;
  selectedFile?: File | null;
  isUploading?: boolean;
  isUploaded?: boolean;
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
  onRemove: () => void;
};

export default function DocumentUploadCard({
  title,
  description,
  fileName,
  selectedFile,
  isUploading = false,
  isUploaded = false,
  onFileChange,
  onUpload,
  onRemove,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#e6e0dd] bg-white p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff5f3] text-[#cf392d]">
          <FileText size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold text-[#222]">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#777]">
                {description}
              </p>
            </div>
            {isUploaded && (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                <CheckCircle2 size={14} /> Uploaded
              </span>
            )}
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-[#d8d1ce] bg-[#faf9f8] p-4">
            {fileName ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText size={18} className="shrink-0 text-[#777]" />
                  <span className="truncate text-sm font-medium text-[#333]">
                    {fileName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onRemove}
                  disabled={isUploading}
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#cf392d] hover:underline disabled:opacity-50"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center py-5 text-center">
                <Upload size={22} className="text-[#999]" />
                <span className="mt-2 text-sm font-semibold text-[#444]">
                  Choose a file
                </span>
                <span className="mt-1 text-xs text-[#999]">
                  PDF, JPG or PNG · Maximum 10MB
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  className="sr-only"
                  onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                  disabled={isUploading}
                />
              </label>
            )}
          </div>

          {selectedFile && (
            <button
              type="button"
              onClick={onUpload}
              disabled={isUploading}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#cf392d] px-5 text-sm font-bold text-white hover:bg-[#b92e24] disabled:opacity-60"
            >
              {isUploading ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={17} /> Upload {title}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
