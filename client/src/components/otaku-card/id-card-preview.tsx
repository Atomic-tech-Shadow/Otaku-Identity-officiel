import React from 'react';
import { User } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { OtakuIdCard } from '@/types/id-card';
import { countries } from '@/lib/utils';

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
          background: 'linear-gradient(to bottom, #86c5da 0%, #5a9bbd 100%)',
          maxWidth: '100%',
          width: '100%',
          height: '280px',
          borderRadius: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Country Flags in Card corners */}
        {countryData?.flag && (
          <>
            <div className="absolute top-2 left-2 rounded-full overflow-hidden shadow-md" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.8)' }}>
              <img 
                src={countryData.flag} 
                alt={`Drapeau ${countryData.name}`} 
                className="w-[28px] h-[28px] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
            </div>
            <div className="absolute top-2 right-2 rounded-full overflow-hidden shadow-md" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.8)' }}>
              <img 
                src={countryData.flag} 
                alt={`Drapeau ${countryData.name}`} 
                className="w-[28px] h-[28px] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
            </div>
          </>
        )}

        {/* Card Header */}
        <div className="w-full px-4 pt-5 pb-2 flex justify-center relative z-20">
          <h2 className="font-serif text-center text-lg font-bold tracking-wider text-black uppercase">
            Carte d'identité otaku
          </h2>
        </div>

        {/* White Content Panel */}
        <div className="relative z-20 mx-3 mt-2 mb-3 bg-white rounded-lg shadow-lg" style={{ maxHeight: '210px', overflow: 'hidden' }}>
          {/* Card Content */}
          <div className="relative p-3 flex flex-row" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M100 15C152.5 15 195 57.5 195 110C195 162.5 152.5 205 100 205C47.5 205 5 162.5 5 110C5 57.5 47.5 15 100 15Z\' fill=\'none\' stroke=\'%23f2f2f25f\' stroke-width=\'1\' /%3E%3C/svg%3E")', backgroundSize: '300px', backgroundPosition: 'center right', backgroundRepeat: 'no-repeat', opacity: 0.8 }}>
            {/* Left Section - Photo and Basic Info */}
            <div className="w-[30%] flex flex-col">
              {/* Photo */}
              <div className="w-full aspect-square bg-white border-2 border-blue-300 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
                {card.photo ? (
                  <img
                    src={card.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-blue-400" />
                )}
              </div>
              
              {/* Basic Info */}
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <p className="text-[11px] font-bold text-black w-36">
                    NOM D'UTILISATEUR:
                  </p>
                  <p className="text-[11px] font-normal text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {card.username || "..."}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[11px] font-bold text-black w-36">
                    NOM RÉEL:
                  </p>
                  <p className="text-[11px] font-normal text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {card.realName || "..."}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[11px] font-bold text-black w-36">
                    NATIONALITÉ:
                  </p>
                  <p className="text-[11px] font-normal text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {countryData?.name || "..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - QR Code and Details */}
            <div className="flex-1 pl-4 flex flex-col">
              <div className="flex space-x-4">
                {/* Middle Info Section */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center">
                    <p className="text-[11px] font-bold text-black w-36">
                      STATUT:
                    </p>
                    <p className="text-[11px] font-normal text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {card.status || "..."}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[11px] font-bold text-black w-36">
                      GENRE PRÉFÉRÉ:
                    </p>
                    <p className="text-[11px] font-normal text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {card.genre || "..."}
                    </p>
                  </div>
                  
                  {/* Citation */}
                  <div className="flex items-start mt-2">
                    <p className="text-[11px] font-bold text-black w-36">
                      CITATION FAVORITE:
                    </p>
                    <p className="text-[11px] font-normal text-black italic flex-1 overflow-hidden" style={{
                      maxHeight: '40px',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal'
                    }}>
                      "{card.quote || "..."}"
                    </p>
                  </div>
                  
                  <div className="mt-1 text-center">
                    <p className="text-[8px] text-gray-700 italic">
                      Cette carte d'identité atteste de votre passion pour l'univers des animes et des mangas. Montrez-la fièrement
                    </p>
                  </div>
                </div>
                
                {/* QR Code Section */}
                <div className="w-[90px] flex flex-col items-center">
                  {card.qrCodeEnabled && (
                    <div className="bg-white border-2 border-blue-300 rounded-lg p-1 flex items-center justify-center shadow-md" style={{width: '90px', height: '90px'}}>
                      {card.qrCodeLink ? (
                        <div className="relative">
                          <QRCodeSVG 
                            value={card.qrCodeLink || "https://example.com"} 
                            size={78} 
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
                          <p className="text-[9px] text-gray-400 mt-1">QR Code</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-1 text-center bg-gradient-to-r from-blue-200 to-blue-100 rounded p-0.5 w-full shadow-sm">
                    <p className="text-[8px] font-bold text-blue-700">
                      SHADOW GARDEN
                    </p>
                    <p className="text-[7px] font-medium text-blue-500">
                      QUARTIER GÉNÉRAL
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card info footer minimaliste */}
              <div className="flex justify-between mt-1 pt-0.5 border-t border-blue-100">
                <div>
                  <p className="text-[7px] font-medium text-blue-600 uppercase">
                    ID: {card.cardNumber || "OTK-2025-00001"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[7px] font-medium text-blue-600 uppercase">
                    Date: {card.issueDate || "28/04/2025"}
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