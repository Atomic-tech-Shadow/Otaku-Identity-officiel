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
  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
    useCORS: true, // Allow images from other domains
    allowTaint: true, // Allow "tainted" images from other domains
    backgroundColor: null, // Transparent background
  });
  
  return canvas.toDataURL("image/png");
};
