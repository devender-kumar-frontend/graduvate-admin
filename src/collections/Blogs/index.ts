/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CollectionConfig } from 'payload'

import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
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

export const Blogs: CollectionConfig<'blogs'> = {
  slug: 'blogs',
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
    shortDescription: true,
    content: true,
    blogImage: true,
    categories: true,
    createdAt: true,
    isFeaturedBlog: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'address', 'updatedAt'],
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
              name: 'shortDescription',
              label: 'Short Description',
              type: 'textarea',
              required: false,
            },
            {
              name: 'blogImage',
              label: 'Blog Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'isFeaturedBlog',
              type: 'checkbox',
            },
            {
              name: 'readTime',
              type: 'text',
            },
            {
              name: 'content',
              label: 'Full Description',
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
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'blogs',
              hasMany: true,
              admin: {
                hidden: true,
                readOnly: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
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
    ...slugField(),
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

  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }: any) => {
        if (!data.relatedPosts) {
          const relatedPosts = await req.payload.find({
            collection: 'blogs',
            where: {
              id: { not_equals: originalDoc?.id }, // Exclude the current post
            },
            select: {
              title: true,
              slug: true,
              blogImage: true,
            },
            limit: 3, // Fetch 3 related posts (or any number you want)
          })

          data.relatedPosts = relatedPosts.docs.map((post: any) => post.id) // Assign the IDs of related posts
        }
        return data
      },
    ],
  },
}
