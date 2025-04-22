import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { GlobalConfig } from 'payload'

export const Kickstart: Omit<GlobalConfig, 'navItems'> = {
  slug: 'kickstart',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Step 1',
          fields: [
            {
              name: 'step1Title',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'step1Description',
              label: 'Description',
              type: 'text',
            },
          ],
        },
        {
          label: 'Step 2',
          fields: [
            {
              name: 'step2Title',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'step2Description',
              label: 'Description',
              type: 'text',
            },
          ],
        },
        {
          label: 'Step 3',
          fields: [
            {
              name: 'step3Title',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'step3Description',
              label: 'Description',
              type: 'text',
            },
            {
              name: 'step3hide',
              label: 'Hide This Step',
              type: 'checkbox',
            },
          ],
        },
        {
          label: 'Step 4',
          fields: [
            {
              name: 'step4Title',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'step4Description',
              label: 'Description',
              type: 'text',
            },
            {
              name: 'step4hide',
              label: 'Hide This Step',
              type: 'checkbox',
            },
          ],
        },
        {
          label: 'Step 5',
          fields: [
            {
              name: 'step5Title',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'step5Description',
              label: 'Description',
              type: 'text',
            },
            {
              name: 'coursesLists',
              type: 'array',
              label: 'Courses',
              labels: {
                singular: 'Course',
                plural: 'Cours',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'courseName',
                      type: 'text',
                    },
                    {
                      name: 'educationType',
                      label: 'Type',
                      type: 'select',
                      options: ['Bachelors', 'Masters', 'Both'],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Step 6',
          fields: [
            {
              name: 'step6Title',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'step6ThankYouTitle',
              label: 'Thank You Title',
              type: 'text',
            },
            {
              name: 'step6ThankYouDescription',
              label: 'Thank You Description',
              type: 'textarea',
            },
            {
              name: 'step6ThankYouPhpne',
              label: 'Phone',
              type: 'text',
            },
            {
              name: 'step6ThankYouEmail',
              label: 'Email',
              type: 'text',
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
