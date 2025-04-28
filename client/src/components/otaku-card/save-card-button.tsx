import React from "react";
import { Button } from "@/components/ui/button";
import { OtakuIdCard } from "@/types/id-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface SaveCardButtonProps {
  card: OtakuIdCard;
  className?: string;
}

export function SaveCardButton({ card, className }: SaveCardButtonProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mutation pour sauvegarder la carte
  const saveCardMutation = useMutation({
    mutationFn: async (cardData: OtakuIdCard) => {
      return apiRequest("POST", "/api/cards", cardData);
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Votre carte d'identité a été sauvegardée",
      });
      
      // Invalider le cache pour recharger les données
      queryClient.invalidateQueries({ queryKey: ["/api/cards"] });
    },
    onError: (error) => {
      console.error("Erreur de sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la carte. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  // Handler pour sauvegarder la carte
  const handleSaveCard = () => {
    // Vérifier si tous les champs requis sont remplis
    if (
      !card.username ||
      !card.realName ||
      !card.nationality ||
      !card.status ||
      !card.genre ||
      !card.quote
    ) {
      toast({
        title: "Attention",
        description: "Veuillez remplir tous les champs obligatoires avant de sauvegarder.",
        variant: "destructive",
      });
      return;
    }

    // Déclencher la mutation de sauvegarde
    saveCardMutation.mutate(card);
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={`flex items-center space-x-2 ${className}`}
      onClick={handleSaveCard}
      disabled={saveCardMutation.isPending}
    >
      <Save className="h-4 w-4" />
      <span>{saveCardMutation.isPending ? "Sauvegarde..." : "Sauvegarder la carte"}</span>
    </Button>
  );
}