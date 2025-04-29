export interface OtakuIdCard {
  id?: number;
  username: string;
  realName: string;
  nationality: string;
  status: string;
  genre: string;
  quote: string;
  photo?: string;
  qrCodeEnabled: boolean;
  qrCodeLink?: string;
  cardNumber?: string;
  issueDate?: string;
  // Options de personnalisation
  cardColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

// Alias pour la compatibilité avec les requêtes API
export type IdCard = OtakuIdCard;
