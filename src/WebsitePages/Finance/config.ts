import { MediaBlock } from '@/blocks/MediaBlock/config'
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
import { GlobalConfig } from 'payload'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'

export const Finance: Omit<GlobalConfig, 'navItems'> = {
  slug: 'finance',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banner',
          fields: [
            {
              name: 'bannerTitle',
              type: 'text',
            },
            {
              name: 'bannerDescription',
              type: 'text',
            },
            {
              name: 'bannerImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'bannerFormTitle',
              type: 'text',
            },
            {
              name: 'bannerFormDescription',
              type: 'text',
            },
            {
              name: 'bannerListItems',
              type: 'array',
              label: 'Banner List Item',
              labels: {
                singular: 'List',
                plural: 'Lists',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'bannerListText',
                      label: 'List',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Content Section',
          fields: [
            {
              name: 'contentTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'contentDescriptionn',
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
              name: 'contentImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
          ],
        },
        {
          label: 'Student Section',
          fields: [
            {
              name: 'studentSectionTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'studentTestimonials',
              type: 'array',
              label: 'Testimonials',
              labels: {
                singular: 'Testimonial',
                plural: 'Testimonials',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'testimonialsImage',
                      type: 'upload',
                      relationTo: 'media',
                      required: false,
                    },
                    {
                      name: 'studentName',
                      type: 'text',
                    },
                    {
                      name: 'studentUniversity',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'studentreview',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Secondary Form Section',
          fields: [
            {
              name: 'secondaryFormTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'secondaryFormDescription',
              label: 'Description',
              type: 'text',
            },
            {
              name: 'secondaryFormSectionTitle',
              label: 'Content Title',
              type: 'text',
            },
            {
              name: 'secondaryFormSectionContent',
              label: 'Content Description',
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
          ],
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
  ],
}
