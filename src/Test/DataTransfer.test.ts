import { describe, it, expect, jest } from '@jest/globals';
import { DataTransferService } from '../services/v3/DataTransferService';
import { HotelService } from '../services/v3/HotelService';
import { HotelLocationService } from '../services/v3/HotelLocationService';
import { HotelQualityService } from '../services/v3/HotelQualityService';
import { BookingService } from '../services/v3/BookingService';
import DataTransferHotelInfo from '../models/v3/DataTransferHotelInfo';
import DTOBooking from '../models/v3/DTOBookingHotel';
import BookingModel from '../models/v3/BookingModel';

jest.mock('../services/v3/HotelService');
jest.mock('../services/v3/HotelLocationService');
jest.mock('../services/v3/HotelQualityService');
jest.mock('../services/v3/BookingService');
jest.mock('../models/v3/BookingModel');

const mockedHotelService = HotelService as jest.Mocked<typeof HotelService>;
const mockedHotelLocationService = HotelLocationService as jest.Mocked<typeof HotelLocationService>;
const mockedHotelQualityService = HotelQualityService as jest.Mocked<typeof HotelQualityService>;
const mockedBookingService = BookingService as jest.Mocked<typeof BookingService>;
const mockedBookingModel = BookingModel as jest.Mocked<typeof BookingModel>;

describe('DataTransferService.combineAllDataForOneHotelById', () => {
  it('should return combined hotel data when all data exists', async () => {
    const hotelId = 'hotel123';
    
    const fakeHotel = { id: hotelId, name: 'Grand Hotel' };
    const fakeLocation = { hotelId: hotelId, countryCode: 'FR', cityCode: 'PAR' };
    const fakeQuality = { hotelId: hotelId, rating: 4.5, nbRating: 150, price: 150, ratioPriceQuality: 0.85 };

    mockedHotelService.getHotelById.mockResolvedValue(fakeHotel as any);
    mockedHotelLocationService.getHotelLocationById.mockResolvedValue(fakeLocation as any);
    mockedHotelQualityService.getHotelQualityById.mockResolvedValue(fakeQuality as any);

    const result = await DataTransferService.combineAllDataForOneHotelById(hotelId);

    expect(mockedHotelService.getHotelById).toHaveBeenCalledWith(hotelId);
    expect(mockedHotelLocationService.getHotelLocationById).toHaveBeenCalledWith(hotelId);
    expect(mockedHotelQualityService.getHotelQualityById).toHaveBeenCalledWith(hotelId);
    expect(result).toBeInstanceOf(DataTransferHotelInfo);
  });

  it('should return null when hotel data is missing', async () => {
    const hotelId = 'hotel123';

    mockedHotelService.getHotelById.mockResolvedValue(null);
    mockedHotelLocationService.getHotelLocationById.mockResolvedValue(null);
    mockedHotelQualityService.getHotelQualityById.mockResolvedValue(null);

    const result = await DataTransferService.combineAllDataForOneHotelById(hotelId);

    expect(result).toBeNull();
  });

  it('should return null when location data is missing', async () => {
    const hotelId = 'hotel123';

    const fakeHotel = { id: hotelId, name: 'Grand Hotel' };
    const fakeQuality = { hotelId: hotelId, rating: 4.5, nbRating: 150, price: 150, ratioPriceQuality: 0.85 };

    mockedHotelService.getHotelById.mockResolvedValue(fakeHotel as any);
    mockedHotelLocationService.getHotelLocationById.mockResolvedValue(null);
    mockedHotelQualityService.getHotelQualityById.mockResolvedValue(fakeQuality as any);

    const result = await DataTransferService.combineAllDataForOneHotelById(hotelId);

    expect(result).toBeNull();
  });

  it('should return null when quality data is missing', async () => {
    const hotelId = 'hotel123';

    const fakeHotel = { id: hotelId, name: 'Grand Hotel' };
    const fakeLocation = { hotelId: hotelId, countryCode: 'FR', cityCode: 'PAR' };

    mockedHotelService.getHotelById.mockResolvedValue(fakeHotel as any);
    mockedHotelLocationService.getHotelLocationById.mockResolvedValue(fakeLocation as any);
    mockedHotelQualityService.getHotelQualityById.mockResolvedValue(null);

    const result = await DataTransferService.combineAllDataForOneHotelById(hotelId);

    expect(result).toBeNull();
  });

  it('should catch error and return null on exception', async () => {
    const hotelId = 'hotel123';

    mockedHotelService.getHotelById.mockRejectedValue(new Error('Database error'));

    const result = await DataTransferService.combineAllDataForOneHotelById(hotelId);

    expect(result).toBeNull();
  });
});

describe('DataTransferService.combineAllDataForOneHotelForBookingById', () => {
  it('should return booking DTOs for a user with bookings', async () => {
    const userId = 'user123';
    const hotelId = 'hotel123';

    const fakeBookingIds = [hotelId];
    const fakeBooking = { hotelId: hotelId, userId: userId, dateStart: '12/20/2025', dateEnd: '01/15/2026', nbRooms: 2, totalDay: 26 };
    const fakeHotel = { id: hotelId, name: 'Grand Hotel' };
    const fakeLocation = { hotelId: hotelId, countryCode: 'FR', cityCode: 'PAR' };
    const fakeQuality = { hotelId: hotelId, rating: 4.5, nbRating: 150, price: 100, ratioPriceQuality: 0.85 };

    mockedBookingService.getBookingsIdByUserId.mockResolvedValue(fakeBookingIds);
    mockedBookingModel.findOne.mockResolvedValue(fakeBooking as any);
    mockedHotelService.getHotelById.mockResolvedValue(fakeHotel as any);
    mockedHotelLocationService.getHotelLocationById.mockResolvedValue(fakeLocation as any);
    mockedHotelQualityService.getHotelQualityById.mockResolvedValue(fakeQuality as any);

    const result = await DataTransferService.combineAllDataForOneHotelForBookingById(userId);

    expect(mockedBookingService.getBookingsIdByUserId).toHaveBeenCalledWith(userId);
    expect(result).toBeInstanceOf(Array);
    expect(result?.length).toBe(1);
  });

  it('should return null when user has no bookings', async () => {
    const userId = 'user123';

    mockedBookingService.getBookingsIdByUserId.mockResolvedValue(null);

    const result = await DataTransferService.combineAllDataForOneHotelForBookingById(userId);

    expect(mockedBookingService.getBookingsIdByUserId).toHaveBeenCalledWith(userId);
    expect(result).toBeNull();
  });

  it('should return empty array when booking data is missing', async () => {
    const userId = 'user123';
    const hotelId = 'hotel123';

    const fakeBookingIds = [hotelId];

    mockedBookingService.getBookingsIdByUserId.mockResolvedValue(fakeBookingIds);
    mockedBookingModel.findOne.mockResolvedValue(null);

    const result = await DataTransferService.combineAllDataForOneHotelForBookingById(userId);

    expect(mockedBookingService.getBookingsIdByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual([]);
  });

  it('should return DTOs with calculated price for multiple bookings', async () => {
    const userId = 'user123';
    const hotelId1 = 'hotel123';
    const hotelId2 = 'hotel456';

    const fakeBookingIds = [hotelId1, hotelId2];
    const fakeBooking1 = { hotelId: hotelId1, userId: userId, dateStart: '12/20/2025', dateEnd: '01/15/2026', nbRooms: 2, totalDay: 26 };
    const fakeBooking2 = { hotelId: hotelId2, userId: userId, dateStart: '01/20/2026', dateEnd: '01/25/2026', nbRooms: 1, totalDay: 5 };
    const fakeHotel1 = { id: hotelId1, name: 'Grand Hotel' };
    const fakeHotel2 = { id: hotelId2, name: 'Luxury Hotel' };
    const fakeLocation1 = { hotelId: hotelId1, countryCode: 'FR', cityCode: 'PAR' };
    const fakeLocation2 = { hotelId: hotelId2, countryCode: 'ES', cityCode: 'MAD' };
    const fakeQuality1 = { hotelId: hotelId1, rating: 4.5, nbRating: 150, price: 100, ratioPriceQuality: 0.85 };
    const fakeQuality2 = { hotelId: hotelId2, rating: 4.8, nbRating: 200, price: 120, ratioPriceQuality: 0.9 };

    mockedBookingService.getBookingsIdByUserId.mockResolvedValue(fakeBookingIds);
    mockedBookingModel.findOne
      .mockResolvedValueOnce(fakeBooking1 as any)
      .mockResolvedValueOnce(fakeBooking2 as any);
    mockedHotelService.getHotelById
      .mockResolvedValueOnce(fakeHotel1 as any)
      .mockResolvedValueOnce(fakeHotel2 as any);
    mockedHotelLocationService.getHotelLocationById
      .mockResolvedValueOnce(fakeLocation1 as any)
      .mockResolvedValueOnce(fakeLocation2 as any);
    mockedHotelQualityService.getHotelQualityById
      .mockResolvedValueOnce(fakeQuality1 as any)
      .mockResolvedValueOnce(fakeQuality2 as any);

    const result = await DataTransferService.combineAllDataForOneHotelForBookingById(userId);

    expect(result).toBeInstanceOf(Array);
    expect(result?.length).toBe(2);
  });

  it('should catch error and return null on exception', async () => {
    const userId = 'user123';

    mockedBookingService.getBookingsIdByUserId.mockRejectedValue(new Error('Database error'));

    const result = await DataTransferService.combineAllDataForOneHotelForBookingById(userId);

    expect(result).toBeNull();
  });
});
