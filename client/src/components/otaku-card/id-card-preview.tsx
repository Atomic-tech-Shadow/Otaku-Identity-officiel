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
          background: 'linear-gradient(to bottom, #6ba9bb 0%, #6ba9bb 12%, #f5f1e2 12%, #f5f1e2 100%)',
          maxWidth: '400px',
          width: '100%',
          height: 'auto',
          aspectRatio: '1.7/1',
          borderRadius: '14px'
        }}
      >
        {/* Card corner badges */}
        <div className="card-badge top-1.5 left-1.5 bg-blue-200 shadow-inner">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L24 16H36L26 23L30 35L20 28L10 35L14 23L4 16H16L20 5Z" fill="#3B82F6" fillOpacity="0.7" />
          </svg>
        </div>
        <div className="card-badge top-1.5 right-1.5 bg-blue-200 shadow-inner">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 L30,10 L30,30 L10,30 Z" stroke="#3B82F6" strokeWidth="3" strokeOpacity="0.7" fill="none" />
            <path d="M10,10 L30,30 M10,30 L30,10" stroke="#3B82F6" strokeWidth="3" strokeOpacity="0.7" />
          </svg>
        </div>

        {/* Card Header */}
        <div className="w-full px-4 pb-0 flex justify-center relative z-20">
          <h2 className="font-serif text-center text-sm font-bold tracking-wider text-gray-900 uppercase">
            Carte d'identité otaku
          </h2>
        </div>

        {/* Card Content */}
        <div className="relative z-20 h-full p-3 flex flex-row">
          {/* Left Section - Photo and Basic Info */}
          <div className="w-[30%] flex flex-col">
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
            
            {/* Basic Info */}
            <div className="mt-1 space-y-0.5">
              <div className="flex items-center">
                <p className="text-[10px] font-bold text-black w-12">
                  NOM:
                </p>
                <p className="text-[10px] font-medium text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                  {card.username || "..."}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-[10px] font-bold text-black w-12">
                  RÉEL:
                </p>
                <p className="text-[10px] font-medium text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                  {card.realName || "..."}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-[10px] font-bold text-black w-12">
                  PAYS:
                </p>
                <div className="flex items-center gap-1 text-[10px] font-medium text-black flex-1">
                  {countryData?.flag && (
                    <img 
                      src={countryData.flag} 
                      alt={`Drapeau ${countryData.name}`} 
                      className="w-3 h-2 object-cover"
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
          <div className="flex-1 pl-3 flex flex-col">
            <div className="flex space-x-3">
              {/* Middle Info Section */}
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center">
                  <p className="text-[10px] font-bold text-black w-16">
                    STATUT:
                  </p>
                  <p className="text-[10px] font-medium text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {card.status || "..."}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[10px] font-bold text-black w-16">
                    GENRE:
                  </p>
                  <p className="text-[10px] font-medium text-black flex-1 overflow-hidden" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {card.genre || "..."}
                  </p>
                </div>
                
                {/* Citation */}
                <div className="bg-transparent p-0 mt-1 max-w-full">
                  <p className="text-[10px] font-medium text-black italic overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical'
                  }}>
                    "{card.quote || "..."}"
                  </p>
                </div>
                
                <div className="mt-2 text-center pt-0.5">
                  <p className="text-[9px] text-gray-800 italic">
                    Cette carte atteste de votre passion pour l'univers des animes
                  </p>
                </div>
              </div>
              
              {/* QR Code Section */}
              <div className="w-[80px] flex flex-col items-center">
                {card.qrCodeEnabled && (
                  <div className="bg-white border border-gray-300 rounded p-1 flex items-center justify-center" style={{width: '80px', height: '80px'}}>
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
                          <div className="bg-white rounded-full w-3 h-3 flex items-center justify-center">
                            <div className="bg-[#3B82F6] rounded-full w-2 h-2" />
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
                <div className="mt-1 text-center bg-gradient-to-r from-blue-100 to-blue-50 rounded-sm p-1">
                  <p className="text-[9px] font-bold text-gray-800">
                    SHADOW GARDEN
                  </p>
                  <p className="text-[8px] font-medium text-blue-600">
                    QUARTIER GÉNÉRAL
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card info footer */}
            <div className="flex justify-between mt-1 pt-0.5 border-t border-gray-200">
              <div>
                <p className="text-[8px] text-blue-600 uppercase">
                  ID: {card.cardNumber || "OTK-2025-00001"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-blue-600 uppercase">
                  Date: {card.issueDate || "28/04/2025"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Anime Character Silhouette */}
        <div className="absolute right-0 top-1/3 bottom-0 w-2/3 opacity-8 z-5">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 300 300" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ position: 'absolute', right: 0, top: 0 }}
          >
            <g fill="none" stroke="#555" strokeWidth="2.5">
              {/* Stylized Anime Character */}
              <path d="M200,50 C215,65 220,85 215,105 C210,125 190,135 170,130 C155,127 145,115 150,100 C155,85 175,80 190,90" />
              <path d="M150,90 C140,95 135,110 140,125 C145,140 160,145 175,140 C185,137 190,125 185,115 C180,105 170,100 160,105" />
              <path d="M130,110 C120,125 120,145 130,160 C140,175 150,185 160,180 C170,175 175,160 170,145 C165,130 155,120 140,125" />
              <path d="M110,150 C105,165 110,180 125,190 C140,200 155,200 165,190 C175,180 175,165 165,155 C155,145 145,145 135,155" />
              <path d="M100,180 C95,195 100,210 115,220 C130,230 145,225 155,215 C165,205 165,190 155,180 C145,170 135,175 125,185" />
              <path d="M90,200 C85,215 90,230 105,240 C120,250 135,245 145,235 C155,225 155,210 145,200 C135,190 125,195 115,205" />
              
              {/* Sword */}
              <path d="M230,70 L180,120 M180,120 L200,140 M200,140 L220,160 M220,160 L250,190" strokeWidth="3" />
              <path d="M175,125 L165,135" strokeWidth="3" />
              
              {/* Hair */}
              <path d="M210,40 C220,35 230,50 225,60 C220,70 210,65 205,55" />
              <path d="M200,35 C210,30 220,45 215,55 C210,65 200,60 195,50" />
              <path d="M190,30 C200,25 210,40 205,50 C200,60 190,55 185,45" />
              <path d="M180,25 C190,20 200,35 195,45 C190,55 180,50 175,40" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}