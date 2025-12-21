import { describe, it, expect, jest } from '@jest/globals';
import { BookingService } from '../services/v3/BookingService';
import BookingModel from '../models/v3/BookingModel';

jest.mock('../models/v3/BookingModel');

const mockedBooking = BookingModel as jest.Mocked<typeof BookingModel>;

describe('BookingService.createBooking', () => {
  it('create a Booking', async () => {
    const fakeBooking = {
      hotelId: 'hotel69',
      userId: '1022021',
      dateStart: '12/20/2025',
      dateEnd: '01/15/2026',
      nbRooms: 2
    };

    mockedBooking.findOne.mockResolvedValue(null);
    const MockedBookingConstructor = mockedBooking as unknown as jest.Mock;
    MockedBookingConstructor.mockImplementation(function (this: any, doc: any) {
      Object.assign(this, doc);
      return this;
    });

    const result = await BookingService.createBooking(
      'hotel67',
      '1022020',
      '12/20/2025',
      '01/15/2026',
      2
    );

    expect(mockedBooking.findOne).toHaveBeenCalled();
    expect(result.booking).toMatchObject({
      hotelId: 'hotel67',
      userId: '1022020',
      dateStart: '12/20/2025',
      dateEnd: '01/15/2026',
      nbRooms: 2
    });
  });
});

type BookingOnly = { hotelId: string; userId: string; dateStart: string; dateEnd: string; nbRooms: number };

type BookingWithHotelIdAndUserId = {hotelId:string;userId:string};

describe('BookingService.getBookingsByUserId', () => {
  it('should return the bookings of the user if found', async () => {
    const fakeBookings: BookingOnly[] = [
      { hotelId: 'hotel1', userId: '1022020', dateStart: '12/20/2025', dateEnd: '01/15/2026', nbRooms: 2 },
      { hotelId: 'hotel2', userId: '1022020', dateStart: '01/01/2026', dateEnd: '01/10/2026', nbRooms: 1 }
    ];

    mockedBooking.find.mockResolvedValue(fakeBookings as any);

    const result = await BookingService.getBookingsByUserId('1022020');

    expect(mockedBooking.find).toHaveBeenCalledWith({ userId: '1022020' });
    expect(result).toEqual(fakeBookings);
  })
});


describe('BookingService.deleteBookingByHotelId', () => {
  it('should delete all the  bookings of the hotel', async () => {
    const fakeBooking: BookingOnly = {
      hotelId: 'hotel2',
      userId: '1022020',
      dateStart: '12/20/2025',
      dateEnd: '01/15/2026',
      nbRooms: 1
    };

    mockedBooking.findOne.mockResolvedValue(fakeBooking as any);
    mockedBooking.findOneAndDelete.mockResolvedValue(fakeBooking as any);

    const result = await BookingService.deleteBookingByHotelId('hotel2');

    expect(mockedBooking.findOne).toHaveBeenCalledWith({ hotelId: 'hotel2' });
    expect(mockedBooking.findOneAndDelete).toHaveBeenCalledWith({ hotelId: 'hotel2' });
    expect(result).toEqual(fakeBooking);
  })
});


describe('BookingService.deleteBookingByHotelIdAndUserId', () => {
  it('should delete  the booking of the hotel by his Id and  the userId', async () => {
    const fakeBooking: BookingWithHotelIdAndUserId[] = [
      {hotelId:'hotel5',userId:'1022020'}
    ]
    mockedBooking.findOneAndDelete.mockResolvedValue(fakeBooking as any);
    const result = await BookingService.deleteBookingByHotelIdAndUserId('hotel5','1022020');
    expect(mockedBooking.findOneAndDelete).toHaveBeenCalledWith({ hotelId: 'hotel5',userId:'1022020' });
    expect(result).toEqual(fakeBooking);
  })
});