// src/routes/api/deals/[slug]/+server.js
import { json } from '@sveltejs/kit';
import Deal from '$lib/server/models/deals';
import { connectToDatabase } from '$lib/database.js';

export const GET = async ({ params }) => {
  try {
    await connectToDatabase();
    const { slug } = params;
    
    const deal = await Deal.findOne({ slug });
    
    if (!deal) {
      return json({ error: 'Deal not found' }, { status: 404 });
    }

    return json({ deal }, { status: 200 });
  } catch (error) {
    console.error('Error fetching deal:', error);
    return json({ error: 'Failed to fetch deal' }, { status: 500 });
  }
};