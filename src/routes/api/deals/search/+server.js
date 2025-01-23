// src/routes/api/deals/search/+server.js
import { json } from '@sveltejs/kit';
import Deal from '$lib/server/models/deals';
import { connectToDatabase } from '$lib/database.js';

export async function GET({ url }) {
    try {
        await connectToDatabase();

        // Extract search parameters
        const category = url.searchParams.get('category');
        const destination = url.searchParams.get('destination');
        const guests = url.searchParams.get('guests');
        const date = url.searchParams.get('date');

        // Build query object
        let query = {};

        if (destination) {
            query.destination = { $regex: new RegExp(destination, 'i') };
        }

        if (category && category !== 'Any Category') {
            query.category = category;
        }

        // Only add these filters for Road Trips
        if (category === 'Road Trips') {
            if (guests) {
                query.maxGuests = { $gte: parseInt(guests) };
            }

            if (date) {
                query.availableDates = {
                    $elemMatch: {
                        startDate: { $lte: new Date(date) },
                        endDate: { $gte: new Date(date) }
                    }
                };
            }
        }

        // Fetch deals with pagination
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = 12;
        const skip = (page - 1) * limit;

        const deals = await Deal.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .select('title destination price category images'); // Select only needed fields

        // Get total count for pagination
        const total = await Deal.countDocuments(query);

        return json({
            deals,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page
            }
        });

    } catch (error) {
        console.error('Search error:', error);
        return json({ 
            error: 'Failed to search deals',
            details: error.message 
        }, { status: 500 });
    }
}