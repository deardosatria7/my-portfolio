export async function imageUrlToAscii(
  src: string,
  width: number = 100
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Wajib jika dari domain lain
    img.src = src;

    img.onload = () => {
      const aspectRatio = img.height / img.width;

      // Rasio tinggi karakter monospace terhadap lebarnya (dalam px)
      const charAspectRatio = 0.55;
      const height = Math.round(width * aspectRatio * charAspectRatio);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");

      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height).data;

      // Urutan karakter dari gelap ke terang
      const ASCII_CHARS =
        "$@B%8&WM#*oahkbdpqwmZ0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
      const asciiCharsLength = ASCII_CHARS.length;

      let ascii = "";

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4;
          const r = imageData[offset];
          const g = imageData[offset + 1];
          const b = imageData[offset + 2];

          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          const charIndex = Math.floor(
            (brightness / 255) * (asciiCharsLength - 1)
          );

          ascii += ASCII_CHARS[charIndex];
        }
        ascii += "\n";
      }

      resolve(ascii);
    };

    img.onerror = () => reject("Failed to load image");
  });
}
