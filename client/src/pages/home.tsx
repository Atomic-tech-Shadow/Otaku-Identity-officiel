import React, { useRef, useState } from "react";
import { Header } from "@/components/otaku-card/header";
import { Footer } from "@/components/otaku-card/footer";
import { IdCardForm } from "@/components/otaku-card/id-card-form";
import { IdCardPreview } from "@/components/otaku-card/id-card-preview";
import { CardList } from "@/components/otaku-card/card-list";
import { SaveCardButton } from "@/components/otaku-card/save-card-button";
import { OtakuIdCard, IdCard } from "@/types/id-card";
import { elementToImage, formatCurrentDate, generateCardNumber } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [editingCard, setEditingCard] = useState<IdCard | null>(null);

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

  // Handler pour l'édition d'une carte existante
  const handleEditCard = (savedCard: IdCard) => {
    setEditingCard(savedCard);
    setCard(savedCard);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler pour la visualisation d'une carte existante
  const handleViewCard = (savedCard: IdCard) => {
    setCard(savedCard);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Réinitialiser le formulaire
  const handleResetForm = () => {
    setEditingCard(null);
    setCard({
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
  };

  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {editingCard ? "Modifier la carte" : "Créer une nouvelle carte"}
              </h2>
              {editingCard && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleResetForm}
                >
                  Nouvelle carte
                </Button>
              )}
            </div>
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
              
              <div className="mt-4 flex space-x-3">
                <Button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Télécharger</span>
                </Button>
                
                <SaveCardButton card={card} />
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                Remplissez le formulaire pour personnaliser votre carte
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <CardList 
            onEditCard={handleEditCard} 
            onViewCard={handleViewCard} 
          />
        </div>
      </main>
      
      <Footer />
    </>
  );
}
