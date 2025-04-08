/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateDelete } from '../Pages/hooks/revalidatePage'
import { revalidatePost } from '../Posts/hooks/revalidatePost'

export const Universities: CollectionConfig<'universities'> = {
  slug: 'universities',
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
    tutionFees: true,
    qsRank: true,
    costOfLiving: true,
    establishText: true,
    acceptance: true,
    employability: true,
    location: true,
    courses: true,
    image: true,
    universityLogo: true,
    hostelFees: true,
    visaInsuranceFees: true,
    shortDescription: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'countries', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'shortDescription',
              label: 'Short Description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'establishText',
              type: 'text',
            },
            {
              name: 'downloadBrochure',
              label: 'Download Brochure',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              required: false,
            },
            {
              name: 'youtubeVideoId',
              label: 'Youtube Video Id',
              type: 'text',
            },
            {
              name: 'countries',
              label: 'Country',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'countries',
            },
            {
              name: 'similarUniversities',
              label: 'Similar Universities',
              type: 'relationship',
              admin: {
                position: 'sidebar',
                hidden: true,
                readOnly: true,
              },
              hasMany: true,
              relationTo: 'universities',
              hooks: {
                beforeChange: [
                  async ({ data, req }) => {
                    const currentUniversity = data
                    const similarUniversities = await req.payload.find({
                      collection: 'universities',
                      where: {
                        id: {
                          not_in: [currentUniversity?.id],
                        },
                        countries: {
                          in: currentUniversity?.countries || [],
                        },
                      },
                      select: {
                        shortDescription: true,
                      },
                      limit: 100,
                    })
                    return similarUniversities.docs.map((universities) => universities.id)
                  },
                ],
              },
            },
          ],
          label: 'Overview',
        },
        {
          label: 'Ranking',
          fields: [
            {
              name: 'rankingTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'rankingDescription',
              label: 'Description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
            {
              name: 'internationalStudentIntakeTitle',
              label: 'Progress Title',
              type: 'text',
            },
            {
              name: 'internationalStudentIntake',
              label: 'Progress %',
              type: 'number',
            },
            {
              name: 'rankingList',
              label: 'Ranking List',
              type: 'array',
              minRows: 1,
              labels: {
                singular: 'rankingList',
                plural: 'rankingLists',
              },
              fields: [
                {
                  name: 'year',
                  type: 'text',
                },
                {
                  name: 'qaRank',
                  label: 'Country Rank',
                  type: 'text',
                },
                {
                  label: 'World Rank',
                  name: 'usNewsRanks',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Courses Section',
          fields: [
            {
              name: 'courseTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'courseDescription',
              label: 'Description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
            {
              name: 'courses',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'courses',
            },
          ],
        },
        {
          label: 'Admission Section',
          fields: [
            {
              name: 'admissionTitle',
              label: 'Admission Title',
              type: 'text',
              required: false,
            },
            {
              label: 'Admission Description',
              name: 'admissionDescription',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
            {
              name: 'admissionInfoList',
              label: 'Admission Info List',
              type: 'array',
              minRows: 0,
              labels: {
                singular: 'Admission Info',
                plural: 'admissionInfoLists',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                    },
                    {
                      name: 'value',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Block Info',
          fields: [
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
            {
              name: 'qsRank',
              label: 'Rank',
              type: 'text',
            },
            {
              name: 'costOfLiving',
              label: 'Cost of Living',
              type: 'text',
            },
            {
              name: 'acceptance',
              label: 'Acceptance',
              type: 'text',
            },
            {
              name: 'employability',
              label: 'Employability',
              type: 'text',
            },
            {
              name: 'location',
              label: 'Location',
              type: 'text',
            },
            {
              name: 'universityLogo',
              label: 'University Logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          fields: [
            {
              name: 'keyFeatureList',
              label: 'Key Feature List',
              type: 'array',
              minRows: 2,
              maxRows: 10,
              labels: {
                singular: 'keyfeature',
                plural: 'keyfeatures',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'value',
                  type: 'text',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                },
                {
                  name: 'blockBgColor',
                  label: 'Add Background Color (HEX Code)',
                  type: 'text',
                },
              ],
            },
          ],
          label: 'Key Factors',
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
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: false,
    },
    maxPerDoc: 50,
  },
  endpoints: [
    {
      path: '/search', // The endpoint path (e.g., /api/universities/custom-endpoint)
      method: 'get', // HTTP method (GET, POST, etc.)
      handler: async (req) => {
        try {
          const searchTerm: any = req.query.title
          if (!searchTerm) {
            return Response.json({ error: 'Search term is required' }, { status: 404 })
          }

          // Create a case-insensitive regular expression from the search term
          const searchRegex = new RegExp(searchTerm, 'i')

          const universities = await req.payload.find({
            collection: 'universities',
            select: {
              title: true,
              slug: true,
            },
            where: {
              or: [
                {
                  title: {
                    like: searchRegex, // MongoDB regular expression for search
                  },
                },
                {
                  shortDescription: {
                    like: searchRegex, // MongoDB regular expression for search
                  },
                },
              ],
            },
          })

          return Response.json(
            { message: 'Data fetched successfully', universities },
            { status: 200 },
          )
        } catch (error: any) {
          return Response.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 },
          )
        }
      },
    },
    {
      path: '/slugs', // The endpoint path (e.g., /api/universities/custom-endpoint)
      method: 'get', // HTTP method (GET, POST, etc.)
      handler: async (req) => {
        try {
          const allSlugs = await req.payload.find({
            collection: 'universities',
            select: {
              slug: true,
            },
            where: {
              _status: {
                equals: 'published', // Exclude drafts
              },
            },
          })

          return Response.json({ message: 'Data fetched successfully', allSlugs }, { status: 200 })
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
