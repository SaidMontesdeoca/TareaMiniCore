import { Sale } from '../models/Sale.js';
import { User } from '../models/User.js';

export const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const sales = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: '$sellerId',
          totalAmount: { $sum: '$amount' },
          totalProducts: { 
            $sum: { 
              $reduce: {
                input: '$products',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.quantity'] }
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'seller'
        }
      },
      {
        $unwind: '$seller'
      },
      {
        $project: {
          sellerName: '$seller.name',
          totalAmount: 1,
          totalProducts: 1,
          commission: { 
            $multiply: ['$totalAmount', 0.1] // 10% commission
          }
        }
      },
      {
        $sort: { totalAmount: -1 }
      }
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};