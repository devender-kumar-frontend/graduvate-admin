import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { GlobalConfig } from 'payload'

export const Homepage: Omit<GlobalConfig, 'navItems'> = {
  slug: 'homepage',
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
              name: 'bannerImageSliders',
              type: 'array',
              labels: {
                singular: 'Slider Image',
                plural: 'Sider Images',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'g2Text',
              type: 'text',
            },
            {
              name: 'totalUniversity',
              type: 'text',
            },
            {
              name: 'totalScholarships',
              type: 'text',
            },
            {
              name: 'bannerCtaText',
              label: 'CTA Text',
              type: 'text',
            },
            {
              name: 'bannerCtaLink',
              label: 'CTA Link  ',
              type: 'text',
            },
          ],
        },
        {
          label: 'University Logos',
          fields: [
            {
              name: 'universityLogoTitle',
              label: 'Section Title',
              type: 'text',
            },
            {
              name: 'universityLogoDescription',
              label: 'Section Decription',
              type: 'textarea',
            },
            {
              name: 'universitiesLogo',
              type: 'array',
              label: 'Logos',
              labels: {
                singular: 'Logo',
                plural: 'Logos',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                },
              ],
            },
          ],
        },
        {
          label: 'About Us Section',
          fields: [
            {
              name: 'aboutUsTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'aboutUsDescription',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'AboutUsCtaText',
              label: 'CTA Text',
              type: 'text',
            },
            {
              name: 'AboutUsCtaLink',
              label: 'CTA Link  ',
              type: 'text',
            },
            {
              name: 'aboutUsImage',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
          ],
        },
        {
          label: 'Event Section',
          fields: [
            {
              name: 'eventTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'eventDescription',
              label: 'Description',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Blog Section',
          fields: [
            {
              name: 'blogTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'blogDescription',
              label: 'Description',
              type: 'textarea',
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
