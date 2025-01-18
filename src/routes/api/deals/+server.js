import { json } from '@sveltejs/kit';
import Deal from '$lib/server/models/deals';
import { uploadImage } from '$lib/cloudinary';
import { connectToDatabase } from '$lib/database.js';

await connectToDatabase();

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateUniqueSlug(title) {
  let slug = generateSlug(title);
  let deal = await Deal.findOne({ slug });
  let counter = 1;

  while (deal) {
    slug = `${generateSlug(title)}-${counter}`;
    deal = await Deal.findOne({ slug });
    counter++;
  }

  return slug;
}

export const GET = async () => {
  try {
    await connectToDatabase(); // Ensure connection is established
    const deals = await Deal.find();
    return json({ deals }, { status: 200 });
  } catch (error) {
    console.error('Error fetching deals:', error);
    return json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
};
export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    console.log('Form Data:', formData);

    // Validate required fields
    const title = formData.get('title');
    const description = formData.get('description');
    const destination = formData.get('destination');
    const category = formData.get('category');
    const days = parseInt(formData.get('days'), 10);
    const price = parseFloat(formData.get('price'));

    if (!title || !description || !destination || !category || !days || !price) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Handle date and guests based on category
    let date = formData.get('date');
    let guests = parseInt(formData.get('guests'), 10);
    let seatsAvailable = null;

    if (category === 'Road Trips') {
      if (!date || isNaN(guests)) {
        return json({ error: 'Date and guests are required for Road Trips' }, { status: 400 });
      }
      seatsAvailable = parseInt(formData.get('seatsAvailable'), 10);
      if (isNaN(seatsAvailable)) {
        return json({ error: 'Invalid seats available value' }, { status: 400 });
      }
    } else {
      date = null;
      guests = null;
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(title);

    console.log('Final Data:', { destination, date, guests, seatsAvailable, days, price, title, description, features, category, slug });

    const imageFiles = formData.getAll('images');
    console.log('Image Files:', imageFiles);

    const images = await Promise.all(
      imageFiles.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const bufferFile = Buffer.from(buffer);
        const { path } = await uploadImage(bufferFile);
        return path;
      })
    );

    console.log('Images:', images);

    const deal = new Deal({
      destination,
      date,
      guests,
      seatsAvailable,
      days,
      price,
      title,
      description,
      features,
      category,
      slug,
      images,
    });

    await deal.save();

    console.log('Deal saved successfully');

    return json({ message: 'Deal created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating deal:', error);
    return json({ error: 'Failed to create deal' }, { status: 500 });
  }
};