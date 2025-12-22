
jest.mock('@faker-js/faker', () => ({
  faker: {
    number: {
      int: jest.fn(() => 42),
    },
    commerce: {
      price: jest.fn(({ min = 1, max = 5, dec = 0 } = {}) => {

        return String(min);
      }),
    },
  },
}));

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { StockHotelService } from '../services/v3/StockHotelService';
import { ApiCall } from '../services/v3/ApiCall';
import { HotelService } from '../services/v3/HotelService';
import { HotelLocationService } from '../services/v3/HotelLocationService';
import { HotelQualityService } from '../services/v3/HotelQualityService';
import { DataTransferService } from '../services/v3/DataTransferService';

jest.mock('../services/v3/ApiCall');
jest.mock('../services/v3/HotelService');
jest.mock('../services/v3/HotelLocationService');
jest.mock('../services/v3/HotelQualityService');
jest.mock('../services/v3/DataTransferService');

const mockedApiCall = ApiCall as jest.Mocked<typeof ApiCall>;
const mockedHotelService = HotelService as jest.Mocked<typeof HotelService>;
const mockedHotelLocationService = HotelLocationService as jest.Mocked<typeof HotelLocationService>;
const mockedHotelQualityService = HotelQualityService as jest.Mocked<typeof HotelQualityService>;
const mockedDataTransferService = DataTransferService as jest.Mocked<typeof DataTransferService>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('StockHotelService.createLots', () => {
  it('creates hotels and locations when response contains valid data', async () => {
    const hotels = [
      {
        name: 'Hotel Alpha',
        hotelId: 'H1',
        chainCode: 'AA',
        geoCode: { latitude: 45.5, longitude: -73.6 },
        address: { lines: ['123 Rue'], cityName: 'Montreal', countryCode: 'CA' },
        distance: { value: 1.2, unit: 'KM' },
      },
      {
        name: 'Hotel Beta',
        hotelId: 'H2',
        chainCode: 'BB',
        geoCode: { latitude: 48.8, longitude: 2.3 },
        address: { lines: ['456 Ave'], cityName: 'Paris', countryCode: 'FR' },
        distance: { value: 3.4, unit: 'KM' },
      },
    ];

    // StockHotelService expects an object with a `data` array
    mockedApiCall.getAHugeBunchOfHotel.mockResolvedValue({ data: hotels } as any);

    await StockHotelService.createLots();

    expect(mockedHotelService.createHotel).toHaveBeenCalledTimes(2);
    expect(mockedHotelLocationService.createHotelLocation).toHaveBeenCalledTimes(2);
    expect(mockedHotelService.createHotel).toHaveBeenNthCalledWith(1, 'H1', 'Hotel Alpha');
    expect(mockedHotelService.createHotel).toHaveBeenNthCalledWith(2, 'H2', 'Hotel Beta');
    expect(mockedHotelLocationService.createHotelLocation).toHaveBeenNthCalledWith(
      1,
      'H1',
      'Montreal',
      'CA',
      45.5,
      -73.6,
    );
  });

  it('does nothing when response has no hotels', async () => {
    mockedApiCall.getAHugeBunchOfHotel.mockResolvedValue({ data: [] } as any);

    await StockHotelService.createLots();

    expect(mockedHotelService.createHotel).not.toHaveBeenCalled();
    expect(mockedHotelLocationService.createHotelLocation).not.toHaveBeenCalled();
  });
});

describe('StockHotelService.createHotelByCity', () => {
  it('creates entries for non-test hotels and formats city name', async () => {
    const hotels = [
      {
        name: 'Test Hotel',
        hotelId: 'T1',
        geoCode: { latitude: 10, longitude: 20 },
        address: { cityName: 'City', countryCode: 'CC' },
      },
      {
        name: 'Grand Montréal',
        hotelId: 'M1',
        geoCode: { latitude: 45.508, longitude: -73.587 },
        address: { cityName: '  Montréal  ', countryCode: 'CA' },
      },
    ];

    mockedApiCall.getHotelByCityCode.mockResolvedValue({ data: hotels } as any);

    await StockHotelService.createHotelByCity('YUL', 50);

    // "Test Hotel" should be filtered out; only one call expected
    expect(mockedHotelService.createHotel).toHaveBeenCalledTimes(1);
    expect(mockedHotelService.createHotel).toHaveBeenCalledWith('M1', 'Grand Montréal');

    // City name should be formatted (lowercased, trimmed, accents removed)
    expect(mockedHotelLocationService.createHotelLocation).toHaveBeenCalledWith(
      'M1',
      'montreal',
      'CA',
      45.508,
      -73.587,
    );
  });
});

describe('StockHotelService.fillBd', () => {
  it('calls createHotelByPriceApi for hotels without quality data', async () => {
    mockedHotelService.getAllHotelId.mockResolvedValue(['A1', 'A2']);
    // First hotel has quality, second does not
    mockedHotelQualityService.getHotelQualityById
      .mockResolvedValueOnce({} as any)
      .mockResolvedValueOnce(null);

    const spy = jest.spyOn(StockHotelService, 'createHotelByPriceApi').mockResolvedValue(undefined as any);

    const result = await StockHotelService.fillBd();

    // Allow pending promises inside forEach to run
    await new Promise((r) => setTimeout(r, 0));

    expect(result).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['A2']);

    spy.mockRestore();
  });
});

describe('StockHotelService.createHotelByPriceApi', () => {
  it('creates and updates quality when existing combined data found', async () => {
    mockedDataTransferService.combineAllDataForOneHotelById.mockResolvedValue({
      price: 100,
      rating: 80,
      nbRating: 200,
    } as any);

    await StockHotelService.createHotelByPriceApi(['H100']);

    expect(mockedHotelQualityService.createHotelQuality).toHaveBeenCalledWith('H100', 0, 0, 0, 0);
    expect(mockedHotelQualityService.updateHotelQualityService).toHaveBeenCalledWith(
      'H100',
      expect.objectContaining({
        price: expect.any(Number),
        rating: expect.any(Number),
        nbRating: expect.any(Number),
      }),
    );
  });

  it('creates and updates quality with random values when no combined data', async () => {
    mockedDataTransferService.combineAllDataForOneHotelById.mockResolvedValue(null);

    await StockHotelService.createHotelByPriceApi(['H200']);

    expect(mockedHotelQualityService.createHotelQuality).toHaveBeenCalledWith('H200', 0, 0, 0, 0);
    expect(mockedHotelQualityService.updateHotelQualityService).toHaveBeenCalledWith(
      'H200',
      expect.objectContaining({
        price: expect.any(Number),
        rating: expect.any(Number),
        nbRating: expect.any(Number),
      }),
    );
  });
});
