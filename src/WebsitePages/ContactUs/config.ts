import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { GlobalConfig } from 'payload'

export const ContactUs: Omit<GlobalConfig, 'navItems'> = {
  slug: 'contact-us',
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
          ],
        },
        {
          label: 'Contact Us Section',
          fields: [
            {
              name: 'sectionTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'sectionDescription',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'sectionEmail',
              label: 'Email',
              type: 'text',
            },
            {
              name: 'sectionPhone',
              label: 'Phone',
              type: 'text',
            },
          ],
        },
        {
          label: 'Center Section',
          fields: [
            {
              name: 'centerSectionTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'centerSectionDescription',
              label: 'Description',
              type: 'textarea',
            },
            // {
            //   name: 'mapIframe',
            //   type: 'textarea',
            // },
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
