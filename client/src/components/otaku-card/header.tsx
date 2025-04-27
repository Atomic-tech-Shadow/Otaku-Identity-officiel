import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Image } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-primary dark:text-primary">
            <Image className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Carte d'Identité Otaku
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
