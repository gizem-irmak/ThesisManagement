'use strict';

import customDate from '../../Services/CustomDate';
import { getDate, setDate, resetDate } from '../../Controllers/DateController';

jest.mock('../../Services/CustomDate', () => ({
    get date() {
        throw 'Internal Server Error';
    },

    set date(newDate) {
      this._date = newDate;
      throw ''
  },

  resetDate(){
    throw 'Internal Server Error';
  }

  }));
  
  describe('get_date', () => {
  
    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await getDate(null, res);

      console.log(res.json)
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith( {"message": "Internal Server Error"});
    });

    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
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

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith( {message: "internal error"});
    });


    it('should handle 500 Internal Server Error and return the appropriate response', async () => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await resetDate({}, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith( {"message": "Internal Server Error"});
    });


  });