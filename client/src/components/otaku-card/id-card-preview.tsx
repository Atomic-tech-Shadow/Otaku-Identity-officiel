import React, { useRef } from "react";
import { OtakuIdCard } from "@/types/id-card";
import { Image, User } from "lucide-react";
import { countries } from "@/lib/utils";
import { SecurityPattern } from "./security-pattern";
import { OtakuSeal } from "./otaku-seal";
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
        className="aspect-[1.586/1] relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow"
      >
        <SecurityPattern />

        <div className="relative z-20 h-full p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Image className="h-8 w-8 text-primary" />
              <div>
                <h2 className="font-['Orbitron'] text-lg font-bold text-primary">
                  CARTE D'IDENTITÉ
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  OTAKU OFFICIELLE
                </p>
              </div>
            </div>
            {countryData && (
              <div className="h-8 w-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden shadow-sm">
                <div
                  className="h-full w-full bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url('${countryData.flag}')` }}
                />
              </div>
            )}
          </div>

          <div className="flex-1 flex">
            <div className="w-1/3 pr-4 flex flex-col space-y-4">
              <div className="w-full aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-md shadow overflow-hidden flex items-center justify-center">
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

              {card.qrCodeEnabled && (
                <div className="relative w-full aspect-square bg-white rounded-md p-2 flex items-center justify-center">
                  {card.qrCodeLink ? (
                    <QRCodeSVG 
                      value={card.qrCodeLink} 
                      size={96} 
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

            <div className="w-2/3 pl-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    NOM D'UTILISATEUR
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {card.username || "..."}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    NOM RÉEL
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {card.realName || "..."}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    NATIONALITÉ
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {countryData?.name || "..."}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    STATUT
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {card.status || "..."}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    GENRE PRÉFÉRÉ
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {card.genre || "..."}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    CITATION
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white italic text-sm">
                    "{card.quote || "..."}"
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    NUMÉRO DE CARTE
                  </p>
                  <p className="font-['Orbitron'] text-sm font-medium text-primary">
                    {card.cardNumber || "OTK-2023-00001"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    DATE D'ÉMISSION
                  </p>
                  <p className="font-['Orbitron'] text-sm font-medium text-gray-700 dark:text-gray-300">
                    {card.issueDate || "01/01/2023"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OtakuSeal />
      </div>
    </div>
  );
}
