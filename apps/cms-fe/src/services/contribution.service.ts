import { httpClient } from '../utils/HttpClient';

export async function getlistContribution(id : any) {
  const data = await httpClient.get(`/con/listCon/${id}`);

  return data
}

export async function createContribution(input : any){
  const data = await httpClient.post('/con/createCon', input);
  return data
}

export async function downloadZipContribution(fileName : any){
  const response = await httpClient.post(`/con/downloadFile/${fileName}`);
  return response
}


export async function contributionDetails(id : any){
  const response = await httpClient.get(`/con/find/${id}`);
  return response
}

export async function contributionDelete(id : any){
  const response = await httpClient.delete(`/con/delete/${id}`);
  console.log(response);
  return response
}
export async function eventUpdate(id : any , data :any){
  const response = await httpClient.put(`/con/updateFile/${id}` , data);
  return response
}