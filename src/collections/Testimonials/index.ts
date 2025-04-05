import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials', // Unique identifier for the collection
  defaultPopulate: {
    name: true,
    designation: true,
    description: true,
    image: true,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    defaultColumns: ['name', 'designation', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'designation',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
