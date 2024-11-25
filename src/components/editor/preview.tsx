import React from "react";

interface PreviewProps {
  code: string
}

const Preview: React.FC<PreviewProps> = ({code}) => (
  <div className="h-full w-full drop-shadow-md">
  <iframe
    className="drop-shadow-md border border-slate-100"
    style={{width: '210mm', margin:'0 auto', backgroundColor: 'white', color:'black', height: '90vh'}}
    srcDoc={code}>
  </iframe>
  </div>
)

export default Preview
