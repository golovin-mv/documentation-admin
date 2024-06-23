import React from "react";

interface PreviewProps {
  code: string
}

const Preview: React.FC<PreviewProps> = ({code}) => (
  <div className="h-full w-full">
  <iframe
    style={{width: '210mm', margin:'0 auto', backgroundColor: 'white', color:'black', height: '100vh'}}
    srcDoc={code}>
  </iframe>
  </div>
)

export default Preview
