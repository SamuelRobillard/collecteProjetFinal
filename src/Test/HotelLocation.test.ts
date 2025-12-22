import { describe, it, expect, jest } from '@jest/globals';
import { HotelLocationService } from '../services/v3/HotelLocationService';
import HotelLocation from '../models/v3/HotelLocationModel';
import FormatedStringRegex from '../Regex/FormatedStringRegex';
import { HttpError } from '../utils/HttpError';

jest.mock('../models/v3/HotelLocationModel');
jest.mock('../Regex/FormatedStringRegex', () => ({
  __esModule: true,
  default: {
    formatedString: jest.fn((v: string) => v),
  },
}));

const mockedHotelLocation = HotelLocation as jest.Mocked<typeof HotelLocation>;

describe('HotelLocationService.createHotelLocation', () => {
  it('create or update a hotel location', async () => {
    const fakeHotelLocation = {
      hotelId: 'h1',
      cityCode: 'MTL',
      countryCode: 'CA',
      latitude: 45.5,
      longitude: -73.6,
    };

    mockedHotelLocation.findOneAndUpdate.mockResolvedValue(fakeHotelLocation as any);

    const result = await HotelLocationService.createHotelLocation(
      'h1',
      'MTL',
      'CA',
      45.5,
      -73.6
    );

    expect(mockedHotelLocation.findOneAndUpdate).toHaveBeenCalledWith(
      { hotelId: 'h1' },
      {
        $set: {
          hotelId: 'h1',
          cityCode: 'MTL',
          countryCode: 'CA',
          latitude: 45.5,
          longitude: -73.6,
        },
      },
      { new: true, upsert: true }
    );

    expect(result.hotel).toEqual(fakeHotelLocation);
  });
});

describe('HotelLocationService.getHotelLocationByCity', () => {
  it('should return hotels for given city codes', async () => {
    const fakeHotels = [
      { hotelId: 'h1', cityCode: 'MTL' },
      { hotelId: 'h2', cityCode: 'MTL' },
    ];

    mockedHotelLocation.find.mockResolvedValue(fakeHotels as any);

    const result = await HotelLocationService.getHotelLocationByCity(['MTL']);

    expect(FormatedStringRegex.formatedString).toHaveBeenCalledWith('MTL');
    expect(mockedHotelLocation.find).toHaveBeenCalledWith({
      cityCode: { $in: ['MTL'] },
    });
    expect(result).toEqual(fakeHotels);
  });

  it('should return null if no hotels found', async () => {
    mockedHotelLocation.find.mockResolvedValue([] as any);

    const result = await HotelLocationService.getHotelLocationByCity(['MTL']);

    expect(result).toBeNull();
  });
});

describe('HotelLocationService.updateHotelLocationService', () => {
  it('should update hotel location if found', async () => {
    const fakeHotelLocation = {
      hotelId: 'h1',
      cityCode: 'MTL',
      countryCode: 'CA',
      latitude: 45.5,
      longitude: -73.6,
    };

    mockedHotelLocation.findOneAndUpdate.mockResolvedValue(fakeHotelLocation as any);

    const result = await HotelLocationService.updateHotelLocationService('h1', {
      cityCode: 'TOR',
    });

    expect(mockedHotelLocation.findOneAndUpdate).toHaveBeenCalledWith(
      { hotelId: 'h1' },
      { $set: { cityCode: 'TOR' } },
      { new: true, runValidators: true }
    );

    expect(result).toEqual(fakeHotelLocation);
  });

  it('should throw HttpError if hotel not found', async () => {
    mockedHotelLocation.findOneAndUpdate.mockResolvedValue(null as any);

    await expect(
      HotelLocationService.updateHotelLocationService('h1', {
        cityCode: 'TOR',
      })
    ).rejects.toBeInstanceOf(HttpError);
  });
});

describe('HotelLocationService.getHotelLocationById', () => {
  it('should return hotel location if found', async () => {
    const fakeHotelLocation = {
      hotelId: 'h1',
      cityCode: 'MTL',
      countryCode: 'CA',
      latitude: 45.5,
      longitude: -73.6,
    };

    mockedHotelLocation.findOne.mockResolvedValue(fakeHotelLocation as any);

    const result = await HotelLocationService.getHotelLocationById('h1');

    expect(mockedHotelLocation.findOne).toHaveBeenCalledWith({ hotelId: 'h1' });
    expect(result).toEqual(fakeHotelLocation);
  });

  it('should return null if not found', async () => {
    mockedHotelLocation.findOne.mockResolvedValue(null as any);

    const result = await HotelLocationService.getHotelLocationById('h1');

    expect(result).toBeNull();
  });
});
