import { GlobalConfig } from 'payload'

export const CommonSettings: Omit<GlobalConfig, 'navItems'> = {
  slug: 'common-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Country CTA Section',
          fields: [
            {
              name: 'countryCtaHeading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'countryCtaDescription',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'countryCtaText',
              label: 'CTA Text',
              type: 'text',
            },
            {
              name: 'countryCtaLink',
              label: 'CTA Link',
              type: 'text',
            },
          ],
        },
        {
          label: 'Country Faq Section',
          fields: [
            {
              name: 'countryFaqHeading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'countryFaqDescription',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'countryFaqPhone',
              label: 'Phone',
              type: 'text',
            },
            {
              name: 'countryFaqEmail',
              label: 'Email',
              type: 'text',
            },
          ],
        },
        {
          label: 'Country Blog Section',
          fields: [
            {
              name: 'countryBlogHeading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'countryBlogDescription',
              label: 'Description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
}
