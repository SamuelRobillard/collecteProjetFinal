import { describe, it, expect, jest } from '@jest/globals';
import { HotelService } from '../services/v3/HotelService';
import HotelModel from '../models/v3/HotelModel';

jest.mock('../models/v3/HotelModel');
const mockedHotel = HotelModel as jest.Mocked<typeof HotelModel>;

describe('HotelService.createHotel', () => {
  it('create or update a hotel', async () => {
    const fakeHotel = {
      hotelId: 'hotel1234',
      name: 'Test Hotel',
    };

    mockedHotel.findOneAndUpdate.mockResolvedValue(fakeHotel as any);

    const result = await HotelService.createHotel('hotel1234', 'Test Hotel');

    expect(mockedHotel.findOneAndUpdate).toHaveBeenCalled();
    expect(result.hotel).toEqual(fakeHotel);
  });
});




type HotelIdOnly = { hotelId: string };

describe('HotelService.getAllHotelId', () => {
  it('should return an array of hotelIds', async () => {
    const fakeHotels: HotelIdOnly[] = [
      { hotelId: 'h1' },
      { hotelId: 'h2' },
      { hotelId: 'h3' },
    ];

    
    const mockSelect = jest.fn().mockResolvedValue(fakeHotels as never);

    mockedHotel.find.mockReturnValue({
      select: mockSelect,
    } as any);

    const result = await HotelService.getAllHotelId();

    expect(mockedHotel.find).toHaveBeenCalled();
    expect(result).toEqual(['h1', 'h2', 'h3']);
  });
});


describe('HotelService.getHotelById', () => {
  it('should return the hotel if found', async () => {
    const fakeHotel: HotelIdOnly = { hotelId: 'h1'};

    // mock findOne pour renvoyer un hôtel
    mockedHotel.findOne.mockResolvedValue(fakeHotel as any);

    const result = await HotelService.getHotelById('h1');

    expect(mockedHotel.findOne).toHaveBeenCalledWith({ hotelId: 'h1' });
    expect(result).toEqual(fakeHotel);
  })
});
