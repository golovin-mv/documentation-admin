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

type CreteTemplateRequest = {
  hrid: string,
  startDate: string,
  endDate: string,
  priority: number,
  content: string,
  htmlContent: string,
  description: string,
  contentTypeId: 1,
  placeholdersHrid: string[]
  conditionId?: 1
}

const getTemplateAccessUrl = () => {
  return JSON.parse(localStorage.getItem('setting')).state.templateAccessUrl
}

export  const templateList = async (): Promise<TemplateListItem[]> => {
  const {data} = await fetch(`${getTemplateAccessUrl()}/api/v1/template/templates`)
    .then(res => res.json())

  return data;
}
