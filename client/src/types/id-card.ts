export interface OtakuIdCard {
  id?: string;
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
}
