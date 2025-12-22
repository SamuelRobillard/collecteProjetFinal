import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { ApiCall } from '../services/v3/ApiCall';
import api from '../utils/v3/axiosClient';

jest.mock('../utils/v3/axiosClient');

const mockedApi = api as jest.Mocked<typeof api>;


let errorSpy: ReturnType<typeof jest.spyOn>;
let logSpy: ReturnType<typeof jest.spyOn>;

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  errorSpy.mockRestore();
  logSpy.mockRestore();
});



describe('ApiCall', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAHugeBunchOfHotel', () => {
    it('should fetch hotels by geocode', async () => {
      const fakeResponse = { data: { hotels: ['h1', 'h2'] } };

      mockedApi.get.mockResolvedValue(fakeResponse as any);

      const result = await ApiCall.getAHugeBunchOfHotel(45.5, -73.6);

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/v1/reference-data/locations/hotels/by-geocode',
        {
          params: {
            latitude: 45.5,
            longitude: -73.6,
            radius: 300,
            radiusUnit: 'KM',
            hotelSource: 'ALL',
          },
          headers: {
            accept: 'application/vnd.amadeus+json',
          },
        }
      );

      expect(result).toEqual(fakeResponse.data);
    });
  });

  describe('getHotelByCityCode', () => {
    it('should fetch hotels by city code', async () => {
      const fakeResponse = { data: { hotels: ['h1', 'h2'] } };

      mockedApi.get.mockResolvedValue(fakeResponse as any);

      const result = await ApiCall.getHotelByCityCode('MTL', 50);

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/v1/reference-data/locations/hotels/by-city',
        {
          params: {
            cityCode: 'MTL',
            radius: 50,
            radiusUnit: 'KM',
            hotelSource: 'ALL',
          },
          headers: {
            accept: 'application/vnd.amadeus+json',
          },
        }
      );

      expect(result).toEqual(fakeResponse.data);
    });
  });

  describe('getPriceByListOfHotel', () => {
    it('should return hotelId and price if present', async () => {
      const fakeResponse = {
        data: {
          data: [
            {
              hotel: { hotelId: 'h1' },
              offers: [{ id: 'offer1', price: { total: '123.45' } }],
            },
          ],
        },
      };

      mockedApi.get.mockResolvedValue(fakeResponse as any);

      const result = await ApiCall.getPriceByListOfHotel(['h1', 'h2']);

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/v3/shopping/hotel-offers',
        {
          params: {
            hotelIds: 'h1,h2',
            currency: 'CAD',
            paymentPolicy: 'NONE',
          },
          headers: {
            accept: 'application/vnd.amadeus+json',
          },
        }
      );

      expect(result).toEqual(['h1', '123.45']);
    });

    it('should return comma list if response format is unexpected', async () => {
      const fakeResponse = {
        data: { data: [] },
      };

      mockedApi.get.mockResolvedValue(fakeResponse as any);

      const result = await ApiCall.getPriceByListOfHotel(['h1', 'h2']);

      expect(result).toBe('h1,h2');
    });

    it('should return comma list if api throws error', async () => {
      mockedApi.get.mockRejectedValue(new Error('API error'));

      const result = await ApiCall.getPriceByListOfHotel(['h1', 'h2']);

      expect(result).toBe('h1,h2');
    });
  });

  describe('getHotelSentimentByHotelId', () => {
    it('should fetch hotel sentiment', async () => {
      const fakeResponse = { data: 'positive' };

      mockedApi.get.mockResolvedValue(fakeResponse as any);

      const result = await ApiCall.getHotelSentimentByHotelId('h1');

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/v2/e-reputation/hotel-sentiments',
        {
          params: {
            hotelIds: 'h1',
          },
          headers: {
            accept: 'application/vnd.amadeus+json',
          },
        }
      );

      expect(result).toEqual(fakeResponse.data);
    });
  });
});
