import { httpClient } from '../utils/HttpClient';

export async function getlistEvent() {
  const data = await httpClient.get('/listEvent');

  return data
}
export async function listEventbyFac(id : any){
  const response = await httpClient.get(`/event/findbyFac/${id}`);
  return response
}
export async function createEvent(input : any){
  const data = await httpClient.post('/createEvent', input);
  return data
}



export async function eventDetails(id : any){
  const response = await httpClient.get(`/event/find/${id}`);
  return response
}

export async function eventDelete(id : any){
  const response = await httpClient.delete(`/event/delete/${id}`);
  console.log(response);
  return response
}
export async function eventUpdate(id : any , data :any){
  const response = await httpClient.put(`/event/update/${id}` , data);
  return response
}