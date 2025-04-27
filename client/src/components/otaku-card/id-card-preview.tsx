import React, { useRef } from "react";
import { OtakuIdCard } from "@/types/id-card";
import { User } from "lucide-react";
import { countries } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

interface IdCardPreviewProps {
  card: OtakuIdCard;
  cardRef: React.RefObject<HTMLDivElement>;
}

export function IdCardPreview({ card, cardRef }: IdCardPreviewProps) {
  const countryData = card.nationality ? countries[card.nationality as keyof typeof countries] : null;

  return (
    <div className="max-w-xl mx-auto mb-4">
      <div
        ref={cardRef}
        className="aspect-[1.586/1] relative rounded-lg overflow-hidden card-shadow"
        style={{
          background: 'linear-gradient(to bottom, #82c5d4 0%, #82c5d4 20%, #fbf7ee 20%, #fbf7ee 100%)'
        }}
      >
        {/* Background Dragon Watermark */}
        <div className="absolute right-0 top-1/4 bottom-0 w-2/3 opacity-10 z-10">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 300 300" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ position: 'absolute', right: 0, top: 0 }}
          >
            <path 
              fill="#666" 
              d="M235 120c-5 5-11 8-18 10-15 4-30 3-45 5-10 1-19 4-25 12-4 6-6 13-4 20s7 13 14 17c5 3 11 4 16 4 3 0 6-1 9-1-1 1-2 2-3 2-7 5-14 8-22 10-7 2-15 1-21-3-5-4-8-10-9-16 0-5 2-11 6-15 5-4 10-7 17-8 3-1 7-1 10-1-2-1-5-1-8 0-5 1-9 3-12 6-4 3-6 8-7 13-1 7 2 14 8 19 8 6 18 6 27 3 10-3 19-8 28-14-7 6-14 11-22 15-9 5-18 9-28 11-9 1-18 0-24-6-5-5-7-12-5-19 1-5 4-9 8-12 4-3 10-5 15-6 4-1 9-1 13-1-2 0-4 0-6 0-8 1-17 3-23 10-5 6-8 15-6 23 2 9 9 16 18 20 9 3 20 3 30 0 17-5 31-15 45-26-2 2-5 4-7 5-3 3-7 5-10 7-9 6-18 11-28 15-12 5-25 8-38 7-10-1-20-5-26-14-4-6-6-14-5-22 2-7 7-13 12-18 7-6 15-10 24-12 8-2 17-2 25-1-16 1-33 5-45 16-14 11-19 30-11 46 8 15 25 22 41 24 19 2 37-4 54-12 15-8 29-19 40-32-17 19-39 33-62 42-12 4-24 7-37 8-13 0-28 0-39-7-10-7-16-20-14-33 2-14 11-26 23-32 12-7 26-9 40-7"
            />
          </svg>
        </div>

        {/* Card Header */}
        <div className="w-full px-4 pt-2 pb-1 flex justify-center relative z-20">
          <h2 className="font-['Orbitron'] text-center text-lg font-bold tracking-wider text-gray-800 uppercase">
            Carte d'identité otaku
          </h2>
        </div>

        {/* Card Content */}
        <div className="relative z-20 h-full p-4 pt-2 flex flex-col">
          <div className="flex-1 flex">
            <div className="w-1/3 pr-2 flex flex-col space-y-3">
              {/* Photo */}
              <div className="w-full aspect-square bg-white border border-gray-300 rounded overflow-hidden flex items-center justify-center">
                {card.photo ? (
                  <img
                    src={card.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>

              {/* QR Code */}
              {card.qrCodeEnabled && (
                <div className="relative w-full aspect-square bg-white border border-gray-300 rounded p-1 flex items-center justify-center">
                  {card.qrCodeLink ? (
                    <QRCodeSVG 
                      value={card.qrCodeLink} 
                      size={80} 
                      bgColor={"#FFFFFF"} 
                      fgColor={"#3B82F6"} 
                      level={"M"} 
                      includeMargin={false}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-[#2563EB] w-16 h-16 opacity-10 rounded"></div>
                      <p className="text-xs text-gray-400 mt-1">QR Code</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fields */}
            <div className="w-2/3 pl-4 flex flex-col">
              <div className="space-y-1">
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-36">
                    NOM D'UTILISATEUR:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1">
                    {card.username || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-36">
                    NOM RÉEL:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1">
                    {card.realName || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-36">
                    NATIONALITÉ:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1">
                    {countryData?.name || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-36">
                    STATUT:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1">
                    {card.status || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-36">
                    GENRE PRÉFÉRÉ:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1">
                    {card.genre || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-36">
                    CITATION FAVORITE:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1 italic">
                    {card.quote || "..."}
                  </p>
                </div>
              </div>

              {/* Footer text */}
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-600 italic">
                  Cette carte d'identité atteste de votre passion pour l'univers des animes et des mangas. Montrez-la fièrement.
                </p>
              </div>

              <div className="flex justify-between mt-auto pt-3">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">
                    Numéro
                  </p>
                  <p className="font-['Orbitron'] text-xs font-medium text-primary">
                    {card.cardNumber || "OTK-2023-00001"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase">
                    Date d'émission
                  </p>
                  <p className="font-['Orbitron'] text-xs font-medium text-gray-700">
                    {card.issueDate || "01/01/2023"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
