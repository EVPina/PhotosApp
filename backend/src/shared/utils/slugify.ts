export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')                     // descompone acentos
    .replace(/[\u0300-\u036f]/g, '')      // quita marcas diacríticas
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')          // no alfanuméricos → guiones
    .replace(/^-+|-+$/g, '');             // quita guiones extremos
}