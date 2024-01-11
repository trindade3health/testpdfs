import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PDFMerger = () => {
  const [pdf1Url, setPdf1Url] = useState('https://www.ufp.pt/app/uploads/2021/05/Pr%C3%A9-Requisitos-do-Grupo-A.pdf');
  const [pdf2Url, setPdf2Url] = useState('https://www.cespu.pt/media/1080905/av_2023_35-Conc-Espec-23-anos_2023-24_3-FASE.pdf');

  const mergePdfs = async () => {
    try {
      const mergedPdf = await PDFDocument.create();

      const urls = [pdf1Url, pdf2Url];
      for (let url of urls) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach(page => mergedPdf.addPage(page));
        } catch (e) {
          console.error('Erro ao buscar ou processar o PDF:', e);
          return; // Para interromper a execução no caso de erro
        }
      }

      const mergedPdfFile = await mergedPdf.saveAsBlob();
      const blobUrl = URL.createObjectURL(mergedPdfFile);
      window.open(blobUrl, '_blank');
    } catch (error) {
      console.error('Erro ao mesclar PDFs: ', error);
    }
  };

  return (
    <div>
    <input type="text" value={pdf1Url} onChange={e => setPdf1Url(e.target.value)} placeholder="URL do PDF 1" />
      
    <input type="text" value={pdf2Url} onChange={e => setPdf2Url(e.target.value)} placeholder="URL do PDF 2" />
      <button onClick={mergePdfs}>Mesclar PDFs</button>
    </div>
  );
};

export default PDFMerger;
