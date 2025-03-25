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

export const Countries: CollectionConfig<'countries'> = {
  slug: 'countries',
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
    banner: true,
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
          collection: 'countries',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'countries',
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
              label: 'Title',
              type: 'text',
              required: true,
            },

            {
              name: 'description',
              label: 'Description',
              type: 'text',
              required: false,
            },
            {
              name: 'banner',
              label: 'Banner',
              type: 'upload',
              relationTo: 'media',
            },

            {
              name: 'heading1',
              label: 'Heading 1',
              type: 'text',
              required: false,
            },
            {
              name: 'description1',
              label: 'Description 1',
              type: 'textarea',
              required: false,
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
              required: false,
            },
            {
              name: 'universities',
              label: 'Universities',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'universities',
            },

            {
              name: 'heading2',
              label: 'Heading 2',
              type: 'text',
              required: false,
            },
            {
              name: 'description2',
              label: 'Description 2',
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
              name: 'link2',
              label: 'Link 2',
              type: 'text',
              required: false,
            },
            {
              name: 'admissionRequirementHeading',
              label: 'Admission Requirement Heading',
              type: 'text',
              required: false,
            },
            {
              name: 'admissionRequirementDescripton',
              label: 'Admission Requirement Descripton',
              type: 'textarea',
              required: false,
            },
          ],
          label: 'Overview',
        },

        {
          fields: [
            {
              name: 'keyFeatureList',
              type: 'array',
              label: 'Key Feature',
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
              name: 'admissionRequirement',
              type: 'array',
              label: 'Admission Feature',
              minRows: 2,
              maxRows: 10,
              labels: {
                singular: 'admisionfeature',
                plural: 'admisionfeatures',
              },
              fields: [
                {
                  name: 'title',
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
          label: 'Admission Requirement List',
        },

        {
          fields: [
            {
              name: 'faqList',
              type: 'array',
              label: 'Faq List',
              minRows: 2,
              maxRows: 10,
              labels: {
                singular: 'Faq',
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
          label: 'Faqs List',
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'flagImage',
              label: 'Flag Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'menuName',
              label: 'Menu Name',
              type: 'text',
            },
          ],
          label: 'Meta',
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
