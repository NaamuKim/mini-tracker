import express from 'express';
import { retrieveVisitors } from '@/services/dashboard/overview';
import { VisitorsQueryParamsDTO } from '@/types/DTO/dashboard/overview';
import { validateVisitorsQueryParam } from '@/middlewares/validators/dashboard/overview';
import { Request } from 'express-serve-static-core';

const router = express.Router();

router.get('/visitors', validateVisitorsQueryParam, async (req: Request<VisitorsQueryParamsDTO>, res) => {
  const { startDate, endDate, interval = 'day', sort = 'asc', limit = 50 } = req.validatedQueryParams;

  try {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (Number.isNaN(parsedStartDate.getTime()) || Number.isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date' });
    }

    if (interval !== 'day' && interval !== 'month') {
      return res.status(400).json({ message: 'Invalid interval' });
    }

    const validatedVisitors: VisitorsQueryParamsDTO = {
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      interval,
      sort,
      limit: Number(limit),
    };

    const visitors = await retrieveVisitors(validatedVisitors);

    res.status(200).json({
      message: 'Visitors retrieved',
      success: true,
      data: {
        visitors,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

export default router;
