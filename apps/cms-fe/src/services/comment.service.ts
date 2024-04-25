import { httpClient } from '../utils/HttpClient';

export async function getListComment(id : any) {
  const data = await httpClient.get(`/listComment/${id}`);

  return data
}
export async function createComment(data : any){
    const res = await httpClient.post('/createComment' ,data);
    return res
  }


export async function deleteComment(id : any){
  const response = await httpClient.delete(`/removeComment/${id}`);
  console.log(response);
  return response
}
