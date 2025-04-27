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
          label: 'Header',
          fields: [
            {
              name: 'websiteLogo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'websiteFooterLogo',
              label: 'Footer Logo',
              type: 'upload',
              relationTo: 'media',
            },
            // {
            //   name: 'websiteFavicon',
            //   label: 'Favicon',
            //   type: 'upload',
            //   relationTo: 'media',
            // },
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'Header Links',
                  fields: [
                    {
                      name: 'headerLinks',
                      type: 'array',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'headerLinkText',
                              label: 'Menu Name',
                              type: 'text',
                            },
                            {
                              name: 'headerLinkUrl',
                              label: 'Menu Link',
                              type: 'text',
                            },
                            {
                              name: 'headerMenuCountryDropdwon',
                              label: 'Has Country Dropdown',
                              type: 'checkbox',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'CTA',
                  fields: [
                    {
                      name: 'headerCtaText',
                      label: 'CTA Text',
                      type: 'text',
                    },
                    {
                      name: 'headerCtaLink',
                      label: 'CTA Link',
                      type: 'text',
                    },
                    {
                      name: 'ctaRedirectExternal',
                      label: 'External Link',
                      type: 'checkbox',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'CTA',
                  fields: [
                    {
                      name: 'footerCtaTitle',
                      label: 'CTA Title',
                      type: 'text',
                    },
                    {
                      name: 'footerCtaDescription',
                      label: 'CTA Description',
                      type: 'textarea',
                    },
                    {
                      name: 'footerCtaButtonText',
                      label: 'CTA Button Text',
                      type: 'text',
                    },
                    {
                      name: 'footerCtaButtonUrl',
                      label: 'CTA Button Url',
                      type: 'text',
                    },
                  ],
                },
                {
                  label: 'About Us',
                  fields: [
                    {
                      name: 'footerAboutUs',
                      type: 'textarea',
                    },
                  ],
                },
                {
                  label: 'Footer Destinations',
                  fields: [
                    {
                      name: 'countries',
                      type: 'relationship',
                      admin: {
                        position: 'sidebar',
                      },
                      hasMany: true,
                      relationTo: 'countries',
                    },
                  ],
                },
                {
                  label: 'Footer University',
                  fields: [
                    {
                      name: 'universities',
                      type: 'relationship',
                      admin: {
                        position: 'sidebar',
                      },
                      hasMany: true,
                      relationTo: 'universities',
                    },
                  ],
                },
                {
                  label: 'Social Links',
                  fields: [
                    {
                      name: 'graduvateFacebook',
                      label: 'Facebook',
                      type: 'text',
                    },
                    {
                      name: 'graduvateTwitter',
                      label: 'Twitter',
                      type: 'text',
                    },
                    {
                      name: 'graduvateYoutube',
                      label: 'Youtube',
                      type: 'text',
                    },
                    {
                      name: 'graduvateInstagram',
                      label: 'Instagram',
                      type: 'text',
                    },
                  ],
                },
                {
                  label: 'WhatsApp Chat Icon',
                  fields: [
                    {
                      name: 'whatsappNumber',
                      label: 'Whatsapp Number  (Eg: 911234567890)',
                      type: 'text',
                    },
                    {
                      name: 'showWhatsappOnWebsite',
                      label: 'Show on Website',
                      type: 'checkbox',
                    },
                  ],
                },
                {
                  label: 'Scripts',
                  fields: [
                    {
                      name: 'websiteScripts',
                      type: 'textarea',
                    },
                    {
                      name: 'cdnList',
                      type: 'array',
                      fields: [
                        {
                          name: 'scriptTag',
                          type: 'text',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials Section',
          fields: [
            {
              name: 'testimonialTitle',
              type: 'text',
            },
            {
              name: 'testimonialDescription',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'University Section',
          fields: [
            {
              name: 'courseCtaPhoneumber',
              label: 'Whats App Number for Course CTA',
              type: 'text',
            },
          ],
        },
        {
          label: 'FAQ Section',
          fields: [
            {
              name: 'faqSectionHeading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'faqSectionDescription',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'faqSectionPhone',
              label: 'Phone',
              type: 'text',
            },
            {
              name: 'faqSectionEmail',
              label: 'Email',
              type: 'text',
            },
          ],
        },
        {
          label: 'Country Section',
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
        },
        {
          label: 'Global Search',
          fields: [
            {
              name: 'popularSearchHeading',
              type: 'text',
            },
            {
              name: 'popularUniversities',
              label: 'Universities',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'universities',
            },
            {
              name: 'noDataMessage',
              type: 'text',
            },
            {
              name: 'searchPlaceholder',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
