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
        className="relative rounded-lg overflow-hidden card-shadow card-holographic"
        style={{
          background: 'linear-gradient(to bottom, #82c5d4 0%, #82c5d4 20%, #fbf7ee 20%, #fbf7ee 100%)',
          maxWidth: '500px',
          height: 'auto',
          aspectRatio: '16/10'
        }}
      >
        {/* Card corner badges */}
        <div className="card-badge top-2 left-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z" fill="#3B82F6" fillOpacity="0.6" />
          </svg>
        </div>
        <div className="card-badge top-2 right-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.6" fill="none" />
            <path d="M12 6V12L16 14" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.6" />
          </svg>
        </div>
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
          <div className="flex-1 flex md:flex-row flex-col">
            <div className="w-full md:w-1/3 pr-0 md:pr-2 flex flex-row md:flex-col justify-start md:space-y-3 space-x-3 md:space-x-0">
              {/* Photo */}
              <div className="w-24 h-24 md:w-full md:h-auto aspect-square bg-white border border-gray-300 rounded overflow-hidden flex items-center justify-center">
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
                <div className="relative w-24 h-24 md:w-full md:h-auto aspect-square bg-white border border-gray-300 rounded p-1 flex items-center justify-center">
                  {card.qrCodeLink ? (
                    <div className="relative">
                      <QRCodeSVG 
                        value={card.qrCodeLink || "https://example.com"} 
                        size={70} 
                        bgColor={"#FFFFFF"} 
                        fgColor={"#3B82F6"} 
                        level={"L"} 
                        includeMargin={false}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center">
                          <div className="bg-[#3B82F6] rounded-full w-2.5 h-2.5" />
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
            <div className="w-full md:w-2/3 pl-0 md:pl-4 flex flex-col mt-4 md:mt-0">
              <div className="space-y-1">
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-20 md:w-24">
                    USERNAME:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1 truncate">
                    {card.username || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-20 md:w-24">
                    NOM RÉEL:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1 truncate">
                    {card.realName || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-20 md:w-24">
                    PAYS:
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-800 flex-1">
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
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-20 md:w-24">
                    STATUT:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1 truncate">
                    {card.status || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-700 w-20 md:w-24">
                    GENRE:
                  </p>
                  <p className="text-xs font-medium text-gray-800 flex-1 truncate">
                    {card.genre || "..."}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-gray-700 w-full mb-1">
                    CITATION:
                  </p>
                  <div className="bg-gray-50 rounded-sm p-1.5">
                    <p className="text-xs font-medium text-gray-800 italic break-words max-h-14 overflow-y-auto whitespace-pre-wrap">
                      {card.quote || "..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer text - Shadow Garden */}
              <div className="mt-2 text-center border-t border-gray-200 pt-2">
                <p className="text-2xs md:text-xs text-gray-600 italic max-h-12 overflow-y-auto px-2">
                  La création de cette carte est mise en place par l'organisation Shadow Garden afin d'identifier les otaku. Tout passionné de la culture anime japonaise doit l'avoir, c'est obligatoire.
                </p>
                <div className="flex items-center justify-center mt-1">
                  <p className="text-2xs md:text-xs font-semibold text-gray-700">
                    DG: Ghost Cid
                  </p>
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNDUiIGhlaWdodD0iMjAiIHdpZHRoPSI0NSI+PHBhdGggZD0iTTIwLDUgQzUwLDUgNTAsNDAgODAsMzAgQzkwLDI1IDg1LDEwIDgwLDE1IEM3NSwyMCA3MCwzNSA2MCwzMCBDNDUsMjAgNDAsMTAgMjUsMTUgQzE1LDE4IDEwLDEwIDE1LDUiIHN0cm9rZT0iIzQ0NEY1QSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz48L3N2Zz4=" 
                    alt="Signature" 
                    className="ml-2 opacity-80 h-4 md:h-5"
                  />
                </div>
              </div>

              {/* Card info footer */}
              <div className="flex justify-between mt-auto pt-2">
                <div>
                  <p className="text-[8px] md:text-[10px] text-gray-500 uppercase">
                    Numéro
                  </p>
                  <p className="font-['Orbitron'] text-[10px] md:text-xs font-medium text-primary">
                    {card.cardNumber || "OTK-2025-00001"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] md:text-[10px] text-gray-500 uppercase">
                    Date d'émission
                  </p>
                  <p className="font-['Orbitron'] text-[10px] md:text-xs font-medium text-gray-700">
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
