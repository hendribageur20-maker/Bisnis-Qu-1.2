/**
 * Ultra-lightweight client-side image compressor
 * Target: Max 600x600px, target 100-200 KB
 */
export interface CompressedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  sizeKb: number;
  originalSizeKb: number;
}

export const compressImage = (
  file: File | Blob,
  maxDimension = 600,
  targetMaxKb = 200
): Promise<CompressedImageResult> => {
  return new Promise((resolve, reject) => {
    const originalSizeKb = Math.round(file.size / 1024);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio, max 600x600px
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
          reject(new Error('Canvas context unavailable'));
          return;
        }

        // Crisp rendering without bloat
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctx.drawImage(img, 0, 0, width, height);

        // Compress iteratively to achieve 100-200KB
        let quality = 0.85;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        let sizeKb = Math.round((dataUrl.length * 3) / 4 / 1024);

        if (sizeKb > targetMaxKb) {
          quality = 0.65;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          sizeKb = Math.round((dataUrl.length * 3) / 4 / 1024);
        }

        if (sizeKb > targetMaxKb) {
          quality = 0.5;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          sizeKb = Math.round((dataUrl.length * 3) / 4 / 1024);
        }

        resolve({
          dataUrl,
          width,
          height,
          sizeKb,
          originalSizeKb
        });
      };

      img.onerror = () => reject(new Error('Gagal memproses gambar'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
};
