type Placeholder = {
  id: number,
  hrid: string,
  path: string,
  formatMask: string
  typeHrid: string
  description: string,
}

type TestTemplateRequest = {
  id: string | number,
  template: string,
  placeholders: string[],
  context: [{key: string, value: unknown}]
}

const getTemplateAccessUrl = () => {
  return JSON.parse(localStorage.getItem('setting')).state.templateAccessUrl
}

const getDocumentGeneratorUrl = () => {
  return JSON.parse(localStorage.getItem('setting')).state.documentGeneratorUrl
}

export const getAllPlaceholders = async (): Promise<Placeholder[]> => {
  const {data} = await fetch(`${getTemplateAccessUrl()}/api/v1/placeholder/placeholders?offset=0`)
    .then(res => res.json())

  return data
}

export const testTemplate = async ({id, template, placeholders, context}: TestTemplateRequest) => {
  const res = await fetch(`${getDocumentGeneratorUrl()}/api/v1/document/test`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, template, placeholders, context}),
  })

  if (!res.ok) {
    const error = await res.json();
    throw new Error(JSON.stringify(error));
  }

  const {data} = await res.json();
  return data;
}

export type {Placeholder};
