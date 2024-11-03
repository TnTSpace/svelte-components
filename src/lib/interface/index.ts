

export type TStatus = "success" | "error"

export type TUpload = "upload" | "url"

export interface iCloudinaryInfo {
  id: string;
  batchId: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  api_key: string;
  path: string;
  thumbnail_url: string;
}

export interface iMedia {
  secure_url: string;
  public_id: string;
  type: string;
  resource_type: string
}

export interface iStatus {
  message: string;
  status: TStatus;
  data?: Record<string, any>;
}

export interface iUploadResource {
  file?: File;
  folder: string;
  url?: string
}