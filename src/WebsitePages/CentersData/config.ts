import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { GlobalConfig } from 'payload'

export const CentersData: Omit<GlobalConfig, 'navItems'> = {
  slug: 'center-data',
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
          label: 'Centers Section',
          fields: [
            {
              name: 'centersTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'centersDescription',
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
