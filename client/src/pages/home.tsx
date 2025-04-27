import React, { useRef, useState } from "react";
import { Header } from "@/components/otaku-card/header";
import { Footer } from "@/components/otaku-card/footer";
import { IdCardForm } from "@/components/otaku-card/id-card-form";
import { IdCardPreview } from "@/components/otaku-card/id-card-preview";
import { OtakuIdCard } from "@/types/id-card";
import { elementToImage, formatCurrentDate, generateCardNumber } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  const [card, setCard] = useState<OtakuIdCard>({
    username: "",
    realName: "",
    nationality: "",
    status: "Otaku",
    genre: "Shonen",
    quote: "",
    photo: undefined,
    qrCodeEnabled: false,
    qrCodeLink: "",
    cardNumber: generateCardNumber(),
    issueDate: formatCurrentDate(),
  });

  const handleCardChange = (newCard: OtakuIdCard) => {
    setCard((prev) => ({
      ...prev,
      ...newCard,
    }));
  };

  const handleDownload = async () => {
    if (!cardRef.current) {
      toast({
        title: "Erreur",
        description: "Impossible de générer l'image",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "En cours...",
        description: "Génération de votre carte d'identité",
      });

      const dataUrl = await elementToImage(cardRef.current);
      
      // Create download link
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `carte-otaku-${card.username || "anonyme"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Succès",
        description: "Votre carte d'identité a été téléchargée",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger l'image",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Security pattern styles moved to index.css */}
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <IdCardForm
            initialCard={card}
            onCardChange={handleCardChange}
            onDownload={handleDownload}
          />
        </div>
        
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <div className="sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Aperçu de votre carte
            </h2>
            <IdCardPreview card={card} cardRef={cardRef} />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Remplissez le formulaire pour personnaliser votre carte
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
