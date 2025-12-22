import { describe, it, expect, jest, beforeAll, afterAll } from '@jest/globals';
import { ToCsvService } from '../services/v3/ToCsvService';
import { HotelService } from '../services/v3/HotelService';
import { DataTransferService } from '../services/v3/DataTransferService';
import Booking from '../models/v3/BookingModel';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterAll(() => {
    (console.warn as jest.Mock).mockRestore();
});

jest.mock('../services/v3/HotelService');
jest.mock('../services/v3/DataTransferService');
jest.mock('../models/v3/BookingModel');
jest.mock('fs');
jest.mock('fast-csv');

const mockedHotelService = HotelService as jest.Mocked<typeof HotelService>;
const mockedDataTransferService = DataTransferService as jest.Mocked<typeof DataTransferService>;
const mockedBooking = Booking as jest.Mocked<typeof Booking>;

describe('ToCsvService.createHotelCsv', () => {
    it('should return combined hotel data when hotel IDs exist', async () => {
        const hotelIds = ['h1', 'h2'];

        const combinedHotel1 = { hotelId: 'h1', name: 'Hotel 1' };
        const combinedHotel2 = { hotelId: 'h2', name: 'Hotel 2' };

        mockedHotelService.getAllHotelId.mockResolvedValue(hotelIds);

        mockedDataTransferService.combineAllDataForOneHotelById
            .mockResolvedValueOnce(combinedHotel1 as any)
            .mockResolvedValueOnce(combinedHotel2 as any);

        const result = await ToCsvService.createHotelCsv();

        expect(mockedHotelService.getAllHotelId).toHaveBeenCalled();
        expect(mockedDataTransferService.combineAllDataForOneHotelById).toHaveBeenCalledTimes(2);
        expect(result).toEqual([combinedHotel1, combinedHotel2]);
    });

    it('should return an empty array if no hotel IDs are found', async () => {
        mockedHotelService.getAllHotelId.mockResolvedValue([]);

        const result = await ToCsvService.createHotelCsv();

        expect(result).toEqual([]);
    });

    it('should filter out null or undefined hotel data', async () => {
        mockedHotelService.getAllHotelId.mockResolvedValue(['h1', 'h2']);

        mockedDataTransferService.combineAllDataForOneHotelById
            .mockResolvedValueOnce(null as any)
            .mockResolvedValueOnce({ hotelId: 'h2', name: 'Hotel 2' } as any);

        const result = await ToCsvService.createHotelCsv();

        expect(result).toEqual([{ hotelId: 'h2', name: 'Hotel 2' }]);
    });
});

describe('ToCsvService.createBookingCsv', () => {
    it('should return formatted booking data', async () => {
        const fakeBookings = [
            {
                _id: { toString: () => 'b1' },
                userId: { toString: () => 'u1' },
                hotelId: 'h1',
                dateStart: '2025-01-01',
                dateEnd: '2025-01-10',
                nbRooms: 2,
            },
        ];

        mockedBooking.find.mockReturnValue({
            lean: () => ({
                exec: jest.fn().mockImplementation(async () => fakeBookings),
            }),
        } as any);

        const result = await ToCsvService.createBookingCsv();

        expect(mockedBooking.find).toHaveBeenCalledWith({});
        expect(result).toEqual([
            {
                bookingId: 'b1',
                userId: 'u1',
                hotelId: 'h1',
                dateStart: '2025-01-01',
                dateEnd: '2025-01-10',
                nbRooms: 2,
            },
        ]);
    });

    it('should return an empty array if no bookings exist', async () => {
        mockedBooking.find.mockReturnValue({
            lean: () => ({
                exec: jest.fn().mockImplementation(async () => []),
            }),
        } as any);

        const result = await ToCsvService.createBookingCsv();

        expect(result).toEqual([]);
    });
});

describe('ToCsvService.createHotelsCsvFile', () => {
    it('should write hotels CSV file', async () => {
        const fakeData = [{ hotelId: 'h1' }];

        jest.spyOn(ToCsvService, 'createHotelCsv').mockResolvedValue(fakeData);

        const mockPipe = jest.fn().mockReturnThis();
        const mockOn = jest.fn().mockReturnThis();

        (fs.createWriteStream as jest.Mock).mockReturnValue({} as any);
        (fastcsv.write as jest.Mock).mockReturnValue({
            pipe: mockPipe,
            on: mockOn,
        });

        await ToCsvService.createHotelsCsvFile();

        expect(fs.createWriteStream).toHaveBeenCalledWith('hotels.csv');
        expect(fastcsv.write).toHaveBeenCalledWith(fakeData, { headers: true });
    });
});
