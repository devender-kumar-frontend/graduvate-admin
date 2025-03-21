import { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs', // Unique identifier for the collection
  labels: {
    singular: 'Faqs',
    plural: 'Faqs',
  },
  admin: {
    defaultColumns: ['updatedAt'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
  ],
}
