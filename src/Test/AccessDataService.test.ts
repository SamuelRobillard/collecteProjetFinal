import { describe, it, expect, jest, beforeAll, afterAll } from '@jest/globals';
import { AccessDataService } from '../services/v3/AccessDataService';
import { HotelLocationService } from '../services/v3/HotelLocationService';
import { DataTransferService } from '../services/v3/DataTransferService';
import { HotelService } from '../services/v3/HotelService';

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
});

afterAll(() => {
    (console.log as jest.Mock).mockRestore();
});

jest.mock('../services/v3/HotelLocationService');
jest.mock('../services/v3/DataTransferService');
jest.mock('../services/v3/HotelService');

const mockedHotelLocationService =
    HotelLocationService as jest.Mocked<typeof HotelLocationService>;
const mockedDataTransferService =
    DataTransferService as jest.Mocked<typeof DataTransferService>;
const mockedHotelService =
    HotelService as jest.Mocked<typeof HotelService>;

describe('AccessDataService.getDataInfoByCity', () => {
    it('should return combined hotel data for a city', async () => {
        const cities = ['Paris'];

        const hotelLocations = [
            { hotelId: 'h1' },
            { hotelId: 'h2' },
        ];

        const combined1 = { hotelId: 'h1', name: 'Hotel 1' };
        const combined2 = { hotelId: 'h2', name: 'Hotel 2' };

        mockedHotelLocationService.getHotelLocationByCity
            .mockResolvedValue(hotelLocations as any);

        mockedDataTransferService.combineAllDataForOneHotelById
            .mockResolvedValueOnce(combined1 as any)
            .mockResolvedValueOnce(combined2 as any);

        const result = await AccessDataService.getDataInfoByCity(cities);

        expect(mockedHotelLocationService.getHotelLocationByCity)
            .toHaveBeenCalledWith(cities);

        expect(result).toEqual([combined1, combined2]);
    });

    it('should return null if no hotels are found', async () => {
        mockedHotelLocationService.getHotelLocationByCity
            .mockResolvedValue(null as any);

        const result = await AccessDataService.getDataInfoByCity(['Paris']);

        expect(result).toBeNull();
    });

    it('should return null if city is null', async () => {
        const result = await AccessDataService.getDataInfoByCity(null as any);
        expect(result).toBeNull();
    });
});

describe('AccessDataService.getBestHotelPriceRatioByCity', () => {
    it('should return top 10 hotels sorted by price/quality ratio', async () => {
        const hotelLocations = [
            { hotelId: 'h1' },
            { hotelId: 'h2' },
            { hotelId: 'h3' },
        ];

        mockedHotelLocationService.getHotelLocationByCity
            .mockResolvedValue(hotelLocations as any);

        mockedDataTransferService.combineAllDataForOneHotelById
            .mockImplementation(async (id: string) => ({
                hotelId: id,
                ratioPriceQuality:
                    id === 'h1' ? 5 :
                        id === 'h2' ? 2 : 8,
            }) as any);

        const result = await AccessDataService.getBestHotelPriceRatioByCity(['Paris']);

        expect(result).toEqual([
            { hotelId: 'h2', ratioPriceQuality: 2 },
            { hotelId: 'h1', ratioPriceQuality: 5 },
            { hotelId: 'h3', ratioPriceQuality: 8 },
        ]);
    });

    it('should return null if no hotels are found', async () => {
        mockedHotelLocationService.getHotelLocationByCity
            .mockResolvedValue(null as any);

        const result = await AccessDataService.getBestHotelPriceRatioByCity(['Paris']);

        expect(result).toBeNull();
    });
});

describe('AccessDataService.getAllHotelDTo', () => {
    it('should return combined data for all hotels', async () => {
        const hotelIds = ['h1', 'h2'];

        mockedHotelService.getAllHotelId
            .mockResolvedValue(hotelIds);

        mockedDataTransferService.combineAllDataForOneHotelById
            .mockImplementation(async (id: string) => ({
                hotelId: id,
                name: `Hotel ${id}`,
            }) as any);

        const result = await AccessDataService.getAllHotelDTo();

        expect(mockedHotelService.getAllHotelId).toHaveBeenCalled();
        expect(result).toEqual([
            { hotelId: 'h1', name: 'Hotel h1' },
            { hotelId: 'h2', name: 'Hotel h2' },
        ]);
    });

    it('should return null if no hotel IDs are found', async () => {
        mockedHotelService.getAllHotelId
            .mockResolvedValue(null as any);

        const result = await AccessDataService.getAllHotelDTo();

        expect(result).toBeNull();
    });
});
