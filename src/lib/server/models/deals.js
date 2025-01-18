import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    validate: {
      validator: function (value) {
        // Only require date if the category is "Road Trips"
        return this.category !== 'Road Trips' || value !== null;
      },
      message: 'Date is required for Road Trips',
    },
  },
  guests: {
    type: Number,
    validate: {
      validator: function (value) {
        // Only allow guests if the category is "Road Trips"
        return this.category !== 'Road Trips' || (value !== null && value > 0);
      },
      message: 'Number of guests is required for Road Trips',
    },
  },
  seatsAvailable: {
    type: Number,
    validate: {
      validator: function (value) {
        // Only allow seatsAvailable if the category is "Road Trips"
        return this.category !== 'Road Trips' || (value !== null && value > 0);
      },
      message: 'Number of seats available is required for Road Trips',
    },
  },
  days: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true, // Ensure the slug is unique
  },
  images: {
    type: [String], // Cloudinary URLs will be stored here
    validate: {
      validator: function (val) {
        return val.length <= 4; // Maximum of 4 images
      },
      message: 'You can upload a maximum of 4 images.',
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  features: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    enum: [
      'International',
      'Safari',
      'Beach Holiday',
      'Adventure',
      'Honeymoon & Romantic Getaway',
      'Road Trips',
    ],
    required: true,
  },
});

// Create and export the Deal model
const Deal = mongoose.model('Deal', dealSchema);

export default Deal;
