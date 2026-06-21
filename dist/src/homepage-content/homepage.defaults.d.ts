import { Prisma } from '@prisma/client';
export declare const DEFAULT_HOMEPAGE_CONTENT: Prisma.HomepageContentCreateInput;
export declare const DEFAULT_HOMEPAGE_SERVICES: Prisma.HomepageServiceCreateInput[];
export declare const DEFAULT_HOMEPAGE_GALLERY: Prisma.HomepageGalleryCreateInput[];
export declare const DEFAULT_HOMEPAGE_SECTION: Prisma.HomepageSectionCreateInput;
export declare const HOMEPAGE_SERVICE_ICONS: readonly ["Camera", "Video", "Mic", "Music", "Image", "Monitor", "Headphones", "Film"];
export type HomepageServiceIcon = (typeof HOMEPAGE_SERVICE_ICONS)[number];
