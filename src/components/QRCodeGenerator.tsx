import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeGeneratorProps{
    text:any
}

const QRCodeGenerator:React.FC<QRCodeGeneratorProps> = ({ text }) => {
  return (
    <div className='p-3 d-flex  justify-content-center'>
      <QRCode value={text} />
    </div>
  );
};

export default QRCodeGenerator;
