import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import Price from '../../models/price';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const { symbol } = req.query;
  console.log('symbol', symbol);

  if (!symbol) {
    return res.status(400).json({ message: 'Symbol is required' });
  }

  try {
    console.log(await Price.find({ symbol: symbol }));
    const prices = await Price.find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20)
      .exec();

    console.log('prices', prices);

    res.status(200).json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
