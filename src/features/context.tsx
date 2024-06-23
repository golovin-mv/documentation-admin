import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import PlaceholderList from "@/components/placeholder/placeholder-list.tsx";
import ContextEditor from "@/components/placeholder/context.tsx";

const Context: React.FC = () => {
  return (
    <Tabs defaultValue="placeholder" className="overflow-hidden h-full flex flex-col items-center">
      <TabsList className="mt-2">
        <TabsTrigger value="placeholder">Placeholders</TabsTrigger>
        <TabsTrigger value="context">Context</TabsTrigger>
      </TabsList>
      <TabsContent value="placeholder" className=" h-full w-full"><PlaceholderList/></TabsContent>
      <TabsContent value="context" className="w-full"><ContextEditor/></TabsContent>
    </Tabs>
  )
};

export default Context
