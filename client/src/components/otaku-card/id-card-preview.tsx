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
        id="otakuIdCard"
        className="relative rounded-xl overflow-hidden card-shadow"
        style={{
          background: 'linear-gradient(to bottom, #6ba9bb 0%, #6ba9bb 15%, #f7f2e2 15%, #f7f2e2 100%)',
          maxWidth: '400px',
          width: '100%',
          height: 'auto',
          aspectRatio: '1.6/1',
          borderRadius: '16px'
        }}
      >
        {/* Card corner badges */}
        <div className="card-badge top-2 left-2 bg-blue-200 shadow-inner">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L24 16H36L26 23L30 35L20 28L10 35L14 23L4 16H16L20 5Z" fill="#3B82F6" fillOpacity="0.8" />
          </svg>
        </div>
        <div className="card-badge top-2 right-2 bg-blue-200 shadow-inner">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#3B82F6" strokeWidth="3" strokeOpacity="0.8" fill="none" />
            <path d="M20 10V20L28 24" stroke="#3B82F6" strokeWidth="3" strokeOpacity="0.8" />
          </svg>
        </div>
        {/* Background Dragon Watermark */}
        <div className="absolute right-0 top-1/3 bottom-0 w-2/3 opacity-8 z-10">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 300 300" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ position: 'absolute', right: 0, top: 0 }}
          >
            <g fill="#666">
              {/* Simple Dragon Silhouette */}
              <path d="M250,50 C270,60 280,80 270,100 C260,120 230,130 200,125 C170,120 160,140 170,160 C180,180 210,185 230,170 C250,155 260,170 240,180 C220,190 190,185 170,170 C150,155 145,125 160,105 C175,85 205,80 225,90 C245,100 230,120 210,115 C190,110 185,90 195,75 C205,60 235,65 250,50 Z M140,140 C160,130 165,105 155,90 C145,75 125,70 105,80 C85,90 75,115 85,135 C95,155 120,150 140,140 Z M100,140 C110,180 90,220 60,240 C40,255 30,240 40,225 C50,210 75,180 70,160 C65,140 45,135 35,150 C25,165 35,185 50,190" 
                strokeWidth="4" 
                stroke="#555" 
                fill="none" 
              />
            </g>
          </svg>
        </div>

        {/* Card Header */}
        <div className="w-full px-4 pt-1 pb-0 flex justify-center relative z-20">
          <h2 className="font-serif text-center text-lg font-bold tracking-wider text-gray-900 uppercase">
            Carte d'identité otaku
          </h2>
        </div>

        {/* Card Content */}
        <div className="relative z-20 h-full p-4 pt-2 flex flex-col">
          <div className="flex-1 flex">
            <div className="w-1/3 pr-2 flex flex-col space-y-2">
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
                    <div className="relative">
                      <QRCodeSVG 
                        value={card.qrCodeLink || "https://example.com"} 
                        size={65} 
                        bgColor={"#FFFFFF"} 
                        fgColor={"#3B82F6"} 
                        level={"L"} 
                        includeMargin={false}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white rounded-full w-3 h-3 flex items-center justify-center">
                          <div className="bg-[#3B82F6] rounded-full w-2 h-2" />
                        </div>
                      </div>
                    </div>
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
              <div className="space-y-1.5">
                <div className="flex items-start">
                  <p className="text-[11px] font-bold text-black w-32">
                    NOM D'UTILISATEUR:
                  </p>
                  <p className="text-[11px] font-medium text-black flex-1 truncate">
                    {card.username || "..."}
                  </p>
                </div>
                <div className="flex items-start">
                  <p className="text-[11px] font-bold text-black w-32">
                    NOM RÉEL:
                  </p>
                  <p className="text-[11px] font-medium text-black flex-1 truncate">
                    {card.realName || "..."}
                  </p>
                </div>
                <div className="flex items-start">
                  <p className="text-[11px] font-bold text-black w-32">
                    NATIONALITÉ:
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-black flex-1">
                    {countryData?.flag && (
                      <img 
                        src={countryData.flag} 
                        alt={`Drapeau ${countryData.name}`} 
                        className="w-4 h-3 object-cover"
                        style={{ boxShadow: "0 0 1px rgba(0,0,0,0.3)" }}
                      />
                    )}
                    <span className="truncate">{countryData?.name || "..."}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <p className="text-[11px] font-bold text-black w-32">
                    STATUT:
                  </p>
                  <p className="text-[11px] font-medium text-black flex-1 truncate">
                    {card.status || "..."}
                  </p>
                </div>
                <div className="flex items-start">
                  <p className="text-[11px] font-bold text-black w-32">
                    GENRE PRÉFÉRÉ:
                  </p>
                  <p className="text-[11px] font-medium text-black flex-1 truncate">
                    {card.genre || "..."}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[11px] font-bold text-black w-full mb-0.5">
                    CITATION FAVORITE:
                  </p>
                  <div className="bg-transparent p-0">
                    <p className="text-[11px] font-medium text-black italic break-words max-h-12 overflow-y-auto whitespace-pre-wrap">
                      {card.quote || "..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer text - Shadow Garden */}
              <div className="mt-1 text-center border-t border-gray-200 pt-0.5">
                <p className="text-[10px] text-gray-700 italic max-h-8 overflow-y-auto px-1">
                  Cette carte d'identité atteste de votre passion pour l'univers des animes et des mangas. Montrez-la fièrement.
                </p>
                <div className="flex items-center justify-end mt-0.5 mr-1">
                  <p className="text-[10px] font-medium text-gray-700">
                    SHADOW GARDEN
                  </p>
                </div>
              </div>

              {/* Card info footer */}
              <div className="flex justify-between mt-0.5 pt-0.5">
                <div className="ml-2">
                  <p className="text-[9px] text-blue-600 uppercase">
                    IDENTITY CARD
                  </p>
                  <p className="font-mono text-[10px] font-medium text-blue-600">
                    {card.cardNumber || "OTK-2025-00001"}
                  </p>
                </div>
                <div className="text-right mr-2">
                  <p className="text-[9px] text-blue-600 uppercase">
                    Émis le
                  </p>
                  <p className="font-mono text-[10px] font-medium text-blue-600">
                    {card.issueDate || "28/04/2025"}
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
