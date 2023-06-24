import React from 'react';
import Barcode from 'react-barcode';
import "./common.css"

interface BarcodeGeneratorProps{
    value:any
}

const BarcodeGenerator:React.FC<BarcodeGeneratorProps> = ({ value }) => {
  return (
    <div className='p-2 d-flex  justify-content-center'>
      <Barcode value={value}  width={2.5}  textAlign="center"/>
    </div>
  );
};

export default BarcodeGenerator;
