import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PDFMerger = () => {
  const [pdf1Url, setPdf1Url] = useState('');
  const [pdf2Url, setPdf2Url] = useState('');

  const mergePdfs = async () => {
    try {
      const mergedPdf = await PDFDocument.create();

      const urls = [pdf1Url, pdf2Url];
      for (let url of urls) {
        const arrayBuffer = await fetch(url).then(res => res.arrayBuffer());
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
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
