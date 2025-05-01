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
          background: `linear-gradient(to right, ${card.cardColor}99 0%, ${card.cardColor} 100%)`,
          width: '860px', 
          height: '540px',
          borderRadius: '8px', // rayon ~3mm (8px)
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          aspectRatio: '1.586/1', // Format ID-1 standard exact
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '860px', // Force l'élément à avoir au moins cette largeur
          color: card.textColor || '#000000'
        }}
      >
        {/* Country Flags in Card corners */}
        {countryData?.flag && (
          <>
            <div className="absolute top-6 left-6 overflow-hidden shadow-md rounded-sm" style={{ width: '90px', height: '65px', background: 'rgba(255,255,255,0.8)' }}>
              <img 
                src={countryData.flag} 
                alt={`Drapeau ${countryData.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-6 right-6 overflow-hidden shadow-md rounded-sm" style={{ width: '90px', height: '65px', background: 'rgba(255,255,255,0.8)' }}>
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
        <div className="relative z-20 mx-4 mt-2 mb-4 shadow-lg rounded-md" style={{ 
          height: '380px', 
          overflow: 'hidden',
          backgroundColor: card.backgroundColor || '#FFFFFF' 
        }}>
          {/* Card Content */}
          <div className="relative p-4 flex" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='260' height='260' viewBox='0 0 260 260' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23f0f8ff50' stroke-width='1.5'%3E%3Ccircle cx='130' cy='130' r='100' /%3E%3Ccircle cx='130' cy='130' r='70' /%3E%3Ccircle cx='130' cy='130' r='40' /%3E%3Cpath d='M130 30L130 230' /%3E%3Cpath d='M30 130L230 130' /%3E%3Cpath d='M72 72L188 188' /%3E%3Cpath d='M188 72L72 188' /%3E%3Ccircle cx='130' cy='30' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='30' cy='130' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='230' cy='130' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='130' cy='230' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='72' cy='72' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='188' cy='72' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='72' cy='188' r='8' fill='%23e6f1ff50' /%3E%3Ccircle cx='188' cy='188' r='8' fill='%23e6f1ff50' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '400px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.9,
            position: 'relative'
          }}>
            {/* Éléments de style manga */}
            <div className="absolute top-0 right-0 opacity-20" style={{ fontSize: '150px', fontFamily: 'Arial', color: '#3d6cb3', transform: 'rotate(15deg)', zIndex: 0, lineHeight: 0.8 }}>漫画</div>
            <div className="absolute bottom-10 left-10 opacity-10" style={{ fontSize: '70px', fontFamily: 'Arial', color: '#3d6cb3', transform: 'rotate(-10deg)', zIndex: 0 }}>オタク</div>
            
            {/* Symboles atomiques en filigrane */}
            <div className="absolute top-1/4 left-1/3 opacity-10" style={{ zIndex: 0 }}>
              <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3d6cb3" strokeWidth="1.5" />
                <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke="#3d6cb3" strokeWidth="1.5" transform="rotate(0)" />
                <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke="#3d6cb3" strokeWidth="1.5" transform="rotate(60)" />
                <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke="#3d6cb3" strokeWidth="1.5" transform="rotate(120)" />
                <circle cx="50" cy="50" r="5" fill="#3d6cb3" />
                <circle cx="50" cy="5" r="3" fill="#3d6cb3" />
                <circle cx="50" cy="95" r="3" fill="#3d6cb3" />
                <circle cx="5" cy="50" r="3" fill="#3d6cb3" />
                <circle cx="95" cy="50" r="3" fill="#3d6cb3" />
              </svg>
            </div>
            
            <div className="absolute bottom-1/4 right-1/3 opacity-10" style={{ zIndex: 0 }}>
              <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3d6cb3" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#3d6cb3" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#3d6cb3" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="10" fill="#3d6cb3" opacity="0.4" />
                <circle cx="70" cy="50" r="3" fill="#3d6cb3" />
                <circle cx="30" cy="50" r="3" fill="#3d6cb3" />
                <circle cx="50" cy="70" r="3" fill="#3d6cb3" />
                <circle cx="50" cy="30" r="3" fill="#3d6cb3" />
              </svg>
            </div>
            
            {/* Left Side - Photo */}
            <div className="flex-shrink-0 mr-8">
              <div style={{ width: '180px', height: '220px', position: 'relative' }} className="relative bg-white border-2 border-blue-300 rounded-md overflow-hidden flex items-center justify-center shadow-md">
                {/* Bordure style manga */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 z-10"></div>
                <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500 z-10"></div>
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-b from-pink-500 via-red-500 to-yellow-400 z-10"></div>
                
                {/* Points d'effet manga dans les coins */}
                <div className="absolute top-3 left-3 w-4 h-4 bg-white border border-blue-500 rounded-full z-10"></div>
                <div className="absolute top-3 right-3 w-4 h-4 bg-white border border-blue-500 rounded-full z-10"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 bg-white border border-blue-500 rounded-full z-10"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 bg-white border border-blue-500 rounded-full z-10"></div>
                
                {card.photo ? (
                  <img
                    src={card.photo}
                    alt="Profile"
                    className="w-full h-full object-cover z-0"
                  />
                ) : (
                  <User className="h-20 w-20 text-blue-400 z-0" />
                )}
              </div>
            </div>
            
            {/* Middle section - Information */}
            <div className="flex-grow space-y-3 pr-4 relative z-10">
              {/* Manga style background pattern */}
              <div className="absolute -top-2 -right-2 w-6 h-6" style={{ backgroundImage: "radial-gradient(circle, #3d6cb3 1px, transparent 1px)", backgroundSize: "5px 5px" }}></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8" style={{ backgroundImage: "radial-gradient(circle, #3d6cb3 1px, transparent 1px)", backgroundSize: "4px 4px" }}></div>
              
              <div className="relative overflow-hidden rounded pl-1" style={{ background: 'linear-gradient(90deg, rgba(61,108,179,0.1) 0%, rgba(255,255,255,0) 100%)' }}>
                <p style={{ fontSize: '16px', color: card.textColor || '#000000' }}>
                  <span className="font-bold mr-2">NOM D'UTILISATEUR:</span> 
                  <span className="font-semibold" style={{ textShadow: '0px 0px 1px rgba(61,108,179,0.5)' }}>
                    {card.username || "..."}
                  </span>
                </p>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
              </div>
              
              <div className="relative overflow-hidden rounded pl-1" style={{ background: 'linear-gradient(90deg, rgba(61,108,179,0.1) 0%, rgba(255,255,255,0) 100%)' }}>
                <p style={{ fontSize: '16px', color: card.textColor || '#000000' }}>
                  <span className="font-bold mr-2">NOM RÉEL:</span> 
                  <span className="font-semibold" style={{ textShadow: '0px 0px 1px rgba(61,108,179,0.5)' }}>
                    {card.realName || "..."}
                  </span>
                </p>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
              </div>
              
              <div className="relative overflow-hidden rounded pl-1" style={{ background: 'linear-gradient(90deg, rgba(61,108,179,0.1) 0%, rgba(255,255,255,0) 100%)' }}>
                <p style={{ fontSize: '16px', color: card.textColor || '#000000' }}>
                  <span className="font-bold mr-2">NATIONALITÉ:</span> 
                  <span className="font-semibold" style={{ textShadow: '0px 0px 1px rgba(61,108,179,0.5)' }}>
                    {countryData?.name || "..."}
                  </span>
                </p>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
              </div>
              
              <div className="relative overflow-hidden rounded pl-1" style={{ background: 'linear-gradient(90deg, rgba(61,108,179,0.1) 0%, rgba(255,255,255,0) 100%)' }}>
                <p style={{ fontSize: '16px', color: card.textColor || '#000000' }}>
                  <span className="font-bold mr-2">STATUT:</span> 
                  <span className="font-semibold" style={{ textShadow: '0px 0px 1px rgba(61,108,179,0.5)' }}>
                    {card.status || "..."}
                  </span>
                </p>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
              </div>
              
              <div className="relative overflow-hidden rounded pl-1" style={{ background: 'linear-gradient(90deg, rgba(61,108,179,0.1) 0%, rgba(255,255,255,0) 100%)' }}>
                <p style={{ fontSize: '16px', color: card.textColor || '#000000' }}>
                  <span className="font-bold mr-2">GENRE PRÉFÉRÉ:</span> 
                  <span className="font-semibold" style={{ textShadow: '0px 0px 1px rgba(61,108,179,0.5)' }}>
                    {card.genre || "..."}
                  </span>
                </p>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
              </div>
              
              {/* Citation with manga style border */}
              <div className="mt-4 relative pl-1 border-l-2 border-blue-400">
                <p style={{ fontSize: '16px', color: card.textColor || '#000000' }}>
                  <span className="font-bold mr-2">CITATION FAVORITE:</span>
                </p>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                <p className="italic ml-1 overflow-hidden relative p-2 border border-dashed border-blue-300 rounded-sm bg-gradient-to-br from-white to-blue-50" style={{
                  fontSize: '15px',
                  maxHeight: '60px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  color: card.textColor || '#000000'
                }}>
                  "{card.quote || "..."}"
                  {/* Manga speech effect in corner */}
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border border-blue-300 transform rotate-45"></div>
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
              <div className="mt-4 text-center bg-gradient-to-r from-blue-200 to-blue-100 p-1 w-full shadow-sm rounded-sm relative overflow-hidden">
                {/* Manga style effects - speed lines */}
                <div className="absolute inset-0 opacity-5" style={{ 
                  backgroundImage: 'repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 5px)',
                  backgroundSize: '5px 100%',
                  zIndex: 0
                }}></div>
                
                <div className="relative z-10">
                  <p className="font-bold text-blue-700" style={{ fontSize: '14px', textShadow: '0 0 1px #3d6cb3' }}>
                    SHADOW GARDEN
                  </p>
                  <p className="font-medium text-blue-500" style={{ fontSize: '12px' }}>
                    QUARTIER GÉNÉRAL
                  </p>
                  <p className="font-bold text-blue-700 mt-1" style={{ fontSize: '13px', letterSpacing: '1px' }}>
                    EL CID
                  </p>
                  <div className="mt-1 flex justify-center">
                    <div className="text-blue-800 italic font-cursive" style={{ 
                      fontSize: '14px', 
                      fontFamily: 'cursive', 
                      letterSpacing: '1px',
                      textShadow: '0 0 1px #3d6cb3'
                    }}>
                      signature
                    </div>
                  </div>
                </div>
                
                {/* Manga style spark effects */}
                <div className="absolute top-1 right-2 w-3 h-3" style={{ 
                  background: 'radial-gradient(circle, white 0%, transparent 70%)',
                  boxShadow: '0 0 3px 1px rgba(255,255,255,0.7)'
                }}></div>
                <div className="absolute bottom-2 left-2 w-2 h-2" style={{ 
                  background: 'radial-gradient(circle, white 0%, transparent 70%)',
                  boxShadow: '0 0 2px 1px rgba(255,255,255,0.7)'
                }}></div>
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
              <div className="text-right flex flex-col">
                <p className="font-medium text-blue-600 uppercase" style={{ fontSize: '14px' }}>
                  Date: {card.issueDate || "28/04/2025"}
                </p>
                <p className="font-medium text-red-600 uppercase" style={{ fontSize: '14px' }}>
                  Exp: {card.expiryDate || "28/04/2026"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}