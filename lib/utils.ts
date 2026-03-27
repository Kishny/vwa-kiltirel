// lib/utils.ts

/**
 * Petite fonction utilitaire pour composer les classNames.
 * Tu peux l'utiliser partout à la place de clsx.
 */
export function cn(
  ...classes: Array<string | number | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
