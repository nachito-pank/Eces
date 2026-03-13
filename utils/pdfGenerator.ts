import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfEdtOptions {
  filiere: string;
  niveau: string;
  type: 'cours' | 'sessions';
  data: any;
}

export async function generateEdtPdf(options: PdfEdtOptions): Promise<void> {
  const { filiere, niveau, type, data } = options;
  
  // Créer un nouveau document PDF
  const pdf = new jsPDF('l', 'mm', 'a4'); // Mode paysage pour plus d'espace
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // En-tête universitaire
  const headerHeight = 50;
  
  // Logo de l'école (placeholder)
  pdf.setFillColor(0, 0, 139); // Bleu marine
  pdf.rect(0, 0, pageWidth, headerHeight, 'F');
  
  // Texte de l'en-tête
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ECOLE COMMUNAUTAIRE DE L\'ENSEIGNEMENT SUPERIEUR', pageWidth / 2, 15, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('AGREMENT DEFINITIF B,P : 2852-BRAZZAVILLE/CONGO', pageWidth / 2, 25, { align: 'center' });
  
  pdf.setFontSize(8);
  pdf.text('Brazzaville, Congo', pageWidth / 2, 35, { align: 'center' });
  
  // Ligne de séparation
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(2);
  pdf.line(20, headerHeight - 5, pageWidth - 20, headerHeight - 5);
  
  // Titre du document
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  const title = type === 'cours' ? 'EMPLOI DU TEMPS - COURS HEBDOMADAIRES' : 'EMPLOI DU TEMPS - SESSIONS D\'EXAMENS';
  pdf.text(title, pageWidth / 2, headerHeight + 15, { align: 'center' });
  
  // Informations
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Filière: ${filiere}`, 20, headerHeight + 30);
  pdf.text(`Niveau: ${niveau}`, 20, headerHeight + 40);
  
  // Date de génération
  const dateGeneration = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  pdf.setFontSize(10);
  pdf.text(`Généré le: ${dateGeneration}`, pageWidth - 20, headerHeight + 40, { align: 'right' });
  
  let currentY = headerHeight + 55;
  
  if (type === 'cours') {
    // Tableau des cours
    const tableHeaders = ['Jour', 'Heure', 'Matière', 'Professeur', 'Salle'];
    const columnWidths = [40, 50, 80, 70, 40];
    const rowHeight = 12;
    
    // En-tête du tableau
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, currentY, pageWidth - 40, rowHeight, 'F');
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    
    let currentX = 20;
    tableHeaders.forEach((header, index) => {
      pdf.text(header, currentX + 2, currentY + 8);
      currentX += columnWidths[index];
    });
    
    currentY += rowHeight;
    
    // Données du tableau
    pdf.setFont('helvetica', 'normal');
    data.cours?.forEach((cours: any, index: number) => {
      // Vérifier si on a besoin d'une nouvelle page
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = 30;
        
        // Répéter l'en-tête sur la nouvelle page
        pdf.setFillColor(0, 0, 139);
        pdf.rect(0, 0, pageWidth, headerHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('ECOLE COMMUNAUTAIRE DE L\'ENSEIGNEMENT SUPERIEUR', pageWidth / 2, 15, { align: 'center' });
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text('AGREMENT DEFINITIF B,P : 2852-BRAZZAVILLE/CONGO', pageWidth / 2, 25, { align: 'center' });
        pdf.setFontSize(8);
        pdf.text('Brazzaville, Congo', pageWidth / 2, 35, { align: 'center' });
        
        // Répéter l'en-tête du tableau
        pdf.setFillColor(240, 240, 240);
        pdf.rect(20, currentY, pageWidth - 40, rowHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        
        currentX = 20;
        tableHeaders.forEach((header, index) => {
          pdf.text(header, currentX + 2, currentY + 8);
          currentX += columnWidths[index];
        });
        
        currentY += rowHeight;
        pdf.setFont('helvetica', 'normal');
      }
      
      // Ligne de données
      if (index % 2 === 0) {
        pdf.setFillColor(248, 248, 248);
        pdf.rect(20, currentY, pageWidth - 40, rowHeight, 'F');
      }
      
      pdf.setTextColor(0, 0, 0);
      let currentX = 20;
      
      const rowData = [
        cours.jour || '',
        `${cours.heureDebut || ''} - ${cours.heureFin || ''}`,
        cours.matiere || '',
        cours.professeur || '',
        cours.salle || ''
      ];
      
      rowData.forEach((cellData, cellIndex) => {
        // Gérer le texte trop long avec splitTextToSize
        const maxWidth = columnWidths[cellIndex] - 4;
        const text = pdf.splitTextToSize(cellData, maxWidth);
        pdf.text(text[0], currentX + 2, currentY + 8);
        currentX += columnWidths[cellIndex];
      });
      
      currentY += rowHeight;
    });
    
  } else {
    // Sessions d'examens
    const tableHeaders = ['Session', 'Date', 'Heure', 'Durée', 'Matière', 'Salle'];
    const columnWidths = [35, 35, 30, 25, 90, 40];
    const rowHeight = 12;
    
    // En-tête du tableau
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, currentY, pageWidth - 40, rowHeight, 'F');
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    
    let currentX = 20;
    tableHeaders.forEach((header, index) => {
      pdf.text(header, currentX + 2, currentY + 8);
      currentX += columnWidths[index];
    });
    
    currentY += rowHeight;
    
    // Données du tableau
    pdf.setFont('helvetica', 'normal');
    data.forEach((session: any, index: number) => {
      // Vérifier si on a besoin d'une nouvelle page
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = 30;
        
        // Répéter l'en-tête sur la nouvelle page
        pdf.setFillColor(0, 0, 139);
        pdf.rect(0, 0, pageWidth, headerHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('ECOLE COMMUNAUTAIRE DE L\'ENSEIGNEMENT SUPERIEUR', pageWidth / 2, 15, { align: 'center' });
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text('AGREMENT DEFINITIF B,P : 2852-BRAZZAVILLE/CONGO', pageWidth / 2, 25, { align: 'center' });
        pdf.setFontSize(8);
        pdf.text('Brazzaville, Congo', pageWidth / 2, 35, { align: 'center' });
        
        // Répéter l'en-tête du tableau
        pdf.setFillColor(240, 240, 240);
        pdf.rect(20, currentY, pageWidth - 40, rowHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        
        currentX = 20;
        tableHeaders.forEach((header, index) => {
          pdf.text(header, currentX + 2, currentY + 8);
          currentX += columnWidths[index];
        });
        
        currentY += rowHeight;
        pdf.setFont('helvetica', 'normal');
      }
      
      // Ligne de données
      if (index % 2 === 0) {
        pdf.setFillColor(248, 248, 248);
        pdf.rect(20, currentY, pageWidth - 40, rowHeight, 'F');
      }
      
      pdf.setTextColor(0, 0, 0);
      let currentX = 20;
      
      const rowData = [
        session.session || '',
        new Date(session.date).toLocaleDateString('fr-FR'),
        session.heure || '',
        session.duree || '',
        session.matiere || '',
        session.salle || ''
      ];
      
      rowData.forEach((cellData, cellIndex) => {
        // Gérer le texte trop long avec splitTextToSize
        const maxWidth = columnWidths[cellIndex] - 4;
        const text = pdf.splitTextToSize(cellData, maxWidth);
        pdf.text(text[0], currentX + 2, currentY + 8);
        currentX += columnWidths[cellIndex];
      });
      
      currentY += rowHeight;
    });
  }
  
  // Pied de page
  const footerY = pageHeight - 20;
  pdf.setDrawColor(0, 0, 139);
  pdf.setLineWidth(1);
  pdf.line(20, footerY, pageWidth - 20, footerY);
  
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Document généré par le système de gestion ECES', pageWidth / 2, footerY + 10, { align: 'center' });
  
  // Téléchargement du PDF
  const fileName = `EDT_${type}_${filiere.replace(/\s+/g, '_')}_${niveau}_${Date.now()}.pdf`;
  pdf.save(fileName);
}

// Fonction alternative pour générer un PDF à partir d'un élément HTML
export async function generatePdfFromElement(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }
  
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 40;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  let heightLeft = imgHeight;
  let position = 20;
  
  pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  
  pdf.save(filename);
}
