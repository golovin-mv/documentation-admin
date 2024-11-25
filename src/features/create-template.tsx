import React from "react";
import HtmlEditor from "@/features/editor.tsx";
import Context from "@/features/context.tsx";

const CreateTemplate: React.FC = () => {
  return (
    <div className="flex flex-row overflow-hidden h-screen ">
      <div className="w-3/4">
        <HtmlEditor/>
      </div>
      <div style={{
        backgroundColor: 'hsl(var(--secondary))'
      }} className="w-1/4 h-full overflow-hidden border-solid px-2 ">
        <Context/>
      </div>
    </div>
  )
}

export default CreateTemplate
