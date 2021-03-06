export interface IEmployerDetail {
    id?: string,
    employerName?: string,
    email?: string,
    phone?: string,
    address?: string,
    region?: {
        id?: number,
        name?: string
    },
    lat?: number,
    lon?: number,
    logoUrl?: string,
    coverUrl?: string,
    taxCode?: string,
    description?: string,
    identityCardFrontImageUrl?: string,
    identityCardBackImageUrl?: string,
    rating?: {
        workingEnvironmentRating?: number,
        salaryRating?: number,
        ratingCount?: number
    },
    profileVerified?: boolean,
    createdDate?: number
}

export interface ITopEmDetail {
    employerID?: string,
    employerName?: string,
    employerLogoUrl?: string,
    bannerUrl?: string,
    bannerPriority?: string,
    logoPriority?: string,
    createdDate?: number
}