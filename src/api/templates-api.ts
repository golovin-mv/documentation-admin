type TemplateListItem = {
  id: number,
  hrid: string,
  version: number,
  priority: number,
  description: string,
  contentType: {
    id: number,
    hrid: string,
    name: string
  },
  startDate: Date,
  endDate: Date
}


const getTemplateAccessUrl = () => {
  const settings = localStorage.getItem('setting');
  if (settings === null) {
    return ''
  }
  
  return JSON.parse(settings).state.templateAccessUrl
}

export  const templateList = async (): Promise<TemplateListItem[]> => {
  const {data} = await fetch(`${getTemplateAccessUrl()}/api/v1/template/templates`)
    .then(res => res.json())

  return data;
}

export type {TemplateListItem}