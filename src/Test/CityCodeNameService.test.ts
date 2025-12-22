import { describe, it, expect, jest, beforeAll, afterAll } from '@jest/globals';
import { CityCodeNameService } from '../services/v3/CityCodeNameService';
import CityCodeName from '../models/v3/CityCodeNameModel';
import FormatedStringRegex from '../Regex/FormatedStringRegex';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  (console.log as jest.Mock).mockRestore();
});

jest.mock('../models/v3/CityCodeNameModel');
jest.mock('../Regex/FormatedStringRegex');

const mockedCityCodeName = CityCodeName as jest.Mocked<typeof CityCodeName>;
const mockedRegex = FormatedStringRegex as jest.Mocked<typeof FormatedStringRegex>;

describe('CityCodeNameService.createCityCodeName', () => {
  it('should create a city code name if code does not exist', async () => {
    mockedCityCodeName.findOne.mockResolvedValue(null);

    const saveMock = jest.fn();
    (mockedCityCodeName as unknown as jest.Mock).mockImplementation(function (this: any) {
      this.save = saveMock;
      return this;
    });

    const result = await CityCodeNameService.createCityCodeName('PAR', 'Paris');

    expect(mockedCityCodeName.findOne).toHaveBeenCalledWith({ cityCode: 'PAR' });
    expect(saveMock).toHaveBeenCalled();
    expect(result.cityCodeName).toBeDefined();
  });

  it('should return message if city code already exists', async () => {
    mockedCityCodeName.findOne.mockResolvedValue({ cityCode: 'PAR' } as any);

    const result = await CityCodeNameService.createCityCodeName('PAR', 'Paris');

    expect(result).toEqual({ message: 'code :  PAR already exists' });
  });
});

describe('CityCodeNameService.getAllCityCodeName', () => {
  it('should return all city code names', async () => {
    const fakeData = [
      { cityCode: 'PAR', cityName: 'Paris' },
      { cityCode: 'MTL', cityName: 'Montreal' },
    ];

    mockedCityCodeName.find.mockResolvedValue(fakeData as any);

    const result = await CityCodeNameService.getAllCityCodeName();

    expect(mockedCityCodeName.find).toHaveBeenCalled();
    expect(result).toEqual(fakeData);
  });
});

describe('CityCodeNameService.getAllUniqueCityName', () => {
  it('should return unique city names', async () => {
    const fakeData = [
      { cityName: 'Paris' },
      { cityName: 'Paris' },
      { cityName: 'Montreal' },
    ];

    const mockSelect = jest.fn().mockImplementation(() => Promise.resolve(fakeData));

    mockedCityCodeName.find.mockReturnValue({
      select: mockSelect,
    } as any);

    const result = await CityCodeNameService.getAllUniqueCityName();

    expect(result).toEqual(['Paris', 'Montreal']);
  });

  it('should return null if no city names exist', async () => {
    const mockSelect = jest.fn().mockImplementation(() => Promise.resolve([]));

    mockedCityCodeName.find.mockReturnValue({
      select: mockSelect,
    } as any);

    const result = await CityCodeNameService.getAllUniqueCityName();

    expect(result).toBeNull();
  });
});

describe('CityCodeNameService.getCityNameByItsCode', () => {
  it('should return city name if code exists', async () => {
    mockedRegex.formatedString.mockReturnValue('PAR');

    mockedCityCodeName.findOne.mockResolvedValue({
      cityName: 'Paris',
    } as any);

    const result = await CityCodeNameService.getCityNameByItsCode(' par ');

    expect(mockedRegex.formatedString).toHaveBeenCalledWith(' par ');
    expect(mockedCityCodeName.findOne).toHaveBeenCalledWith({ cityCode: 'PAR' });
    expect(result).toBe('Paris');
  });

  it('should return null if city code does not exist', async () => {
    mockedRegex.formatedString.mockReturnValue('PAR');
    mockedCityCodeName.findOne.mockResolvedValue(null);

    const result = await CityCodeNameService.getCityNameByItsCode('PAR');

    expect(result).toBeNull();
  });
});

describe('CityCodeNameService.getCityCodeByItsName', () => {
  it('should return city codes for a given city name', async () => {
    mockedRegex.formatedString.mockReturnValue('PARIS');

    mockedCityCodeName.find.mockResolvedValue([
      { cityCode: 'PAR' },
      { cityCode: 'PRS' },
    ] as any);

    const result = await CityCodeNameService.getCityCodeByItsName(' paris ');

    expect(result).toEqual(['PAR', 'PRS']);
  });

  it('should return null if no city codes are found', async () => {
    mockedRegex.formatedString.mockReturnValue('PARIS');
    mockedCityCodeName.find.mockResolvedValue([]);

    const result = await CityCodeNameService.getCityCodeByItsName('paris');

    expect(result).toBeNull();
  });
});

describe('CityCodeNameService.getAllCityName', () => {
  it('should return all distinct city names', async () => {
    mockedCityCodeName.distinct.mockResolvedValue(['Paris', 'Montreal'] as any);

    const result = await CityCodeNameService.getAllCityName();

    expect(mockedCityCodeName.distinct).toHaveBeenCalledWith('cityName');
    expect(result).toEqual(['Paris', 'Montreal']);
  });
});
