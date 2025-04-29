import React, { useEffect } from 'react';
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
  
  useEffect(() => {
    // Forcer l'affichage horizontal de la carte sur mobile
    if (cardRef.current) {
      cardRef.current.style.width = '860px';
      cardRef.current.style.height = '540px';
      cardRef.current.style.maxWidth = '100%';
      cardRef.current.style.maxHeight = '100%';
      cardRef.current.style.aspectRatio = '1.586/1';
    }
  }, [cardRef]);

  return (
    <div className="w-full mx-auto mb-4 overflow-auto">
      <div
        ref={cardRef}
        id="otakuIdCard"
        className="relative overflow-hidden card-shadow" 
        style={{
          background: 'linear-gradient(to right, #86c5da 0%, #5a9bbd 100%)',
          width: '860px', 
          height: '540px',
          borderRadius: '8px', // rayon ~3mm (8px)
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          aspectRatio: '1.586/1', // Format ID-1 standard exact
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '860px' // Force l'élément à avoir au moins cette largeur
        }}
      >
        {/* Country Flags in Card corners */}
        {countryData?.flag && (
          <>
            <div className="absolute top-6 left-6 overflow-hidden shadow-md rounded-sm" style={{ width: '40px', height: '28px', background: 'rgba(255,255,255,0.8)' }}>
              <img 
                src={countryData.flag} 
                alt={`Drapeau ${countryData.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-6 right-6 overflow-hidden shadow-md rounded-sm" style={{ width: '40px', height: '28px', background: 'rgba(255,255,255,0.8)' }}>
              <img 
                src={countryData.flag} 
                alt={`Drapeau ${countryData.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}

        {/* Card Header */}
        <div className="w-full px-4 pt-6 pb-2 flex justify-center relative z-20">
          <h2 className="font-serif text-center text-3xl font-bold tracking-wider text-black uppercase" style={{ fontSize: '28px' }}>
            Carte d'identité otaku
          </h2>
        </div>

        {/* White Content Panel */}
        <div className="relative z-20 mx-4 mt-2 mb-4 bg-white shadow-lg rounded-md" style={{ height: '380px', overflow: 'hidden' }}>
          {/* Card Content */}
          <div className="relative p-4 flex" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='260' height='260' viewBox='0 0 260 260' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23f0f8ff50' stroke-width='1.5'%3E%3Ccircle cx='130' cy='130' r='100' /%3E%3Ccircle cx='130' cy='130' r='70' /%3E%3Ccircle cx='130' cy='130' r='40' /%3E%3Cpath d='M130 30L130 230' /%3E%3Cpath d='M30 130L230 130' /%3E%3Cpath d='M72 72L188 188' /%3E%3Cpath d='M188 72L72 188' /%3E%3Ccircle cx='130' cy='30' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='30' cy='130' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='230' cy='130' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='130' cy='230' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='72' cy='72' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='188' cy='72' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='72' cy='188' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='188' cy='188' r='8' fill='%23e6f1ff50' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '400px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.9
          }}>
            
            {/* Left Side - Photo */}
            <div className="flex-shrink-0 mr-8">
              <div style={{ width: '180px', height: '220px' }} className="bg-white border-2 border-blue-300 rounded-md overflow-hidden flex items-center justify-center shadow-md">
                {card.photo ? (
                  <img
                    src={card.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-20 w-20 text-blue-400" />
                )}
              </div>
            </div>
            
            {/* Middle section - Information */}
            <div className="flex-grow space-y-3 pr-4">
              <div>
                <p className="text-black" style={{ fontSize: '16px' }}>
                  <span className="font-bold mr-2">NOM D'UTILISATEUR:</span> {card.username || "..."}
                </p>
              </div>
              <div>
                <p className="text-black" style={{ fontSize: '16px' }}>
                  <span className="font-bold mr-2">NOM RÉEL:</span> {card.realName || "..."}
                </p>
              </div>
              <div>
                <p className="text-black" style={{ fontSize: '16px' }}>
                  <span className="font-bold mr-2">NATIONALITÉ:</span> {countryData?.name || "..."}
                </p>
              </div>
              <div>
                <p className="text-black" style={{ fontSize: '16px' }}>
                  <span className="font-bold mr-2">STATUT:</span> {card.status || "..."}
                </p>
              </div>
              <div>
                <p className="text-black" style={{ fontSize: '16px' }}>
                  <span className="font-bold mr-2">GENRE PRÉFÉRÉ:</span> {card.genre || "..."}
                </p>
              </div>
              
              {/* Citation */}
              <div className="mt-4">
                <p className="text-black" style={{ fontSize: '16px' }}>
                  <span className="font-bold mr-2">CITATION FAVORITE:</span>
                </p>
                <p className="text-black italic ml-1 overflow-hidden" style={{
                  fontSize: '15px',
                  maxHeight: '60px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal'
                }}>
                  "{card.quote || "..."}"
                </p>
              </div>
            </div>
            
            {/* Right section - QR Code */}
            <div className="flex-shrink-0 ml-auto flex flex-col items-center">
              {card.qrCodeEnabled && (
                <div className="bg-white border-2 border-blue-300 rounded-md p-1 flex items-center justify-center shadow-md" style={{width: '150px', height: '150px'}}>
                  {card.qrCodeLink ? (
                    <div className="relative">
                      <QRCodeSVG 
                        value={card.qrCodeLink || "https://example.com"} 
                        size={135} 
                        bgColor={"#FFFFFF"} 
                        fgColor={"#3B82F6"} 
                        level={"L"} 
                        includeMargin={false}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                          <div className="bg-[#3B82F6] rounded-full w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-[#2563EB] w-24 h-24 opacity-10 rounded"></div>
                      <p className="text-gray-400 mt-1" style={{ fontSize: '14px' }}>QR Code</p>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-4 text-center bg-gradient-to-r from-blue-200 to-blue-100 p-1 w-full shadow-sm rounded-sm">
                <p className="font-bold text-blue-700" style={{ fontSize: '14px' }}>
                  SHADOW GARDEN
                </p>
                <p className="font-medium text-blue-500" style={{ fontSize: '12px' }}>
                  QUARTIER GÉNÉRAL
                </p>
                <p className="font-bold text-blue-700 mt-1" style={{ fontSize: '13px' }}>
                  EL CID
                </p>
                <div className="mt-1 flex justify-center">
                  <div className="text-blue-800 italic font-cursive" style={{ fontSize: '10px', fontFamily: 'cursive', letterSpacing: '1px' }}>
                    signature
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer section */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-gray-700 italic text-center mb-2" style={{ fontSize: '13px' }}>
              Cette carte d'identité atteste de votre passion pour l'univers des animes et des mangas. Montrez-la fièrement
            </p>
            <div className="flex justify-between pt-1 border-t border-blue-100">
              <div>
                <p className="font-medium text-blue-600 uppercase" style={{ fontSize: '14px' }}>
                  ID: {card.cardNumber || "OTK-2025-00001"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-600 uppercase" style={{ fontSize: '14px' }}>
                  Date: {card.issueDate || "28/04/2025"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}