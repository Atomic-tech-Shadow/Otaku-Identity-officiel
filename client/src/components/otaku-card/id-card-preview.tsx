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
        className="relative rounded-xl overflow-hidden card-shadow card-holographic"
        style={{
          background: 'linear-gradient(to bottom, #6aaec1 0%, #6aaec1 20%, #f5f2e6 20%, #f5f2e6 100%)',
          maxWidth: '400px',
          width: '100%',
          height: 'auto',
          aspectRatio: '1.8/1',
          borderRadius: '16px'
        }}
      >
        {/* Card corner badges */}
        <div className="card-badge top-2 left-2 bg-blue-200 shadow-inner">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z" fill="#3B82F6" fillOpacity="0.7" />
          </svg>
        </div>
        <div className="card-badge top-2 right-2 bg-blue-200 shadow-inner">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.7" fill="none" />
            <path d="M12 6V12L16 14" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.7" />
          </svg>
        </div>
        {/* Background Dragon Watermark */}
        <div className="absolute right-0 top-1/3 bottom-0 w-2/3 opacity-10 z-10">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 300 300" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ position: 'absolute', right: 0, top: 0 }}
          >
            <g fill="#666">
              {/* Stylized Dragon */}
              <path d="M200,50 C220,60 240,90 230,120 C220,150 180,170 150,180 C120,190 90,210 80,240 C70,270 90,290 110,280 C130,270 140,240 160,230 C180,220 220,240 250,220 C280,200 270,170 250,160 C230,150 190,160 180,140 C170,120 190,100 210,90 C230,80 260,70 270,50 C280,30 260,20 240,30 C220,40 210,60 200,80 C190,100 170,120 150,130 C130,140 100,150 90,130 C80,110 100,90 120,80 C140,70 180,80 190,60 C200,40 180,30 160,40 C140,50 130,80 110,90 C90,100 50,90 40,70 C30,50 60,40 80,50 C100,60 110,90 130,100 C150,110 170,90 160,70" 
                strokeWidth="8" 
                stroke="#555" 
                fill="none" 
              />
            </g>
          </svg>
        </div>

        {/* Card Header */}
        <div className="w-full px-4 pt-2 pb-1 flex justify-center relative z-20">
          <h2 className="font-['Orbitron'] text-center text-xl font-bold tracking-wider text-gray-900 uppercase">
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
                <div className="flex">
                  <p className="text-xs font-bold text-gray-800 w-32">
                    NOM D'UTILISATEUR:
                  </p>
                  <p className="text-xs font-medium text-gray-900 flex-1 truncate">
                    {card.username || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-800 w-32">
                    NOM RÉEL:
                  </p>
                  <p className="text-xs font-medium text-gray-900 flex-1 truncate">
                    {card.realName || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-800 w-32">
                    NATIONALITÉ:
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-900 flex-1">
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
                  <p className="text-xs font-bold text-gray-800 w-32">
                    STATUT:
                  </p>
                  <p className="text-xs font-medium text-gray-900 flex-1 truncate">
                    {card.status || "..."}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-xs font-bold text-gray-800 w-32">
                    GENRE PRÉFÉRÉ:
                  </p>
                  <p className="text-xs font-medium text-gray-900 flex-1 truncate">
                    {card.genre || "..."}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-gray-800 w-full mb-1">
                    CITATION FAVORITE:
                  </p>
                  <div className="bg-transparent rounded-sm p-1">
                    <p className="text-xs font-medium text-gray-900 italic break-words max-h-12 overflow-y-auto whitespace-pre-wrap">
                      {card.quote || "..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer text - Shadow Garden */}
              <div className="mt-1 text-center border-t border-gray-200 pt-1">
                <p className="text-xs text-gray-600 italic max-h-12 overflow-y-auto px-1">
                  La création de cette carte est mise en place par l'organisation Shadow Garden afin d'identifier les otaku. Tout passionné de la culture anime japonaise doit l'avoir, c'est obligatoire.
                </p>
                <div className="flex items-center justify-center mt-1">
                  <p className="text-xs font-semibold text-gray-700">
                    DG: Ghost Cid
                  </p>
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNDUiIGhlaWdodD0iMjAiIHdpZHRoPSI0NSI+PHBhdGggZD0iTTIwLDUgQzUwLDUgNTAsNDAgODAsMzAgQzkwLDI1IDg1LDEwIDgwLDE1IEM3NSwyMCA3MCwzNSA2MCwzMCBDNDUsMjAgNDAsMTAgMjUsMTUgQzE1LDE4IDEwLDEwIDE1LDUiIHN0cm9rZT0iIzQ0NEY1QSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz48L3N2Zz4=" 
                    alt="Signature" 
                    className="ml-2 opacity-80 h-4"
                  />
                </div>
              </div>

              {/* Card info footer */}
              <div className="flex justify-between mt-1 pt-1">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">
                    Numéro
                  </p>
                  <p className="font-['Orbitron'] text-xs font-medium text-primary">
                    {card.cardNumber || "OTK-2025-00001"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase">
                    Date d'émission
                  </p>
                  <p className="font-['Orbitron'] text-xs font-medium text-gray-700">
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
