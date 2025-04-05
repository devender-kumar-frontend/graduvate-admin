import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { CollectionConfig } from 'payload'

export const Events: CollectionConfig<'events'> = {
  slug: 'events', // Unique identifier for the collection
  defaultPopulate: {
    eventTitle: true,
    eventDate: true,
    eventTime: true,
    image: true,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    defaultColumns: ['eventTitle', 'eventDate', 'eventTime', 'updatedAt'],
    useAsTitle: 'eventTitle',
  },
  fields: [
    {
      name: 'eventTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'eventDate',
      type: 'text',
    },
    {
      name: 'eventTime',
      type: 'text',
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
