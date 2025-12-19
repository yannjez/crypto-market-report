import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const REPORTS_DIR = "./reports";

export interface Report {
  date: string; // Format: YYYY-MM-DD
  filename: string;
  content: string;
}

/**
 * Extrait la date du nom de fichier
 * Format attendu: crypto-daily-report-YYYY-MM-DD.html
 */
function extractDate(filename: string): string | null {
  const match = filename.match(/crypto-daily-report-(\d{4}-\d{2}-\d{2})\.html/);
  return match ? match[1] : null;
}

/**
 * Récupère tous les rapports disponibles
 */
export function getAllReports(): Report[] {
  try {
    const files = readdirSync(REPORTS_DIR);
    const reports: Report[] = [];

    for (const file of files) {
      if (file.endsWith(".html") && file.startsWith("crypto-daily-report-")) {
        const date = extractDate(file);
        if (date) {
          const filePath = join(REPORTS_DIR, file);
          const content = readFileSync(filePath, "utf-8");
          reports.push({
            date,
            filename: file,
            content,
          });
        }
      }
    }

    // Trier par date décroissante (plus récent en premier)
    return reports.sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error("Error reading reports:", error);
    return [];
  }
}

/**
 * Récupère un rapport par date
 */
export function getReportByDate(date: string): Report | null {
  const filename = `crypto-daily-report-${date}.html`;
  const filePath = join(REPORTS_DIR, filename);

  try {
    const content = readFileSync(filePath, "utf-8");
    return {
      date,
      filename,
      content,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Récupère le dernier rapport (le plus récent)
 */
export function getLatestReport(): Report | null {
  const reports = getAllReports();
  return reports.length > 0 ? reports[0] : null;
}

/**
 * Récupère le rapport précédent par date
 */
export function getPreviousReport(date: string): Report | null {
  const reports = getAllReports();
  const currentIndex = reports.findIndex((r) => r.date === date);
  return currentIndex >= 0 && currentIndex < reports.length - 1
    ? reports[currentIndex + 1]
    : null;
}

/**
 * Récupère le rapport suivant par date
 */
export function getNextReport(date: string): Report | null {
  const reports = getAllReports();
  const currentIndex = reports.findIndex((r) => r.date === date);
  return currentIndex > 0 ? reports[currentIndex - 1] : null;
}
