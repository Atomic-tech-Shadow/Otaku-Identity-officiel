import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatRelative } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return formatRelative(date, new Date(), { locale: fr });
}

export function generateCardNumber(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `OTK-${year}-${randomNum.toString().padStart(5, "0")}`;
}

export function formatCurrentDate(): string {
  const today = new Date();
  return `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  ).toString().padStart(2, "0")}/${today.getFullYear()}`;
}

export const countries = {
  fr: { name: "France", flag: "https://flagcdn.com/fr.svg" },
  jp: { name: "Japon", flag: "https://flagcdn.com/jp.svg" },
  us: { name: "États-Unis", flag: "https://flagcdn.com/us.svg" },
  kr: { name: "Corée du Sud", flag: "https://flagcdn.com/kr.svg" },
  cn: { name: "Chine", flag: "https://flagcdn.com/cn.svg" },
  ca: { name: "Canada", flag: "https://flagcdn.com/ca.svg" },
  be: { name: "Belgique", flag: "https://flagcdn.com/be.svg" },
  ch: { name: "Suisse", flag: "https://flagcdn.com/ch.svg" },
  tg: { name: "Togo", flag: "https://flagcdn.com/tg.svg" },
  sn: { name: "Sénégal", flag: "https://flagcdn.com/sn.svg" },
  ci: { name: "Côte d'Ivoire", flag: "https://flagcdn.com/ci.svg" },
};

export const animeGenres = [
  "Shonen",
  "Shojo",
  "Seinen",
  "Josei",
  "Isekai",
  "Mecha",
  "Slice of Life",
  "Romance",
  "Horror",
  "Fantasy",
  "Sci-Fi",
  "Sports",
  "Comedy",
  "Mystery",
  "Supernatural",
];

export const otakuStatuses = [
  "Otaku",
  "Cosplayer",
  "Mangaka",
  "Collectionneur",
  "Animateur",
  "Gamer",
  "Reviewer",
  "Traducteur",
  "Influenceur",
  "Streameur",
];

// Helper function to convert HTML Element to image
export const elementToImage = async (element: HTMLElement): Promise<string> => {
  // Dynamically import html2canvas to avoid server-side rendering issues
  const html2canvas = (await import("html2canvas")).default;
  
  // Temporarily apply fixed positioning styles to ensure everything is visible
  const originalStyles = {
    width: element.style.width,
    height: element.style.height,
    position: element.style.position,
    left: element.style.left,
    top: element.style.top,
    overflow: element.style.overflow
  };
  
  // Apply fixed dimensions to ensure all content is captured properly
  if (window.innerWidth < 768) { // Mobile
    element.style.width = '400px';
  } else {
    element.style.width = '500px';
  }
  element.style.height = 'auto';
  
  // Create a high-quality capture
  const canvas = await html2canvas(element, {
    scale: 3, // Higher scale for better quality
    useCORS: true, // Allow images from other domains
    allowTaint: true, // Allow "tainted" images from other domains
    backgroundColor: null, // Transparent background
    logging: false,
    imageTimeout: 0, // No timeout for image loading
    onclone: (documentClone) => {
      // Adjust clone for better rendering
      const clonedElement = documentClone.querySelector(`#${element.id}`) as HTMLElement;
      if (clonedElement) {
        clonedElement.style.transform = 'none';
        clonedElement.style.boxShadow = 'none';
      }
    }
  });
  
  // Restore original styles
  element.style.width = originalStyles.width;
  element.style.height = originalStyles.height;
  element.style.position = originalStyles.position;
  element.style.left = originalStyles.left;
  element.style.top = originalStyles.top;
  element.style.overflow = originalStyles.overflow;
  
  return canvas.toDataURL("image/png", 1.0); // Use maximum quality
};

// Function to crop an image to passport format (3:4 ratio)
export const cropToPassportFormat = (imageDataUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(imageDataUrl);
        return;
      }
      
      // Calculate dimensions for 3:4 aspect ratio (width:height)
      let targetWidth, targetHeight, sourceX, sourceY;
      
      if (img.width / img.height > 3/4) {
        // Image is wider than 3:4
        targetHeight = img.height;
        targetWidth = targetHeight * (3/4);
        sourceX = (img.width - targetWidth) / 2;
        sourceY = 0;
      } else {
        // Image is taller than 3:4
        targetWidth = img.width;
        targetHeight = targetWidth * (4/3);
        sourceX = 0;
        sourceY = (img.height - targetHeight) / 2;
      }
      
      // Set canvas size to the target dimensions
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      // Draw the cropped image
      ctx.drawImage(
        img,
        sourceX, sourceY, targetWidth, targetHeight,
        0, 0, targetWidth, targetHeight
      );
      
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    
    img.src = imageDataUrl;
  });
};
