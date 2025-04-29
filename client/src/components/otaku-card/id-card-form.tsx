import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtakuIdCard } from "@/types/id-card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Download, Upload } from "lucide-react";
import { animeGenres, countries, otakuStatuses, cropToPassportFormat, generateCardNumber, formatCurrentDate } from "@/lib/utils";
import { CardValidationSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";

interface IdCardFormProps {
  initialCard: OtakuIdCard;
  onCardChange: (card: OtakuIdCard) => void;
  onDownload: () => void;
}

export function IdCardForm({ initialCard, onCardChange, onDownload }: IdCardFormProps) {
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(initialCard.photo);
  
  const form = useForm<OtakuIdCard>({
    resolver: zodResolver(CardValidationSchema),
    defaultValues: initialCard,
  });

  const watchedValues = form.watch();

  React.useEffect(() => {
    onCardChange(watchedValues);
  }, [watchedValues, onCardChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximale est de 2MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      
      // Recadrer l'image au format passeport (3:4)
      try {
        const croppedImage = await cropToPassportFormat(result);
        setPhotoPreview(croppedImage);
        form.setValue("photo", croppedImage);
        toast({
          title: "Photo recadrée",
          description: "Votre photo a été automatiquement recadrée au format passeport",
        });
      } catch (error) {
        console.error("Erreur lors du recadrage de l'image:", error);
        setPhotoPreview(result);
        form.setValue("photo", result);
      }
    };
    reader.readAsDataURL(file);
  }, [form, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    maxFiles: 1,
  });

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Créez votre identité
      </h2>

      <Form {...form}>
        <form className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col space-y-2">
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo de profil
            </FormLabel>
            <div className="flex items-center space-x-4">
              <div 
                className="w-24 h-24 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
              >
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    <Upload size={24} />
                  </div>
                )}
              </div>
              <div>
                <div
                  {...getRootProps()}
                  className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary-dark transition text-sm font-medium"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? "Déposez ici" : "Choisir une photo"}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  JPG, PNG ou GIF (max. 2MB)
                </p>
              </div>
            </div>
          </div>

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="KawaiiSenpai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Real Name */}
          <FormField
            control={form.control}
            name="realName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom réel</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationalité</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner votre pays" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(countries).map(([code, country]) => (
                      <SelectItem key={code} value={code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner votre statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {otakuStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Favorite Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre d'anime préféré</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {animeGenres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Favorite Quote */}
          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citation favorite</FormLabel>
                <FormControl>
                  <textarea 
                    placeholder="Omae wa mou shindeiru..." 
                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Vous pouvez écrire une citation sur plusieurs lignes (max 150 caractères)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Generate QR Code */}
          <FormField
            control={form.control}
            name="qrCodeEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Générer un QR code</FormLabel>
                  <FormDescription>
                    Ajouter un QR code sur votre carte
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* QR Code Link (conditional) */}
          {form.watch("qrCodeEnabled") && (
            <>
              <FormField
                control={form.control}
                name="qrCodeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lien pour le QR code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://myanimelist.net/profile/username"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Entrez n'importe quelle URL de réseau social (Facebook, Twitter, Instagram, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => form.setValue("qrCodeLink", "https://www.facebook.com/")}
                >
                  Facebook
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => form.setValue("qrCodeLink", "https://twitter.com/")}
                >
                  Twitter
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => form.setValue("qrCodeLink", "https://www.instagram.com/")}
                >
                  Instagram
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => form.setValue("qrCodeLink", "https://myanimelist.net/profile/")}
                >
                  MyAnimeList
                </Button>
              </div>
            </>
          )}

          {/* Customization Options */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Personnalisation de la carte
            </h3>
            
            {/* Card Color */}
            <FormField
              control={form.control}
              name="cardColor"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Couleur de la carte</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        className="w-12 h-8 border rounded cursor-pointer" 
                        value={field.value || "#3d6cb3"} 
                        onChange={field.onChange} 
                      />
                      <Input 
                        type="text" 
                        value={field.value || "#3d6cb3"} 
                        onChange={field.onChange} 
                        className="w-24" 
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => field.onChange("#3d6cb3")}
                      >
                        Défaut
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Text Color */}
            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Couleur du texte</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        className="w-12 h-8 border rounded cursor-pointer" 
                        value={field.value || "#000000"} 
                        onChange={field.onChange} 
                      />
                      <Input 
                        type="text" 
                        value={field.value || "#000000"} 
                        onChange={field.onChange} 
                        className="w-24" 
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => field.onChange("#000000")}
                      >
                        Défaut
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Background Color */}
            <FormField
              control={form.control}
              name="backgroundColor"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Couleur du fond</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        className="w-12 h-8 border rounded cursor-pointer" 
                        value={field.value || "#f8f6e9"} 
                        onChange={field.onChange} 
                      />
                      <Input 
                        type="text" 
                        value={field.value || "#f8f6e9"} 
                        onChange={field.onChange} 
                        className="w-24" 
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => field.onChange("#f8f6e9")}
                      >
                        Défaut
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          {/* Download Button */}
          <div className="pt-4">
            <Button
              type="button"
              onClick={onDownload}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-md transition shadow-sm flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Télécharger la carte</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
