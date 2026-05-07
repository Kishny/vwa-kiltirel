import type { ReactNode } from "react";
import { Sparkles, Heart, Users, Calendar } from "lucide-react";

export const categoryIcons: Record<string, ReactNode> = {
  Atelier: <Sparkles className="h-4 w-4" />,
  "Soirée culturelle": <Heart className="h-4 w-4" />,
  Rencontre: <Users className="h-4 w-4" />,
  "Bien-être": <Heart className="h-4 w-4" />,
  "Vie associative": <Users className="h-4 w-4" />,
  Brunch: <Calendar className="h-4 w-4" />,
};