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
          background: 'linear-gradient(135deg, #2c3e50 0%, #4a69bd 100%)',
          maxWidth: '400px',
          width: '100%',
          height: 'auto',
          aspectRatio: '1.7/1',
          borderRadius: '14px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Country Flags in Card corners */}
        {countryData?.flag && (
          <>
            <div className="absolute top-2 left-2 rounded-md overflow-hidden shadow-md" style={{ width: '32px', height: '22px' }}>
              <img 
                src={countryData.flag} 
                alt={`Drapeau ${countryData.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-2 right-2 rounded-md overflow-hidden shadow-md" style={{ width: '32px', height: '22px' }}>
              <img 
                src={countryData.flag} 
                alt={`Drapeau ${countryData.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}

        {/* Card Header */}
        <div className="w-full px-4 pt-5 pb-2 flex justify-center relative z-20">
          <h2 className="font-sans text-center text-lg font-extrabold tracking-wider text-white uppercase" style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Carte d'identité otaku
          </h2>
        </div>

        {/* White Content Panel */}
        <div className="relative z-20 mx-3 mt-2 mb-3 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Card Content */}
          <div className="relative p-3 flex flex-row">
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
              <div className="mt-2 space-y-1">
                <div className="flex items-center">
                  <p className="text-[11px] font-bold text-blue-700 w-12">
                    NOM:
                  </p>
                  <p className="text-[11px] font-medium text-gray-800 flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {card.username || "..."}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[11px] font-bold text-blue-700 w-12">
                    RÉEL:
                  </p>
                  <p className="text-[11px] font-medium text-gray-800 flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {card.realName || "..."}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[11px] font-bold text-blue-700 w-12">
                    PAYS:
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-gray-800 flex-1">
                    {countryData?.flag && (
                      <img 
                        src={countryData.flag} 
                        alt={`Drapeau ${countryData.name}`} 
                        className="w-4 h-3 object-cover"
                        style={{ boxShadow: "0 0 1px rgba(0,0,0,0.3)" }}
                      />
                    )}
                    <span className="overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {countryData?.name || "..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - QR Code and Details */}
            <div className="flex-1 pl-4 flex flex-col">
              <div className="flex space-x-4">
                {/* Middle Info Section */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center">
                    <p className="text-[11px] font-bold text-blue-700 w-16">
                      STATUT:
                    </p>
                    <p className="text-[11px] font-medium text-gray-800 flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {card.status || "..."}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[11px] font-bold text-blue-700 w-16">
                      GENRE:
                    </p>
                    <p className="text-[11px] font-medium text-gray-800 flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {card.genre || "..."}
                    </p>
                  </div>
                  
                  {/* Citation */}
                  <div className="bg-blue-50 p-2 mt-1 max-w-full rounded-md">
                    <p className="text-[11px] font-medium text-gray-800 italic overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical'
                    }}>
                      "{card.quote || "..."}"
                    </p>
                  </div>
                  
                  <div className="mt-2 text-center pt-0.5">
                    <p className="text-[10px] text-gray-700 italic">
                      Cette carte atteste de votre passion pour l'univers des animes
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
                  <div className="mt-2 text-center bg-gradient-to-r from-blue-200 to-blue-100 rounded p-1.5 w-full shadow-sm">
                    <p className="text-[10px] font-bold text-gray-800">
                      SHADOW GARDEN
                    </p>
                    <p className="text-[9px] font-medium text-blue-600">
                      QUARTIER GÉNÉRAL
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card info footer */}
              <div className="flex justify-between mt-3 pt-1 border-t border-blue-200">
                <div>
                  <p className="text-[9px] font-semibold text-blue-700 uppercase">
                    ID: {card.cardNumber || "OTK-2025-00001"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-semibold text-blue-700 uppercase">
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