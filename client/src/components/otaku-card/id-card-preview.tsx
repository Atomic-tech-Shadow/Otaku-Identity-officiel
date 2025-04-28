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
        {/* Background Atomic Symbol Watermark */}
        <div className="absolute right-0 top-1/4 bottom-0 w-2/3 opacity-10 z-10">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 300 300" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ position: 'absolute', right: 0, top: 0 }}
          >
            <g fill="#666">
              {/* Electron orbits */}
              <ellipse cx="150" cy="150" rx="120" ry="45" fill="none" stroke="#666" strokeWidth="2" transform="rotate(0, 150, 150)" />
              <ellipse cx="150" cy="150" rx="120" ry="45" fill="none" stroke="#666" strokeWidth="2" transform="rotate(60, 150, 150)" />
              <ellipse cx="150" cy="150" rx="120" ry="45" fill="none" stroke="#666" strokeWidth="2" transform="rotate(120, 150, 150)" />
              
              {/* Electrons */}
              <circle cx="270" cy="150" r="8" />
              <circle cx="90" cy="195" r="8" />
              <circle cx="90" cy="105" r="8" />
              
              {/* Nucleus */}
              <circle cx="150" cy="150" r="15" />
            </g>
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
