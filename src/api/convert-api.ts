const getFileConverterUrl = () => {
  const url = localStorage.getItem('setting');
  if (url === null) {
    return ''
  }

  return JSON.parse(url).state.fileConverterUrl
}

export const convertFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${getFileConverterUrl()}/`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(JSON.stringify(error));
  }

  const response = await res.json();
  console.log('Convert API response:', response);
  
  if (response.content) {
    return response.content;
  } else {
    console.error('Unexpected response format:', response);
    throw new Error('Unexpected response format from convert API');
  }
} 