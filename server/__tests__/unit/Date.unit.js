'use strict';

import customDate from '../../Services/CustomDate';
import { getDate, resetDate, setDate } from '../../Controllers/DateController';

jest.mock('../../Services/CustomDate');

describe('get_date', () => {
    beforeEach(() => {
    jest.resetModules();
    });
  
    it('should return 200 and the date when getter of date is successful', async () => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await getDate(null, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ date: customDate.date });
    });


    it('should return 200 and the date when setter of date is successful', async () => {
        const res = {
          status: jest.fn(() => res),
          json: jest.fn(),
        };
        const req = {
            body : {
              newDate : '2023/10/23',
            },
          }
        await setDate(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'date set' });
    });


    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
        const res = {
          status: jest.fn(() => res),
          json: jest.fn(),
        };
        await resetDate({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith( { message: 'date reset' });
    });
  });
  
