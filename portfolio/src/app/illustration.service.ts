import axios from 'axios';
import { Injectable } from '@angular/core';
import { Illustration } from './illustration';
import { IllustrationCreate } from './illustration-create';

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  protected illustrationList: Illustration[] = [
    {
      "id": 1,
      "name": "Nombre",
      "description": "Descripción",
      "visibility": true
    }
  ]
  constructor() { }

  postIllustration(newIllustration: IllustrationCreate) {
    const formData = new FormData();
    if(newIllustration.name) formData.append("name", newIllustration.name);
    if(newIllustration.description) formData.append("description", newIllustration.description);
    formData.append("visibility", newIllustration.visibility.toString());
    if(newIllustration.image) formData.append("image", newIllustration.image);
    console.log(formData)
    return axios.post('http://localhost:8080/illustrations/', 
      formData
    )
  }
  getAllIllustrations(): Illustration[] {
    return this.illustrationList;
  }
  getIllustrationById(id: Number): Illustration | undefined {
    return this.illustrationList.find(illustration => illustration.id === id);
  }
}
