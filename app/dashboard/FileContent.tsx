"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import DocumentUploadCard from "./DocumentUploadCard";

const BUCKET = "applicant-documents";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

type DocumentType = "passport" | "national-id";

type DocumentState = {
  fileName: string | null;
  selectedFile: File | null;
  isUploading: boolean;
  error: string;
};

type Props = {
  onProfileStatusChange?: (complete: boolean) => void;
};

const initialState: DocumentState = {
  fileName: null,
  selectedFile: null,
  isUploading: false,
  error: "",
};

export default function FilesContent({ onProfileStatusChange }: Props) {
  const [passport, setPassport] = useState<DocumentState>({ ...initialState });

  const [nationalId, setNationalId] = useState<DocumentState>({
    ...initialState,
  });

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  /**
   * Checks the user's Storage folder and updates
   * both document names and profile completion status.
   */
  const refreshDocuments = useCallback(async () => {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    const { data, error } = await supabase.storage.from(BUCKET).list(user.id, {
      limit: 100,
      sortBy: {
        column: "name",
        order: "asc",
      },
    });

    if (error) {
      throw error;
    }

    const passportFile = data?.find((file) =>
      file.name.startsWith("passport."),
    );

    const nationalIdFile = data?.find((file) =>
      file.name.startsWith("national-id."),
    );

    const hasPassport = Boolean(passportFile);
    const hasNationalId = Boolean(nationalIdFile);

    setPassport((current) => ({
      ...current,
      fileName: passportFile?.name ?? null,
    }));

    setNationalId((current) => ({
      ...current,
      fileName: nationalIdFile?.name ?? null,
    }));

    /**
     * Profile is complete only when BOTH documents exist.
     */
    onProfileStatusChange?.(hasPassport && hasNationalId);
  }, [onProfileStatusChange]);

  /**
   * Load documents when the component opens.
   */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setPageError("");

        await refreshDocuments();
      } catch (error) {
        setPageError(
          error instanceof Error
            ? error.message
            : "Unable to load your documents.",
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [refreshDocuments]);

  /**
   * Validate a selected file.
   */
  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please upload a PDF, JPG, or PNG file.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "The file must be smaller than 10MB.";
    }

    return "";
  };

  /**
   * Select a document before uploading.
   */
  const handleFileSelect = (type: DocumentType, file: File | null) => {
    if (!file) {
      return;
    }

    const error = validateFile(file);

    const setter = type === "passport" ? setPassport : setNationalId;

    setter((current) => ({
      ...current,
      selectedFile: error ? null : file,
      error,
    }));
  };

  /**
   * Upload a document to the user's private folder.
   */
  const uploadDocument = async (type: DocumentType, file: File) => {
    const validationError = validateFile(file);

    const setter = type === "passport" ? setPassport : setNationalId;

    if (validationError) {
      setter((current) => ({
        ...current,
        error: validationError,
      }));

      return;
    }

    setter((current) => ({
      ...current,
      isUploading: true,
      error: "",
    }));

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const extension = file.name.split(".").pop()?.toLowerCase() || "bin";

      const fileName = `${type}.${extension}`;
      const filePath = `${user.id}/${fileName}`;

      /**
       * Remove older versions with a different extension.
       *
       * Example:
       * passport.pdf
       * passport.jpg
       *
       * Only the newly uploaded version remains.
       */
      const { data: existingFiles, error: listError } = await supabase.storage
        .from(BUCKET)
        .list(user.id);

      if (listError) {
        throw listError;
      }

      const oldFiles =
        existingFiles
          ?.filter(
            (existingFile) =>
              existingFile.name.startsWith(`${type}.`) &&
              existingFile.name !== fileName,
          )
          .map((existingFile) => `${user.id}/${existingFile.name}`) ?? [];

      if (oldFiles.length > 0) {
        const { error: removeError } = await supabase.storage
          .from(BUCKET)
          .remove(oldFiles);

        if (removeError) {
          throw removeError;
        }
      }

      /**
       * Upload the new document.
       */
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      /**
       * Reset the selected file.
       */
      setter((current) => ({
        ...current,
        fileName,
        selectedFile: null,
        isUploading: false,
        error: "",
      }));

      /**
       * IMPORTANT:
       * Re-check Supabase after uploading.
       *
       * This updates profileComplete in the dashboard
       * when the second required document is uploaded.
       */
      await refreshDocuments();
    } catch (error) {
      setter((current) => ({
        ...current,
        isUploading: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to upload the document.",
      }));
    }
  };

  /**
   * Remove a document.
   */
  const removeDocument = async (type: DocumentType) => {
    const setter = type === "passport" ? setPassport : setNationalId;

    setter((current) => ({
      ...current,
      error: "",
    }));

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const { data: files, error: listError } = await supabase.storage
        .from(BUCKET)
        .list(user.id);

      if (listError) {
        throw listError;
      }

      /**
       * Find every version of this document.
       */
      const paths =
        files
          ?.filter((file) => file.name.startsWith(`${type}.`))
          .map((file) => `${user.id}/${file.name}`) ?? [];

      if (paths.length > 0) {
        const { error: removeError } = await supabase.storage
          .from(BUCKET)
          .remove(paths);

        if (removeError) {
          throw removeError;
        }
      }

      setter({ ...initialState });

      /**
       * Re-check completion.
       *
       * Removing either document will make
       * profileComplete false.
       */
      await refreshDocuments();
    } catch (error) {
      setter((current) => ({
        ...current,
        error:
          error instanceof Error
            ? error.message
            : "Unable to remove the document.",
      }));
    }
  };

  const documentsComplete = Boolean(passport.fileName && nationalId.fileName);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#666]">
        <ShieldCheck size={18} />
        Your documents
      </div>

      <h2 className="mt-4 font-serif text-[32px] font-semibold leading-tight text-[#202020] sm:text-[40px]">
        Upload your documents
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#777] sm:text-base">
        Upload clear copies of your passport and national ID. Your documents are
        stored in a private folder linked to your account.
      </p>

      {/* Privacy notice */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#dfe9df] bg-[#f6fbf6] p-4">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-green-700" />

        <div>
          <p className="text-sm font-bold text-[#315c35]">
            Your documents are private
          </p>

          <p className="mt-1 text-xs leading-6 text-[#55705a]">
            Only your authenticated account can access documents stored in your
            folder.
          </p>
        </div>
      </div>

      {/* Page error */}
      {pageError && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />

          <span>{pageError}</span>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="mt-8 rounded-2xl border bg-white p-8 text-center text-sm text-[#777]">
          Loading your documents...
        </div>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Passport */}
          <div>
            <DocumentUploadCard
              title="Passport"
              description="Upload a clear copy of your passport bio-data page."
              fileName={passport.fileName}
              selectedFile={passport.selectedFile}
              isUploading={passport.isUploading}
              isUploaded={Boolean(passport.fileName)}
              onFileChange={(file) => handleFileSelect("passport", file)}
              onUpload={() => {
                if (passport.selectedFile) {
                  void uploadDocument("passport", passport.selectedFile);
                }
              }}
              onRemove={() => void removeDocument("passport")}
            />

            {passport.error && (
              <p className="mt-2 text-sm text-red-600">{passport.error}</p>
            )}
          </div>

          {/* National ID */}
          <div>
            <DocumentUploadCard
              title="National ID"
              description="Upload a clear copy of your national identification document."
              fileName={nationalId.fileName}
              selectedFile={nationalId.selectedFile}
              isUploading={nationalId.isUploading}
              isUploaded={Boolean(nationalId.fileName)}
              onFileChange={(file) => handleFileSelect("national-id", file)}
              onUpload={() => {
                if (nationalId.selectedFile) {
                  void uploadDocument("national-id", nationalId.selectedFile);
                }
              }}
              onRemove={() => void removeDocument("national-id")}
            />

            {nationalId.error && (
              <p className="mt-2 text-sm text-red-600">{nationalId.error}</p>
            )}
          </div>
        </div>
      )}

      {/* Completion message */}
      {!loading && documentsComplete && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
          <CheckCircle2 size={20} className="shrink-0" />

          <span>Your required documents have been uploaded.</span>
        </div>
      )}
    </div>
  );
}
