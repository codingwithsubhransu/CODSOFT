
export interface FileDetails {
  preview: string;
  name: string;
}

export interface GenerativePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}
