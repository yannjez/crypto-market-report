import { parse } from 'node-html-parser';

/**
 * Extrait le contenu du body d'un fichier HTML
 */
export function extractBodyContent(html: string): string {
  const root = parse(html);
  const body = root.querySelector('body');
  return body ? body.innerHTML : '';
}

/**
 * Extrait le titre de la page
 */
export function extractTitle(html: string): string {
  const root = parse(html);
  const title = root.querySelector('title');
  return title ? title.textContent.trim() : 'Crypto Daily Report';
}

