import { httpClient } from '../utils/HttpClient';

export async function getListFac() {
  const data = await httpClient.get('/listFac');

  return data
}
export async function createFac(data :any){
    const res = await httpClient.post('/createFaculty' , data);
    return res
  }
export async function facDetails(id : any){
  const response = await httpClient.get(`/fac/find/${id}`);
  return response
}

export async function facDelete(id : any){
  const response = await httpClient.delete(`/fac/delete/${id}`);
  console.log(response);
  return response
}
export async function facUpdate(id : any , data : any){
  const response = await httpClient.put(`/fac/update/${id}` , data);
  return response
}