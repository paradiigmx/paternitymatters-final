import { Page } from './types';

export const LOGO_URL = '/logos/white-horz-med-res.png';
export const LOGO_ICON_URL = '/logos/Artboard 6-low-res.png';

export interface NavLink {
  name: Page;
  sublinks?: { name: Page }[];
}

export const NAV_LINKS: NavLink[] = [
  { name: Page.Home },
  { name: Page.About },
  {
    name: Page.Paternity,
    sublinks: [
      { name: Page.Paternity },
      { name: Page.PaternityTesting },
      { name: Page.PaternityFraud },
      { name: Page.LegalDocuments },
    ],
  },
  { name: Page.Custody },
  {
    name: Page.ChildSupport,
    sublinks: [
        { name: Page.ChildSupport },
        { name: Page.EnforcingSupport },
        { name: Page.SupportModifications },
    ]
  },
  {
    name: Page.Fatherhood,
    sublinks: [
        { name: Page.Fatherhood },
        { name: Page.NewDads },
        { name: Page.CoParenting },
        { name: Page.FathersWellbeing },
    ],
  },
  { name: Page.Shop },
  { name: Page.Blog },
  {
    name: Page.More,
    sublinks: [
      { name: Page.Resources },
      { name: Page.Contact },
    ],
  },
];