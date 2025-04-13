/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateDelete } from '../Pages/hooks/revalidatePage'
import { populateAuthors } from '../Posts/hooks/populateAuthors'
import { revalidatePost } from '../Posts/hooks/revalidatePost'

export const Courses: CollectionConfig<'courses'> = {
  slug: 'courses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    courseImage: true,
    content: true,
    fees: true,
    duration: true,
    qualification: true,
    courseLevel: true,
    intakes: true,
    tutionFees: true,
    visaInsuranceFees: true,
    hostelFees: true,
    courseUniversity: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'courses',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'courses',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'courseImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'textarea',
            },
            {
              name: 'courseUniversity',
              label: 'Select University',
              type: 'relationship',
              relationTo: 'universities',
              hasMany: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'fees',
              type: 'text',
            },
            {
              name: 'duration',
              type: 'text',
            },
            {
              name: 'qualification',
              type: 'text',
            },
            {
              name: 'courseLevel',
              type: 'text',
            },
            // {
            //   name: 'qualification2',
            //   label: 'Qualification',
            //   type: 'text',
            // },
            {
              name: 'intakes',
              type: 'text',
            },
            {
              name: 'tutionFees',
              label: 'Tuition Fees',
              type: 'text',
            },
            {
              name: 'hostelFees',
              label: 'Hostel Fees',
              type: 'text',
            },
            {
              name: 'visaInsuranceFees',
              label: 'Visa and Insurance Fees',
              type: 'text',
            },
          ],
          label: 'Course Info',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  endpoints: [
    {
      path: '/university-courses', // The endpoint path (e.g., /api/universities/custom-endpoint)
      method: 'get', // HTTP method (GET, POST, etc.)
      handler: async (req) => {
        try {
          const page = parseInt(req.query?.page as string) || 1
          const limit = parseInt(req.query?.limit as string) || 10
          const result = await req.payload.find({
            collection: 'courses',
            select: {
              title: true,
              slug: true,
              courseImage: true,
              content: true,
              fees: true,
              duration: true,
              qualification: true,
              courseLevel: true,
              intakes: true,
              tutionFees: true,
              visaInsuranceFees: true,
              hostelFees: true,
            },
            where: {
              _status: {
                equals: 'published', // Exclude drafts
              },
              courseUniversity: {
                contains: req.query.universityId, // Filters by university ID
              },
            },
            page,
            limit,
          })
          // Manually reduce to just the filename
          const docs = result.docs.map((countryImg: any) => ({
            id: countryImg.id,
            title: countryImg.title,
            slug: countryImg.slug,
            courseImage: {
              url: countryImg.courseImage?.url || null,
            },
            content: countryImg.content,
            fees: countryImg.fees,
            duration: countryImg.duration,
            tutionFees: countryImg.tutionFees,
            qualification: countryImg.qualification,
            courseLevel: countryImg.courseLevel,
            intakes: countryImg.intakes,
            visaInsuranceFees: countryImg.visaInsuranceFees,
            hostelFees: countryImg.hostelFees,
          }))

          return Response.json({ message: 'Data fetched successfully', docs }, { status: 200 })
        } catch (error: any) {
          return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 },
          )
        }
      },
    },
  ],
}
