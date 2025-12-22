import { describe, it, expect, jest } from '@jest/globals';
import { HotelQualityService } from '../services/v3/HotelQualityService';
import HotelQuality from '../models/v3/HotelQualityModel';

jest.mock('../models/v3/HotelQualityModel');
const mockedHotelQuality = HotelQuality as jest.Mocked<typeof HotelQuality>;

describe('HotelQualityService.createHotelQuality', () => {
  it('create or update a hotel quality', async () => {
    const fakeHotelQuality = {
      hotelId: 'h1',
      price: 100,
      rating: 4,
      ratioPriceQuality: 0.04,
      nbRating: 10,
    };

    mockedHotelQuality.findOneAndUpdate.mockResolvedValue(fakeHotelQuality as any);

    const result = await HotelQualityService.createHotelQuality(
      'h1',
      100,
      4,
      0.04,
      10
    );

    expect(mockedHotelQuality.findOneAndUpdate).toHaveBeenCalledWith(
      { hotelId: 'h1' },
      {
        $set: {
          hotelId: 'h1',
          price: 100,
          rating: 4,
          ratioPriceQuality: 0.04,
          nbRating: 10,
        },
      },
      { new: true, upsert: true }
    );

    expect(result.hotel).toEqual(fakeHotelQuality);
  });
});

describe('HotelQualityService.updateHotelQualityService', () => {
  it('should update hotel quality fields and save', async () => {
    const fakeHotel: any = {
      hotelId: 'h1',
      price: 100,
      rating: 4,
      nbRating: 10,
      ratioPriceQuality: 0.04,
      save: jest.fn(),
    };

    mockedHotelQuality.findOne.mockResolvedValue(fakeHotel);

    const result = await HotelQualityService.updateHotelQualityService('h1', {
      price: 200,
      rating: 5,
    });

    expect(mockedHotelQuality.findOne).toHaveBeenCalledWith({ hotelId: 'h1' });
    expect(fakeHotel.price).toBe(200);
    expect(fakeHotel.rating).toBe(5);
    expect(fakeHotel.ratioPriceQuality).toBe(5 / 200);
    expect(fakeHotel.save).toHaveBeenCalled();
    expect(result).toBe(fakeHotel);
  });

  it('should return null if hotel quality not found', async () => {
    mockedHotelQuality.findOne.mockResolvedValue(null as any);

    const result = await HotelQualityService.updateHotelQualityService('h1', {
      price: 200,
    });

    expect(result).toBeNull();
  });
});

describe('HotelQualityService.getHotelQualityById', () => {
  it('should return hotel quality if found', async () => {
    const fakeHotelQuality = {
      hotelId: 'h1',
      price: 100,
      rating: 4,
      ratioPriceQuality: 0.04,
      nbRating: 10,
    };

    mockedHotelQuality.findOne.mockResolvedValue(fakeHotelQuality as any);

    const result = await HotelQualityService.getHotelQualityById('h1');

    expect(mockedHotelQuality.findOne).toHaveBeenCalledWith({ hotelId: 'h1' });
    expect(result).toEqual(fakeHotelQuality);
  });

  it('should return null if not found', async () => {
    mockedHotelQuality.findOne.mockResolvedValue(null as any);

    const result = await HotelQualityService.getHotelQualityById('h1');

    expect(result).toBeNull();
  });
});
