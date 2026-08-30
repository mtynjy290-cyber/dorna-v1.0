/**
 * wordDocxImporter.ts — Word Document (.docx) Client-Side Parser
 * Extracts structured HTML, headings, paragraphs, and tables from .docx files.
 */
import mammoth from 'mammoth';

export interface DocxImportResult {
  html: string;
  rawText: string;
  messages: string[];
  suggestedTitle?: string;
  suggestedSummary?: string;
}

export async function parseDocxFile(file: File): Promise<DocxImportResult> {
  const arrayBuffer = await file.arrayBuffer();

  const options = {
    styleMap: [
      "p[style-name='Heading 1'] => h2:fresh",
      "p[style-name='Heading 2'] => h3:fresh",
      "p[style-name='Heading 3'] => h4:fresh",
      "p[style-name='Title'] => h1:fresh",
      "p[style-name='Subtitle'] => p.lead:fresh",
      "r[style-name='Strong'] => strong",
      "r[style-name='Emphasis'] => em",
      "table => table.table.table-bordered:fresh"
    ]
  };

  const result = await mammoth.convertToHtml({ arrayBuffer }, options);
  const rawTextResult = await mammoth.extractRawText({ arrayBuffer });
  
  const rawLines = rawTextResult.value
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const suggestedTitle = rawLines.length > 0 ? rawLines[0] : undefined;
  const suggestedSummary = rawLines.length > 1 ? rawLines[1] : undefined;

  return {
    html: result.value,
    rawText: rawTextResult.value,
    messages: result.messages.map((m) => m.message),
    suggestedTitle,
    suggestedSummary
  };
}
