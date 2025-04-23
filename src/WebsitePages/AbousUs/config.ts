import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { GlobalConfig } from 'payload'

export const AboutUs: Omit<GlobalConfig, 'navItems'> = {
  slug: 'about-us',
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
              name: 'aboutUsImage',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
          ],
        },
        {
          label: 'Achievements Section',
          fields: [
            {
              name: 'achievementsTitle',
              label: 'Section Title',
              type: 'text',
            },
            {
              name: 'achievementsDescription',
              label: 'Section Decription',
              type: 'textarea',
            },
            {
              name: 'achievementsData',
              type: 'array',
              label: 'Counter Data',
              labels: {
                singular: 'Counter',
                plural: 'Counters',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: false,
                    },
                    {
                      name: 'achievementsCount',
                      label: 'Count Matrix',
                      type: 'text',
                    },
                    {
                      name: 'achievementsCountDesp',
                      label: 'Count Text',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Mission & Vision Section',
          fields: [
            {
              name: 'visionTitle',
              label: 'Vision Title',
              type: 'text',
            },
            {
              name: 'visionDescription',
              label: 'Vision Description',
              type: 'textarea',
            },
            {
              name: 'visionnImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'missionTitle',
              label: 'Mision Title',
              type: 'text',
            },
            {
              name: 'missionDescription',
              label: 'Mission Description',
              type: 'textarea',
            },
            {
              name: 'missionImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
          ],
        },
        {
          label: 'Office Section',
          fields: [
            {
              name: 'officeTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'officeDescription',
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
