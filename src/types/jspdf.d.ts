declare module 'jspdf' {
  export class jsPDF {
    constructor(options?: any);
    save(filename?: string): void;
    text(text: string | string[], x: number, y: number, options?: any): void;
    splitTextToSize(text: string, maxlen: number): string[];
    addPage(): void;
    setFontSize(size: number): void;
  }
  export default jsPDF;
}
