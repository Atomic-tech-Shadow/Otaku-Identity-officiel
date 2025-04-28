import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IdCard } from "@/types/id-card";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface CardListProps {
  onEditCard: (card: IdCard) => void;
  onViewCard: (card: IdCard) => void;
}

export function CardList({ onEditCard, onViewCard }: CardListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [cardToDelete, setCardToDelete] = useState<number | null>(null);

  // Récupérer toutes les cartes depuis l'API
  const { data, isLoading, error } = useQuery<{ success: boolean; data: IdCard[] }>({
    queryKey: ["/api/cards"],
    // Le fetcher est déjà configuré dans queryClient.ts
  });

  // Mutation pour supprimer une carte
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/cards/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "La carte a été supprimée avec succès",
      });
      
      // Invalider le cache pour recharger les données
      queryClient.invalidateQueries({ queryKey: ["/api/cards"] });
      setCardToDelete(null);
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la carte",
        variant: "destructive",
      });
    },
  });

  // Handler pour confirmer la suppression
  const handleConfirmDelete = () => {
    if (cardToDelete !== null) {
      deleteMutation.mutate(cardToDelete);
    }
  };

  // Handler pour annuler la suppression
  const handleCancelDelete = () => {
    setCardToDelete(null);
  };

  if (isLoading) {
    return <div className="text-center py-4">Chargement des cartes...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Erreur lors du chargement des cartes
      </div>
    );
  }

  const cards = data?.data || [];

  if (cards.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Aucune carte sauvegardée. Créez votre première carte d'identité otaku !
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mes cartes sauvegardées</h2>
      
      <Table>
        <TableCaption>Liste de vos cartes d'identité otaku</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom d'utilisateur</TableHead>
            <TableHead>Nom réel</TableHead>
            <TableHead>Nationalité</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.id}>
              <TableCell className="font-medium">{card.username}</TableCell>
              <TableCell>{card.realName}</TableCell>
              <TableCell>{card.nationality}</TableCell>
              <TableCell>{card.genre}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onViewCard(card)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEditCard(card)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog open={cardToDelete === card.id} onOpenChange={(open) => !open && setCardToDelete(null)}>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setCardToDelete(card.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer cette carte d'identité ? Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDelete}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-700">
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}