import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
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
    countries: true,
    tutionFees: true,
    qsRank: true,
    costOfLiving: true,
    acceptance: true,
    employability: true,
    location: true,
    courses: true,
    universityLogo: true,
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
          collection: 'universities',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'universities',
        req,
      }),
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
              name: 'short Description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'Download Brochure',
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
              label: false,
              required: false,
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

            {
              name: 'similar universities',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'universities',
            },
            {
              name: 'countries',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'countries',
            },

            {
              name: 'Admission title',
              type: 'text',
              required: false,
            },
            {
              name: 'admission description',
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
              label: false,
              required: true,
            },
          ],
          label: 'Overview',
        },
        {
          label: 'Block Info',
          fields: [
            {
              name: 'tutionFees',
              label: 'Tuition Fees ($)',
              type: 'number',
            },
            {
              name: 'qsRank',
              label: 'QS Rank',
              type: 'number',
            },
            {
              name: 'costOfLiving',
              label: 'Cost of Living',
              type: 'number',
            },
            {
              name: 'acceptance',
              label: 'Acceptance %',
              type: 'number',
            },
            {
              name: 'employability',
              label: 'Employability %',
              type: 'number',
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
              name: 'key feature list',
              type: 'array',
              label: 'key feature',
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
              ],
            },
          ],
          label: 'Key Factors',
        },

        {
          fields: [
            {
              name: 'Faq list',
              type: 'array',
              label: 'faq list',
              minRows: 2,
              maxRows: 10,
              labels: {
                singular: 'faq',
                plural: 'faqs',
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                },
                {
                  name: 'answer',
                  type: 'textarea',
                },
              ],
            },
          ],
          label: 'Faqs list',
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
}
