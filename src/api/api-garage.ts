import { ICar, ICarData } from '@/models/car-model';
import { garage } from '../common/constants/api-constants';

export default class ApiGarage {
  static instance = new ApiGarage();

  static async getCars(page: number, limit = 7): Promise<ICarData> {
    const queryParams: string[] = [`_page=${page}`, `_limit=${limit}`];
    const response = await fetch(`${garage}?${queryParams.join('&')}`);
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }

  static async getCar(id: string): Promise<ICar> {
    return (await fetch(`${garage}/${id}`)).json();
  }

  public async createCar(body: ICar): Promise<void> {
    console.log('body:', body);
    (
      await fetch(garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  public async deleteCar(id: string): Promise<void> {
    (
      await fetch(`${garage}/${id}`, {
        method: 'DELETE',
      })
    ).json();
  }

  public async updateCar(id: string, body: ICar) {
    return (
      await fetch(`${garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }
}
