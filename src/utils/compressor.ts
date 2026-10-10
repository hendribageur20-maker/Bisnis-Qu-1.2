export interface CompressionResult {
  dataUrl: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  width: number;
  height: number;
  compressionRatio: number; // e.g. 85% saved
}

/**
 * Ultra-lightweight in-browser image compressor for Android 6.0+ & low-memory devices (1-2 GB RAM)
 * Caps resolution at max 600x600px and targets 100 - 200 KB JPEG output.
 */
export const compressImageFile = (
  file: File,
  maxDimension: number = 600,
  quality: number = 0.75
): Promise<CompressionResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down to max 600x600 while maintaining aspect ratio
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Draw image onto canvas
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', quality);

        // Calculate size in bytes
        const base64Str = dataUrl.split(',')[1] || '';
        const compressedSizeBytes = Math.round((base64Str.length * 3) / 4);
        const originalSizeBytes = file.size;
        const savedPercent = Math.max(0, Math.round(((originalSizeBytes - compressedSizeBytes) / originalSizeBytes) * 100));

        resolve({
          dataUrl,
          originalSizeBytes,
          compressedSizeBytes,
          width,
          height,
          compressionRatio: savedPercent
        });
      };

      img.onerror = () => reject(new Error('Gagal memuat gambar'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
};
