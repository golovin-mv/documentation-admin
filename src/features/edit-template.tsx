import React from "react";
import { useParams } from "react-router-dom";

const EditTemplate = () => {
  const { id } = useParams<{ id: string }>()
  return <div>{id}</div>;
};

export default EditTemplate;
