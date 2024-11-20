/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import classNames from "classnames";
import ImageUploading, {
  ImageListType,
  ErrorsType,
  ResolutionType,
} from "react-images-uploading";
import { v7 as uuidv7 } from "uuid";
import { supabase } from "@/services/supabase.service";

interface ExportInterface {
  imageList: ImageListType;
  onImageUpload: () => void;
  onImageRemoveAll: () => void;
  errors: ErrorsType;
  onImageUpdate: (index: number) => void;
  onImageRemove: (index: number) => void;
  isDragging: boolean;
  dragProps: {
    onDrop: (e: any) => void;
    onDragEnter: (e: any) => void;
    onDragLeave: (e: any) => void;
    onDragOver: (e: any) => void;
    onDragStart: (e: any) => void;
  };
}

interface ExportInterfaceUploading extends ExportInterface {
  isUploading: boolean;
  disabled?: boolean;
}

export interface ImageUploadingProps {
  storagePath: string;
  images: ImageListType;
  setImages: (images: ImageListType) => void;
  children?: (props: ExportInterface) => React.ReactNode;
  multiple?: boolean;
  maxNumber?: number;
  acceptType?: Array<string>;
  maxFileSize?: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
  resolutionType?: ResolutionType;
  onError?: (errors: ErrorsType, files?: ImageListType) => void;
  dataURLKey?: string;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  allowNonImageType?: boolean;
}

export type {
  ImageListType,
  ErrorsType,
  ResolutionType,
} from "react-images-uploading";

const MultipleImages = ({
  imageList,
  onImageUpload,
  onImageUpdate,
  onImageRemove,
  isDragging,
  isUploading,
  dragProps,
  errors,
  disabled,
}: ExportInterfaceUploading) => {
  return (
    <div className="upload">
      {imageList.length > 0 ? (
        <div className="upload-wrap">
          {imageList.map((image, index) => {
            if (!image.dataURL) {
              return null;
            }

            return (
              <div key={index} className="upload-box">
                <img
                  src={image.dataURL}
                  className="upload-img"
                  alt={`upload-${index}`}
                />
                <div className="upload-action">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onImageUpdate(index)}
                  >
                    Ubah
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onImageRemove(index)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <DragArea
        disabled={disabled}
        dragProps={dragProps}
        isDragging={isDragging}
        isUploading={isUploading}
        onImageUpload={onImageUpload}
      />
      <Error errors={errors} />
    </div>
  );
};

const SingleImages = ({
  imageList,
  onImageUpload,
  onImageUpdate,
  onImageRemove,
  isDragging,
  isUploading,
  dragProps,
  errors,
  disabled,
}: ExportInterfaceUploading) => (
  <div className="upload">
    {imageList.length > 0 ? (
      <div className="upload-wrap">
        {imageList.map((image, index) => {
          if (!image.dataURL) {
            return null;
          }

          return (
            <div key={index} className="upload-box">
              <img
                src={image.dataURL}
                className="upload-img"
                alt={`upload-${index}`}
              />
              <div className="upload-action">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => onImageUpdate(index)}
                >
                  Ubah
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => onImageRemove(index)}
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <DragArea
        disabled={disabled}
        dragProps={dragProps}
        isDragging={isDragging}
        isUploading={isUploading}
        onImageUpload={onImageUpload}
      />
    )}
    <Error errors={errors} />
  </div>
);

const DragArea = ({
  dragProps,
  isDragging,
  isUploading,
  onImageUpload,
  disabled,
}: Pick<
  ExportInterfaceUploading,
  "isDragging" | "dragProps" | "onImageUpload" | "isUploading" | "disabled"
>) => (
  <div
    className={classNames("upload-drop", {
      dragged: isDragging,
      disabled: disabled ?? isUploading,
    })}
    onClick={onImageUpload}
    {...dragProps}
  >
    {isUploading ? (
      <div className="spinner-border text-primary"></div>
    ) : (
      <span>Klik atau letakkan gambar disini</span>
    )}
  </div>
);

const Error = ({ errors }: { errors: ErrorsType }) => {
  if (errors) {
    return (
      <div className="alert alert-danger vstack gap-2 align-items-start mb-0">
        {errors.maxNumber && (
          <p className="mb-0">Jumlah gambar sudah melampaui batas</p>
        )}
        {errors.acceptType && (
          <p className="mb-0">Tipe berkas tidak diizinkan</p>
        )}
        {errors.maxFileSize && (
          <p className="mb-0">Ukuran berkas melampaui batas</p>
        )}
        {errors.resolution && (
          <p className="mb-0">Resolusi berkas tidak sesuai ketentuan</p>
        )}
      </div>
    );
  }

  return null;
};

export default function ImageUpload({
  storagePath,
  multiple,
  images,
  setImages,
  inputProps,
  ...props
}: ImageUploadingProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    const updatedImages = [...imageList];

    if (addUpdateIndex) {
      setIsUploading(true);

      for (const index of addUpdateIndex) {
        const image = imageList[index];
        if (image.file) {
          const fileExtension = image.file.name.split(".").pop();
          const newFileName = `${uuidv7()}.${fileExtension}`;

          const { data, error } = await supabase.storage
            .from(storagePath)
            .upload(newFileName, image.file);

          if (error) {
            console.error("Upload failed:", error);
            continue;
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from(storagePath).getPublicUrl(data.path);

          updatedImages[index].dataURL = publicUrl;
        }
      }
    }

    setImages(updatedImages);
    setIsUploading(false);
  };

  return (
    <ImageUploading
      multiple={multiple}
      value={images}
      onChange={onChange}
      inputProps={inputProps}
      {...props}
    >
      {(props: ExportInterface) =>
        multiple ? (
          <MultipleImages
            {...props}
            disabled={inputProps?.disabled}
            isUploading={isUploading}
          />
        ) : (
          <SingleImages
            {...props}
            disabled={inputProps?.disabled}
            isUploading={isUploading}
          />
        )
      }
    </ImageUploading>
  );
}
