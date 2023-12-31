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
    formData.append("name", newIllustration.name);
    formData.append("description", newIllustration.description);
    // if (newIllustration.image.length == 1) {
    //   let image = newIllustration.image[0].file;
    //   formData.append("image", image);
    // }
    formData.append("visibility", newIllustration.visibility.toString());
    formData.append("image", newIllustration.image);

    return axios.post('localhost:8080/illustrations/', {
      formData
    })
  }
  getAllIllustrations(): Illustration[] {
    return this.illustrationList;
  }
  getIllustrationById(id: Number): Illustration | undefined {
    return this.illustrationList.find(illustration => illustration.id === id);
  }
}
